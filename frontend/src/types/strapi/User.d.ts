export type StrapiUserT = {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  provider: 'local' | 'google';
};

export type StrapiLoginResponseT = {
  jwt: string;
  user: StrapiUserT;
};
