import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LocationService } from '../../../../../services/master/location/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: LocationService) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;
  formattedaddress = '';
  options = {
    componentRestrictions: {
      country: ['IN']
    }
  };

  ngOnInit(): void {
    // this.submitForm = new FormGroup({
    //   specialization: new FormControl(),
    //   condition : new FormControl()
    // });
    this.submitForm = this.formBuilder.group({
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      location: ['', Validators.required],
      status: ['true'],
    });
    this.returnUrl = '/master/settings/location';
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(formGroup: FormGroup, data){
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
          this.message = 'Failed to submit the form.';
        }
      });
      this.onReset();
    }
  }

  onReset() {
    this.isSubmitted = false;
    this.submitForm.reset();
  }

  // tslint:disable-next-line: typedef
  public AddressChange(address: any) {
     this.formattedaddress = address.formatted_address;
  }
}
