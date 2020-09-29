import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { DoctorService } from '../../../../services/master/doctor/doctor.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: DoctorService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      doctorName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      contactNumber: [''],
      active: ['', Validators.required]
    });
    this.returnUrl = '/master/doctor';
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
        doctorName: [res.data.doctorName, Validators.required],
      email: [res.data.email, Validators.required],
      contactNumber: [res.data.contactNumber],
      active: [res.data.active + '', Validators.required],
      });
    });
  }

  // tslint:disable-next-line: typedef
  updateById(id, data) {
    this.isSubmitted = true;

    if (data.doctorName.trim() != "") {
      if (!($("#val_id1").hasClass("hidden")))
        $("#val_id1").addClass("hidden");
    } else {
      $("#val_id1").removeClass("hidden");
      return false;
    }

    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    // else {
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
