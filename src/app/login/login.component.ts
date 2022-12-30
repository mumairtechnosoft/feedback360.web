import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../oidc/services/authentication.service';
import { LoginRequestDTO } from './models/login.model';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  loginDTO!: LoginRequestDTO;

  constructor(
  private readonly _router: Router, private _fb: FormBuilder, private _loginService: LoginService, private _authService: AuthenticationService, private _activatedRoute: ActivatedRoute, private _toasterService: ToastrService) {
    this.loginDTO = new LoginRequestDTO();
  }

  ngOnInit(): void {
    // this._authService.startAuthentication();
    this._activatedRoute.queryParams.subscribe(params => {
      debugger;
      this.loginDTO.returnUrl = params['ReturnUrl'];
    })

    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this._loginService.login(this.loginDTO)?.subscribe((response) => {
        debugger;
        console.log(response);
        if (!response.status) {
          this.loginDTO.password = '';
          this.loginForm.controls['password'].setValue('');
          this.loginForm.controls['password'].markAsUntouched();
          this.loginForm.controls['password'].updateValueAndValidity();
          this._toasterService.error(response.message);
        } else {
          alert('Hello There!');
          this._authService.completeAuthentication();
          this._router.navigateByUrl('/fetch-feedbacks');
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

}
