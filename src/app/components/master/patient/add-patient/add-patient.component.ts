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

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PatientService ) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      patient_name: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: [''],
    });
    this.returnUrl = '/master/patient';
  }

  blurMethod1() {
    $("#val_id1").addClass("hidden");
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(data){
    console.log(data.patient_name);
    // alert(data.patient_name)
    let pName = data.patient_name;
    if (pName.trim() != "") {
      if (!($("#val_id1").hasClass("hidden")))
        $("#val_id1").addClass("hidden");
    } else {
      alert('Space not allowed')
      $("#val_id1").removeClass("hidden");
      return false;
    }

    if (data.email.trim() != "") {
      if (!($("#val_id1").hasClass("hidden")))
        $("#val_id1").addClass("hidden");
    } else {
      alert('Space not allowed')
      $("#val_id1").removeClass("hidden");
      return false;
    }

    if (data.contactNumber.trim() != "") {
      if (!($("#val_id1").hasClass("hidden")))
        $("#val_id1").addClass("hidden");
    } else {
      alert('Space not allowed')
      $("#val_id1").removeClass("hidden");
      return false;
    }

    if (!Util.validateEmail(data.email)) {
      if ($("#email1").hasClass('hidden')) {
        alert('Insert valid email')
        $("#email1").removeClass('hidden');
        return;
      }
    } else {
      $("#email1").addClass('hidden')
    }

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
