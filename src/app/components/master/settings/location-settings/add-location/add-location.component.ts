import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { LocationService } from '../../../../../services/master/location/location.service';
// import {Address} from "address";
@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
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
      full_location: ['', Validators.required ],
      state: ['', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      city: ['', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      location: ['', Validators.required],
      status: ['true'],
    });
    this.returnUrl = '/master/settings/location';
  }

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
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(formGroup: FormGroup, data) {
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    else {
      this.isSubmitted = true;
      this.service.create(data).subscribe(response => {
        if (response.data) {
          this.router.navigate([this.returnUrl]);
        }
        else {
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
