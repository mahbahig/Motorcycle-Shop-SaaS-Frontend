import { UserRole } from '@shared/enums';

export interface ICreateUserRequest {
  shopSlug: string;
  name: string;
  username: string;
  role: UserRole;
}
