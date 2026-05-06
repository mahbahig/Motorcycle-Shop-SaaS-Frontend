import { UserRole } from "@shared/enums";

export interface IUserProfileResponse {
  success: boolean;
  data: IUserProfile;
}
export interface IUserProfile {
  _id: string;
  name: string;
  username: string;
  role: string;
  shop: {
    name: string;
    slug: string;
    _id: string;
  }
}

