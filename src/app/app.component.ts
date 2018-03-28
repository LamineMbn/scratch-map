import { Component } from '@angular/core';
import {AuthenticationService} from './shared/service/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(readonly _authenticationService: AuthenticationService) {}
}
