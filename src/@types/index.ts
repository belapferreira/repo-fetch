export interface UserDetails {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  email: string | null;
}

export interface UserDetailsBySlugPayload {
  username: string;
}
