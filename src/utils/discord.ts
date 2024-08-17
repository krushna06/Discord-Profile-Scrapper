import { Profile, PublicApplication, User } from '../types/Discord';

// Pull this automaticly on an interval later
const discordVersion = '0.0.291';
const clientBuild = 172669;

const superProperties = Buffer.from(JSON.stringify({
  os: "Mac OS X",
  browser: "Discord Client",
  release_channel: "stable",
  client_version: discordVersion,
  os_version: "22.0.0",
  os_arch: "arm64",
  system_locale: "en-US",
  client_build_number: clientBuild,
  native_build_number: null,
  client_event_source: null
})).toString('base64');

const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) discord/${discordVersion} Chrome/98.0.4758.141 Electron/17.4.9 Safari/537.36`;

export async function fetchUserOnDiscord(id: string): Promise<User> {
  const cached = await Storage.get<User | undefined>(`discord_user/${id}`, { type: 'json' });
  if (cached) return { ...cached, cached: true };

  const req = await fetch(`https://discord.com/api/v9/users/${id}`, {
    headers: { authorization: `Bot ${BOT_TOKEN}` },
  });

  if (req.status == 429) throw { code: 'rate_limited', error: 'Said this was unreliable, and here is the prime reason why :/', time_left: req.headers.get('retry-after') };

  const user: User = await req.json();

  await Storage.put(`discord_user/${id}`, JSON.stringify(user), { expirationTtl: 1800 });

  return user;
}

export async function getDiscordProfile(id: string): Promise<Profile> {
  try {
    const cached = await Storage.get<Profile | undefined>(`profile/${id}`, { type: 'json' });
    if (cached) return { ...cached, cached: true };

    const req = await fetch(`https://discord.com/api/v9/users/${id}/profile`, {
      headers: { authorization: DISCORD_TOKEN, 'x-super-properties': superProperties, 'user-agent': userAgent },
    });

    if (req.status == 429) throw { code: 'rate_limited', error: 'Said this was unreliable, and here is the prime reason why :/', time_left: req.headers.get('retry-after') };

    const profile: Profile = await req.json();

    const returned = {
      user: profile.user,
      user_profile: profile.user_profile,
      legacy_username: profile.legacy_username,
      connected_accounts: profile.connected_accounts,
      premium_since: profile.premium_since,
      premium_type: profile.premium_type,
      premium_guild_since: profile.premium_guild_since,
    };

    await Storage.put(`profile/${id}`, JSON.stringify(returned), { expirationTtl: 3600 });

    return returned;
  } catch (error) {
    throw error;
  }
}

export async function getApplicationFromDiscord(id: string): Promise<PublicApplication> {
  const app: PublicApplication = await fetch(`https://discord.com/api/v9/applications/${id}/public`, {
    headers: { authorization: DISCORD_TOKEN },
  }).then((r) => r.json());

  return app;
}
