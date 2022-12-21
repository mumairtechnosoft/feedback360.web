import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private _fb: FormBuilder, private _loginService: LoginService) {
    this.loginDTO = new LoginRequestDTO();
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log(this.loginForm.value);
    console.log(this.loginDTO);
    this._loginService.login(this.loginDTO)?.subscribe((response) => {
      alert('Hello There!');
    })
  }

}
