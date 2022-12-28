import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/data-service.service';
import { AddFeedbackDTO } from '../models/add-feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private _dataService: DataService) { }

  addFeedback(requestDTO: AddFeedbackDTO) {
    return this._dataService.genericSericeCaller('post', 'Feedbacks/addFeedback', requestDTO);
  }

  getListOfFeedbacksByEmployeeId(employeeId: string) {
    return this._dataService.genericSericeCaller('get', 'Feedbacks/getAllByEmployeeId?employeeId=' + employeeId, null);
  }

  getListOfFeedbacks() {
    return this._dataService.genericSericeCaller('get', 'Feedbacks/getAll', null);
  }

  getListOfEmployees() {
    return this._dataService.genericSericeCaller('get', 'Users/listOfEmployees', null);
  }
}
