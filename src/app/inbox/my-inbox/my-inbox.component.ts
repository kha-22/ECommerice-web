import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContactusService } from 'src/app/contactus/component/services/contactus.service';

@Component({
  selector: 'app-my-inbox',
  templateUrl: './my-inbox.component.html',
  styleUrls: ['./my-inbox.component.scss'],
})
export class MyInboxComponent implements OnInit {
  questionList: any[] = [];

  constructor(
    private contactusService: ContactusService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getQuestionWithRepayes();
  }

  getQuestionWithRepayes() {
    this.contactusService.getQuestionWithRepayes().subscribe(
      (result: any) => {
        this.questionList = result;
        console.log(this.questionList);
      },
      (err) => {
        this.toastr.error('An expected occure error');
      }
    );
  }
}
