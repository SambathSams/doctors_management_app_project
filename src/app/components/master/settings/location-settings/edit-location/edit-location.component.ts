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
      full_location: ['', Validators.required ],
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

  public handleAddressChange(address) {
    console.log('evennnntttttt', address);
    var city = "";
    var state = "";
    var country = "";
    var postal_code = ""
    var loc_1 = ""
    var loc_2 = ""
    var loc_3 = ""
    var loc_4 = ""
    for (var i = 0, len = address.address_components.length; i < len; i++) {
      var ac = address.address_components[i];
      if (ac.types.indexOf("locality") >= 0) city = ac.long_name;
      if (ac.types.indexOf("administrative_area_level_1") >= 0) state = ac.long_name;
      if (ac.types.indexOf("country") >= 0) country = ac.long_name;
      if (ac.types.indexOf("postal_code")>=0) postal_code = ac.long_name;
      if (ac.types.indexOf("subpremise")>=0) loc_1 = ac.long_name;
      if (ac.types.indexOf("premise")>=0) loc_2 = ac.long_name;
      if (ac.types.indexOf("sublocality_level_2")>=0) loc_3 = ac.long_name;
      if (ac.types.indexOf("sublocality_level_1")>=0) loc_4 = ac.long_name;  
    }
    var locat = loc_1+' '+ loc_2+' '+loc_3+' '+loc_4;
    console.log(city,'+',state, '+',country, '+', postal_code);
    this.submitForm = this.formBuilder.group({
      full_location: [address.formatted_address, Validators.required ],
      state: [state, [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      city: [city, [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      pincode: [postal_code, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      location: [locat, Validators.required],
      status: ['true'],
    });
  }

  // tslint:disable-next-line: typedef
  getByIdData(id) { 
    this.service.getById(id).subscribe(res => {
        console.log(res.data);
        this.getData = res.data;
        console.log(res.data);
        this.submitForm = this.formBuilder.group({
          full_location: [res.data.full_location, Validators.required ],
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
