import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { userApiEndpoints } from '@common/environments';
import { BackendUserRole, UserRole } from '@shared/enums';
import { ICreateUserRequest, IUserProfileResponse } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  createUser(body: ICreateUserRequest): Observable<any> {
    return this.httpClient.post(userApiEndpoints.createUser, body);
  }

  getProfile(): Observable<IUserProfileResponse> {
    return this.httpClient.get<IUserProfileResponse>(userApiEndpoints.getProfile);
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get(userApiEndpoints.getAllUsers);
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get(userApiEndpoints.getUserById(id));
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete(userApiEndpoints.deleteUser(id));
  }

  lockProfile(id: string): Observable<any> {
    return this.httpClient.patch(userApiEndpoints.lockProfile(id), undefined);
  }

  unlockProfile(id: string): Observable<any> {
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
