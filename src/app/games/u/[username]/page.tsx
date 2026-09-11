import { redirect } from "next/navigation";

export default function GamePublicProfileRedirect({
  params,
}: {
  params: { username: string };
}) {
  redirect(`/u/${encodeURIComponent(params.username)}?tab=gaming`);
}
