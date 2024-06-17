import { Injectable, signal, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Authentication } from '../interfaces/Authentication';

import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../interfaces/LoginForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient) 

  auth = signal<Authentication | undefined | null>(undefined);
  

  constructor() { }  

  authenticate(loginForm: LoginForm): Observable<Authentication>{
    return this.http.post<Authentication>(environment.authUrl + '/login', loginForm);
  }

}
