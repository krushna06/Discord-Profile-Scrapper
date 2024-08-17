import { CraftedResponse, ParsedRequest } from '../types/Routes';
import { fetchUserOnDiscord, getDiscordProfile } from '../utils/discord';
import { getLanyardUser } from '../utils/lanyard';

export async function GetUser(request: ParsedRequest<{ Params: { id: string } }>, response: CraftedResponse) {
  try {
    const res = await fetchUserOnDiscord(request.params.id);

    return response.status(200).send(res);
  } catch (error: any) {
    if (error && error.code && error.code == 'rate_limited') {
      return response.status(429).send(error);
    }

    return response.status(500).send({ code: 'unknown_error' });
  }
}

export async function GetUserProfile(request: ParsedRequest<{ Params: { id: string } }>, response: CraftedResponse) {
  try {
    const res = await getDiscordProfile(request.params.id);

    return response.status(200).send(res);
  } catch (error: any) {
    if (error && error.code && error.code == 'rate_limited') {
      return response.status(429).send(error);
    }

    return response.status(500).send({ code: 'unknown_error' });
  }
}

export async function GetUserAvatar(request: ParsedRequest<{ Params: { id: string; ext?: string }; Query: { size?: string; rest?: string } }>, response: CraftedResponse) {
  const res = await getLanyardUser(request.params.id, request.query.rest);

  const ext = request.params.ext || (res.discord_user.avatar.startsWith('a_') ? 'gif' : 'png');
  const size = request.query.size || 128;

  const asset = await fetch(`https://cdn.discordapp.com/avatars/${res.discord_user.id}/${res.discord_user.avatar}.${ext}?size=${size}`);
  return response.raw(asset);
}

export async function GetUserBanner(request: ParsedRequest<{ Params: { id: string; ext?: string }; Query: { size?: string } }>, response: CraftedResponse) {
  const res = await fetchUserOnDiscord(request.params.id);

  if (!res.banner) return response.status(404).send();

  const ext = request.params.ext || (res.banner.startsWith('a_') ? 'gif' : 'png');
  const size = request.query.size || 300;

  const asset = await fetch(`https://cdn.discordapp.com/banners/${res.id}/${res.banner}.${ext}?size=${size}`);
  return response.raw(asset);
}
