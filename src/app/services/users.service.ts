import { Injectable, computed, inject, signal } from '@angular/core';
import { User, UsersResponse, UserResponse, UserResponsePaginate } from '../interfaces/req-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';

interface state {
  loading: boolean,
  users: User[]
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient)

  #state = signal<state>({
    loading: true,
    users: []
  })

  public users = computed(() => this.#state().users)
  public loading = computed(() => this.#state().loading)

  constructor() { 
    
  }

  getAll(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(environment.apiUrl + '/user');    
  }

  getAllPaginate(pageIndex:number, pageSize: number) {
    return this.http.post<UserResponsePaginate>(environment.apiUrl + '/user/paginate', {pageIndex: pageIndex, pageSize: pageSize})
  }

  getUserById(id: number): Observable<UserResponse>{
    return this.http.get<UserResponse>(`${environment.apiUrl}/user/${id}`)
  }

  saveUser(data: User){
    return this.http.post<User>(`${environment.apiUrl}/user`, data);
  }

  updateUser(data: User): Observable<UserResponse>{
    return this.http.put<UserResponse>(`${environment.apiUrl}/user`, data);
  }

}
