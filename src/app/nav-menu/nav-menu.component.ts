import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../oidc/services';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  userName: string | undefined;
  role: string | undefined;

  /**
   *
   */
  constructor(private _authService: AuthenticationService) {
  }

  ngOnInit(): void {
    debugger;
    this.userName = this._authService.getClaims()?.sub;
    this.role = this._authService.getClaims()?.['role'];
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
