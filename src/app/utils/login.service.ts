import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import local from '../local';

class User {
  id: number
  name: string
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(
    private http: HttpClient
  ) { }
    
  public userLoggedIn = null

  checkLogin(): Observable<User> {
    return this.http.get<User>(local.endpointBase + '/api/checkLogin')
      .pipe(
        tap(user => this.userLoggedIn = user)
      )
  }
}
