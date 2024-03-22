export type StrapiCurrentUserT = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: date;
  updatedAt: date;
};
