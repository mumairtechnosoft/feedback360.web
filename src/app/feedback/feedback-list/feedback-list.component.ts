import { Component, OnInit } from '@angular/core';
import { FeedbackListDTO } from '../models/feedback-list.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbackListDTO!: FeedbackListDTO[];

  constructor(private _feedback: FeedbackService) { 
    this.feedbackListDTO = [];
  }

  ngOnInit(): void {
    this.getListOfFeedbacks();
  }

  getListOfFeedbacks() {
    this._feedback.getListOfFeedbacks()?.subscribe((response) => {
      debugger;
      if (response.status) {
        this.feedbackListDTO = response.payload;
      }
    })
  }
}
