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

export interface UserRepos {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string | null;
  private: boolean;
  topics: string[];
  visibility: 'public' | 'private' | 'internal';
  license: {
    name: string;
  } | null;
}

export interface UserReposSearchResponse {
  total_count: number;
  items: UserRepos[];
}

export interface UserDetailsByUsernamePayload {
  username: string;
}

export interface UserReposByUsernamePayload {
  username: string;
  page?: number;
  order?: 'asc' | 'desc';
  query?: string;
}
