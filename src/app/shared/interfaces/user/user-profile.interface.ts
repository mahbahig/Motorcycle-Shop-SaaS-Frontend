export interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
}
export interface UserProfile {
  _id: string;
  name: string;
  username: string;
  role: string;
  shop: {
    name: string;
    slug: string;
    _id: string;
  };
}
// backward-compat alias for read-only components in @common/components
export type { UserProfile as IUserProfile };
