import { StrapiCurrentUserT } from '@/types/strapi/StrapiCurrentUserT';
import fetcher from './fetcher';

export async function getCurrentUser(token: string) {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ['strapi-users-me'] },
  };
  const user: StrapiCurrentUserT = await fetcher('/users/me', {}, options);
  return user;
}
