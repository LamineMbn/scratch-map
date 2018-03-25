import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../shared/service/authentication.service';

@Injectable()
export class LoginGuardService implements CanActivate {

  constructor(readonly _authenticationService: AuthenticationService, readonly router: Router) {
  }

  canActivate(): boolean {

    if (this._authenticationService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    
  }

}
