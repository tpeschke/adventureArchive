import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.checkLogin()
    .pipe(
      map((user) => {
          if (user.id == 1) {
            return true
          }
          this.router.navigate(['/'])
          return false
      })
    )
  }
}