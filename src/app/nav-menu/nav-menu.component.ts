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

  /**
   *
   */
  constructor(private _authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.userName = this._authService.getClaims()?.sub;
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
