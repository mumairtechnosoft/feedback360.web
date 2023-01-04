import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddFeedbackDTO } from '../models/add-feedback.model';
import { EmployeeDropDownDTO } from '../models/employee-dropdown';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  addFeedbackForm!: FormGroup;
  addFeedbackDTO!: AddFeedbackDTO;
  employeeList!: EmployeeDropDownDTO[];

  constructor(private _fb: FormBuilder, private _feedback: FeedbackService, private _toasterMessage: ToastrService, private _router: Router) { 
    this.addFeedbackDTO = new AddFeedbackDTO();
    this.employeeList = [];
  }

  ngOnInit(): void {
    this.initializeFeedbackForm();
    this.getEmployeeList();
  }

  initializeFeedbackForm() {
    this.addFeedbackForm = this._fb.group({
      employee_Id: [0, Validators.required],
      category_Id: [0, Validators.required],
      severity_Id: [0, Validators.required],
      visibility: ['Employee'],
      feedback_Target: ['General'],
      comments: ['', Validators.required]
    });
  }

  getEmployeeList() {
    this._feedback.getListOfEmployees()?.subscribe((response) => {
      if (response.status) {
        this.employeeList = response.payload;
      } else {
        this.employeeList = [];
      }
    });
  }

  submit() {
    if (this.addFeedbackForm.valid) {
      this._feedback.addFeedback(this.addFeedbackDTO)?.subscribe((response) => {
        if (response.status) {
          this._toasterMessage.success(response.message);
          this._router.navigateByUrl('/fetch-feedbacks');
        }
      });
    }
    else {
      this.addFeedbackForm.markAllAsTouched();
    }
  }
}
