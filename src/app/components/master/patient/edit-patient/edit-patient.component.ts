import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Util } from '../../../../../../Utility/util';
import * as $ from 'jquery';
import { PatientService } from '../../../../services/master/patient/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PatientService) { }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = '/master/patient';
    this.id = this.router.url.split('/').pop();
    this.getByIdData(this.id);
  }

  initForm() {
    this.isSubmitted = false;
    this.submitForm = this.formBuilder.group({
      patient_name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
      active: new FormControl('', Validators.required),
    });
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
        patient_name: [res.data.patient_name, [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      email: [res.data.email,  [Validators.required, Validators.email]],
      contactNumber: [res.data.contact_number, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]],
      active: [res.data.active + '', Validators.required],
      });
    });
  }

  // tslint:disable-next-line: typedef
  updateById(id, data, formGroup: FormGroup) {
    this.isSubmitted = true;

    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    // else {
      // this.isSubmitted = true;
      this.service.updateById(id, data).subscribe(response => {
        if (response.data) {
          this.router.navigate([this.returnUrl]);
        }
        else {
          this.isSubmitted = false;
          this.message = 'Failed to submit the form.';
        }
      });
    // }
  }

}
