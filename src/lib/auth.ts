import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email o Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Introduce tu usuario o email y contraseña");
        }

        const identifier = credentials.identifier.trim();

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: { equals: identifier, mode: "insensitive" } },
              { username: { equals: identifier, mode: "insensitive" } },
            ],
          },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Usuario o contraseña incorrectos");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!isValid) {
          throw new Error("Usuario o contraseña incorrectos");
        }

        return {
          id: user.id,
          name: user.name || user.username,
          email: user.email,
          image: user.image,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        let uname = (user as any).username;
        if (!uname) {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { username: true },
          });
          if (dbUser?.username) {
            uname = dbUser.username;
          } else {
            let base = (
              user.name || (user.email ? user.email.split("@")[0] : "gamer")
            )
              .toLowerCase()
              .replace(/[^a-z0-9_]/g, "")
              .slice(0, 15);
            if (!base) base = "gamer";
            uname = base;
            let counter = 1;
            while (
              await prisma.user.findUnique({ where: { username: uname } })
            ) {
              uname = `${base}${Math.floor(100 + Math.random() * 900)}`;
              counter++;
              if (counter > 6) {
                uname = `${base}${Date.now().toString().slice(-4)}`;
                break;
              }
            }
            try {
              await prisma.user.update({
                where: { id: user.id },
                data: { username: uname },
              });
            } catch (e) {
              console.error("Could not set initial username:", e);
            }
          }
        }
        token.username = uname;
        token.image = user.image;
      }
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image) token.image = session.image;
        if (session.username) token.username = session.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        if (token.image) session.user.image = token.image as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
