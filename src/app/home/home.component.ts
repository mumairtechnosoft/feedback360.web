import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../oidc/services';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  userName: string | undefined;
  /**
   *
   */
  constructor(private _authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.userName = this._authService.getClaims()?.sub;
  }
}
