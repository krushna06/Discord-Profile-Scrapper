
import { CraftedResponse, ParsedRequest } from "../types/Routes";
import { getApplicationFromDiscord } from "../utils/discord";

export async function GetApplicationIcon(request: ParsedRequest<{ Params: { id: string, ext?: string; }, Query: { size?: string } }>, response: CraftedResponse) {
  const res = await getApplicationFromDiscord(request.params.id);

  const ext = request.params.ext || 'png';
  const size = request.query.size || 40;

  const applicationIcon = await fetch(`https://cdn.discordapp.com/app-icons/${res.id}/${res.icon}.${ext}?size=${size}`);
  return response.raw(applicationIcon);
}