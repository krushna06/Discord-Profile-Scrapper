export interface LanyardData {
  spotify: null;
  listening_to_spotify: boolean;
  kv: Kv;
  discord_user: DiscordUser;
  discord_status: string;
  activities: Activity[];
  active_on_discord_web: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
}

export interface Activity {
  type: number;
  state: string;
  name: string;
  id: string;
  emoji: Emoji;
  created_at: number;
}

export interface Emoji {
  name: string;
  id: string;
  animated: boolean;
}

export interface DiscordUser {
  username: string;
  public_flags: number;
  id: string;
  discriminator: string;
  avatar: string;
}

export interface Kv {
  pp: string;
  ip: string;
}
