import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ReceptionistService } from 'src/app/services/master/receptionist/receptionist.service';

@Component({
  selector: 'app-edit-receptionist',
  templateUrl: './edit-receptionist.component.html',
  styleUrls: ['./edit-receptionist.component.css']
})
export class EditReceptionistComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ReceptionistService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      receptionistName: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.returnUrl = '/master/receptionist';
    this.id = this.router.url.split('/').pop();
    this.getByIdData(this.id);
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  getByIdData(id) {
    this.service.getById(id).subscribe(res => {
      console.log(res.data);
      this.getData = res.data;
      console.log(res.data);
      this.submitForm = this.formBuilder.group({
        receptionistName: [res.data.receptionistName, Validators.required],
      email: [res.data.email, Validators.required],
      status: [res.data.status + '', Validators.required],
      });
    });
  }

  // tslint:disable-next-line: typedef
  updateById(id, data) {
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    else {
      this.isSubmitted = true;
      this.service.updateById(id, data).subscribe(response => {
        if (response.data) {
          this.router.navigate([this.returnUrl]);
        }
        else {
          this.isSubmitted = false;
          this.message = 'Failed to submit the form.';
        }
      });
    }
  }

}
