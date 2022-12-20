import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddFeedbackDTO } from '../models/add-feedback.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  addFeedbackForm!: FormGroup;
  addFeedbackDTO!: AddFeedbackDTO;

  constructor(private _fb: FormBuilder, private _feedback: FeedbackService) { 
    this.addFeedbackDTO = new AddFeedbackDTO();
  }

  ngOnInit(): void {
    this.initializeFeedbackForm();
  }

  initializeFeedbackForm() {
    this.addFeedbackForm = this._fb.group({
      employee_Id: ['', Validators.required],
      category_Id: [0, Validators.required],
      severity_Id: [0, Validators.required],
      visibility: ['Employee'],
      feedback_Target: ['General'],
      comments: ['', Validators.required]
    });
  }

  submit() {
    console.log(this.addFeedbackDTO);
    this._feedback.addFeedback(this.addFeedbackDTO)?.subscribe((response) => {
      if (response.status) {
        debugger;
        alert("Ok");
      }
    });
  }
}
