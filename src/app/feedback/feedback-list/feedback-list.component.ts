import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/oidc/services';
import { EmployeeDropDownDTO } from '../models/employee-dropdown';
import { FeedbackListDTO } from '../models/feedback-list.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackListDTO!: FeedbackListDTO[];
  role: string | undefined;
  username: string | undefined;
  employee!: EmployeeDropDownDTO;

  constructor(private _feedback: FeedbackService, private _authService: AuthenticationService, private _toasterService: ToastrService) { 
    this.feedbackListDTO = [];
    this.employee = new EmployeeDropDownDTO;
  }

  ngOnInit(): void {
    this.role = this._authService.getClaims()?.['role'];
    this.username = this._authService.getClaims()?.sub;
    if (this.role == 'Employee') {
      this.getEmployeebyUsername(this.username);
    } else {
    this.getListOfFeedbacks();
    }
  }

  getListOfFeedbacks() {
    this._feedback.getListOfFeedbacks()?.subscribe((response) => {
      debugger;
      if (response.status) {
        this.feedbackListDTO = response.payload;
      }
    })
  }

  getListOfFeedbacksByEmployeeId(employeeId: bigint) {
    this._feedback.getListOfFeedbacksByEmployeeId(employeeId)?.subscribe((response) => {
      if (response.status) {
        this.feedbackListDTO = response.payload;
      }
    })
  }

  getEmployeebyUsername(username: string | undefined) {
    this._feedback.getEmployee(username)?.subscribe((response) => {
      if (response.status) {
        this.employee = response.payload;
        this.getListOfFeedbacksByEmployeeId(this.employee.id);
      }
    })
  }
}
