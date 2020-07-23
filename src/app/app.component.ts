import { Component } from '@angular/core';
import { LoginService } from './utils/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit() {
    if (!this.loginService.userLoggedIn) {
      this.loginService.checkLogin().subscribe()
    }
  }
}
