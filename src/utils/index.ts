import { AlturaUser } from '../types';

export const userFromJson = (user: any): AlturaUser => {
  const fromJson: AlturaUser = {
    address: user.address,
    name: user.name,
    bio: user.bio,
    socialLink: user.socialLink,
    profilePicUrl: user.profilePicUrl,
  };

  return fromJson;
};
