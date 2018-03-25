import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  constructor(readonly _authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this._authenticationService.getAuth(user => this.user = user);
  }

  signInWithGoogle() {
    this._authenticationService.login();
  }

}
