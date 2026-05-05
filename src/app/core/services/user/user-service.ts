import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { userApiEndpoints } from '@common/environments';
import { ICreateUserRequest } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  createUser(body: ICreateUserRequest): Observable<any> {
    return this.httpClient.post(userApiEndpoints.createUser, body);
  }

  getProfile(): Observable<any> {
    return this.httpClient.get(userApiEndpoints.getProfile);
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
}
