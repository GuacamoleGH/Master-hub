const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log(
    "🔒 Iniciando diagnóstico y securización de Supabase PostgreSQL...\n",
  );

  try {
    // 1. Obtener todas las tablas del esquema public
    const tables = await prisma.$queryRawUnsafe(`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename ASC;
    `);

    console.log("📋 Estado actual de Row-Level Security (RLS):");
    console.table(tables);

    // 2. Habilitar RLS en cada tabla
    console.log(
      "\n🛡️ Habilitando Row-Level Security (RLS) en todas las tablas públicas...",
    );
    for (const row of tables) {
      const tableName = row.tablename;
      await prisma.$executeRawUnsafe(
        `ALTER TABLE public."${tableName}" ENABLE ROW LEVEL SECURITY;`,
      );
      console.log(`  ✅ RLS habilitado en: public."${tableName}"`);
    }

    // 3. Revocar permisos directos a roles anon y authenticated de PostgREST
    console.log(
      "\n🚫 Revocando permisos de acceso directo API (anon / authenticated)...",
    );
    await prisma.$executeRawUnsafe(
      "REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;",
    );
    console.log(
      "  ✅ Permisos sobre tablas revocados para anon y authenticated.",
    );

    await prisma.$executeRawUnsafe(
      "REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;",
    );
    console.log(
      "  ✅ Permisos sobre secuencias revocados para anon y authenticated.",
    );

    await prisma.$executeRawUnsafe(
      "REVOKE ALL ON ALL ROUTINES IN SCHEMA public FROM anon, authenticated;",
    );
    console.log(
      "  ✅ Permisos sobre rutinas/funciones revocados para anon y authenticated.",
    );

    // 4. Verificación final
    const updatedTables = await prisma.$queryRawUnsafe(`
      SELECT tablename, rowsecurity 
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY tablename ASC;
    `);

    console.log("\n✨ Estado final de las tablas en Supabase:");
    console.table(updatedTables);

    // 5. Verificar que Prisma sigue pudiendo consultar datos normalmente
    console.log(
      "\n🧪 Verificando que la conexión de la aplicación (Prisma) funciona correctamente...",
    );
    const userCount = await prisma.user.count();
    const movieCount = await prisma.movie.count();
    const gameCount = await prisma.game.count();
    console.log(
      `  📊 Acceso verificado: ${userCount} usuarios, ${movieCount} películas, ${gameCount} juegos disponibles.`,
    );
    console.log(
      "\n🎉 ¡Securización completada con éxito! Las alertas de Supabase quedarán resueltas.",
    );
  } catch (error) {
    console.error("❌ Error durante la securización:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
