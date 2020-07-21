import { Component } from '@angular/core';
import { LoginService } from './utils/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private loginService: LoginService
  ) {  }

  ngOnInit() {
    if (!this.loginService.userLoggedIn) {
      this.loginService.checkLogin().subscribe()
    }
  }
}
