import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ClinicService } from 'src/app/services/master/clinic/clinic.service';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styleUrls: ['./add-clinic.component.css']
}) 
export class AddClinicComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ClinicService ) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      clinicName: ['', Validators.required],
      state: ['', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      city: ['', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      location: ['', Validators.required],
      status: ['true'],
      comment: ['']
    });
    this.returnUrl = '/master/clinic';
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(formGroup: FormGroup, data){
    // console.log(data);
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    else{
      this.isSubmitted = true;
      this.service.create(data).subscribe(response => {
        if (response.data){
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.isSubmitted = false;
          this.message = 'Failed to submit the form.';
          console.log(data);
        }
      });
    }
  }

}
