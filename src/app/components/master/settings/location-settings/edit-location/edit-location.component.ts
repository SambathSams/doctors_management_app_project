import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { LocationService } from '../../../../../services/master/location/location.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: LocationService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      state: ['', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      city: ['', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      pincode: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      location: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.returnUrl = '/master/settings/location';
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
          state: [res.data.state ,[Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      city: [res.data.city, [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      pincode: [res.data.pincode, [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
      location: [res.data.location, Validators.required],
      status: [res.data.status+ '', Validators.required],
        });
      });
  }

  // tslint:disable-next-line: typedef
  updateByIdData(id, data){
    this.isSubmitted = true;


    if (this.submitForm.invalid) {
          this.message = 'Invalid form submission.';
          return;
        }
        // else{
          this.service.updateById(id, data).subscribe(response => {
            if (response.data){
              this.router.navigate([this.returnUrl]);
            }
            else{
              this.isSubmitted = false;
              this.message = 'Failed to submit the form.';
            }
          });
        // }
  }

}
