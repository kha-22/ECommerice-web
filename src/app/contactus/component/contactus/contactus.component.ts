import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ContactusService } from '../services/contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  contactusForm: FormGroup;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  constructor(
    private contactusService: ContactusService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createContactusForm();
  }

  createContactusForm() {
    this.contactusForm = this.fb.group({
      subject: [, [Validators.required]],
      message: [, [Validators.required]],
    });
  }

  onSubmit(form: any) {
    this.contactusService.send(form).subscribe(
      () => {
        this.toastr.success('Send successfully');
        this.contactusForm.reset();
      },
      (err) => {
        this.toastr.error('An expected occure error');
      }
    );
  }
}
