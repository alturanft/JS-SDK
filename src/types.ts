export interface IUser {
  address: string;
  name: string;
  bio: string;
  socialLink: string;
  profilePicUrl: string;
}

export enum SortDirection {
  'desc',
  'asc',
}
