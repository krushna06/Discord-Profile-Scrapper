export interface PublicApplication {
  id: string;
  name: string;
  icon: string;
  description: string;
  summary: string;
  type: number;
  splash: string;
  third_party_skus: ThirdPartySkus[];
  hook: boolean;
  executables: Executable[];
  verify_key: string;
  publishers: Publisher[];
  flags: number;
}

export interface Executable {
  os: string;
  name: string;
  is_launcher: boolean;
}

export interface Publisher {
  id: string;
  name: string;
}

export interface ThirdPartySkus {
  id: string;
  sku: string;
  distributor: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  banner: string | null;
  banner_color: string | null;
  accent_color: string | null;
  cached?: boolean;
}

export interface UserProfile {
  bio: string;
  accent_color: number;
  banner: string;
  theme_colors: number[];
}

export interface Profile {
  user: User;
  user_profile: UserProfile;
  legacy_username: string;
  connected_accounts: ConnectedAccount[];
  premium_type: number;
  premium_since: string;
  premium_guild_since: string;
  cached?: boolean;
}

export interface ConnectedAccount {
  type: string;
  id: string;
  name: string;
  verified: boolean;
}
