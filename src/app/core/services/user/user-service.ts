import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { userApiEndpoints } from '@common/environments';
import { BackendUserRole, UserRole } from '@shared/enums';
import { CreateUserRequest, UserProfileResponse } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Service()
export class UserService {
  private readonly httpClient = inject(HttpClient);

  createUser(body: CreateUserRequest): Observable<unknown> {
    return this.httpClient.post(userApiEndpoints.createUser, body);
  }

  getProfile(): Observable<UserProfileResponse> {
    return this.httpClient.get<UserProfileResponse>(userApiEndpoints.getProfile);
  }

  getAllUsers(): Observable<unknown> {
    return this.httpClient.get(userApiEndpoints.getAllUsers);
  }

  getUserById(id: string): Observable<unknown> {
    return this.httpClient.get(userApiEndpoints.getUserById(id));
  }

  deleteUser(id: string): Observable<unknown> {
    return this.httpClient.delete(userApiEndpoints.deleteUser(id));
  }

  lockProfile(id: string): Observable<unknown> {
    return this.httpClient.patch(userApiEndpoints.lockProfile(id), undefined);
  }

  unlockProfile(id: string): Observable<unknown> {
    return this.httpClient.patch(userApiEndpoints.unlockProfile(id), undefined);
  }

  translateRole(role: string): UserRole {
    switch (role) {
      case BackendUserRole.OWNER:
        return UserRole.OWNER;
      case BackendUserRole.EMPLOYEE:
        return UserRole.EMPLOYEE;
      default:
        return UserRole.EMPLOYEE;
    }
  }
}
