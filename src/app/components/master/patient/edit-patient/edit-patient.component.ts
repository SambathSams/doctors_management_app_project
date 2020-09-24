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
    this.submitForm = this.formBuilder.group({
      patient_name: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: [''],
      active: ['', Validators.required]
    });
    this.returnUrl = '/master/patient';
    this.id = this.router.url.split('/').pop();
    this.getByIdData(this.id);
  }

  blurMethod1() {
    $("#val_id1").addClass("hidden");
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
        patient_name: [res.data.patient_name, Validators.required],
      email: [res.data.email, Validators.required],
      contactNumber: [res.data.contact_number],
      active: [res.data.active + '', Validators.required],
      });
    });
  }

  // tslint:disable-next-line: typedef
  updateById(id, data) {
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
    else {
      this.isSubmitted = true;
      this.service.updateById(id, data).subscribe(response => {
        if (response.data) {
          this.router.navigate([this.returnUrl]);
        }
        else {
          this.isSubmitted = false;
          this.message = 'Failed to submit the form.';
        }
      });
    }
  }

}
