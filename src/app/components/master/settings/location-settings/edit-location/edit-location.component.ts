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
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
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
          state: res.data.state,
      city: res.data.city,
      pincode: res.data.pincode,
      location: res.data.location,
      status: res.data.status + '',
        });
      });
  }

  // tslint:disable-next-line: typedef
  updateByIdData(id, data){
    this.isSubmitted = true;
    if (data.state.trim() != "") {
      if (!($("#val_id1").hasClass("hidden")))
        $("#val_id1").addClass("hidden");
    } else {
      $("#val_id1").removeClass("hidden");
      return false;
    }

    if (data.city.trim() != "") {
      if (!($("#val_id2").hasClass("hidden")))
        $("#val_id2").addClass("hidden");
    } else {
      $("#val_id2").removeClass("hidden");
      return false;
    }

    if (data.location.trim() != "") {
      if (!($("#val_id3").hasClass("hidden")))
        $("#val_id3").addClass("hidden");
    } else {
      $("#val_id3").removeClass("hidden");
      return false;
    }

    // if (data.pincode.trim() != "") {
    //   if (!($("#val_id4").hasClass("hidden")))
    //     $("#val_id4").addClass("hidden");
    // } else {
    //   $("#val_id4").removeClass("hidden");
    //   return false;
    // }


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
