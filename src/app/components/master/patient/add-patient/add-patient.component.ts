import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Util } from '../../../../../../Utility/util';
import { PatientService } from '../../../../services/master/patient/patient.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PatientService) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = '/master/patient';
  }

  initForm() {
    this.isSubmitted = false;
    this.submitForm = this.formBuilder.group({
      patient_name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]+$"), Validators.maxLength(10)]),
    });
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(formGroup: FormGroup, data) {

    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }

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
  }

  onReset() {
    this.isSubmitted = false;
    this.submitForm.reset();
  }

}
