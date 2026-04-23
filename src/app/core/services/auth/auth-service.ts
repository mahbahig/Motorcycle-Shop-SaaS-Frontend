import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginRequest } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) {}

  login (credentials: ILoginRequest): Observable<any> {
    return this.httpClient.post('/api/auth/login', credentials)
  }

}
