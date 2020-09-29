import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { DoctorService } from '../../../../services/master/doctor/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: DoctorService) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = '/master/doctor';
  }

  initForm() {
    this.isSubmitted = false;
    this.submitForm = this.formBuilder.group({
      doctorName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [Validators.required,Validators.minLength(10)]),
    });
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(formGroup: FormGroup, data) {
    console.log(data);
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    // else{
    this.isSubmitted = true;
    this.service.create(data).subscribe(response => {
      if (response.data) {
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.isSubmitted = false;
        this.message = 'Failed to submit the form.';
        console.log(data);
      }
    });
    this.onReset();
    // }
  }

  onReset() {
    this.isSubmitted = false;
    this.submitForm.reset();
  }

}
