import { UserRole } from '@shared/enums';

export interface CreateUserRequest {
  shopSlug: string;
  name: string;
  username: string;
  role: UserRole;
}
