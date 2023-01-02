import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../oidc/services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  /**
   *
   */
  constructor(private _authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this._authService.startLogout();
  }

}
