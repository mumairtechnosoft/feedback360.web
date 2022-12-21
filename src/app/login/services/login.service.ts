import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/data-service.service';
import { LoginRequestDTO } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _dataService: DataService) { }

  login(requestDTO: LoginRequestDTO) {
    return this._dataService.genericSericeCaller('post', 'Account/login', requestDTO);
  }
}
