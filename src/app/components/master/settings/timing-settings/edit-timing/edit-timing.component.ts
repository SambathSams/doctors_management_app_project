import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TimingService } from 'src/app/services/master/timing/timing.service';

@Component({
  selector: 'app-edit-timing',
  templateUrl: './edit-timing.component.html',
  styleUrls: ['./edit-timing.component.css']
})
export class EditTimingComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: TimingService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      clinicStartTime: ['09:00', Validators.required],
      clinicEndTime: ['18:00', Validators.required],
      roomStartTime: ['09:00', Validators.required],
      roomEndTime: ['18:00', Validators.required],
      status: ['', Validators.required]
    });
    this.returnUrl = '/master/settings/timing';
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
          roomNumber: [res.data.roomNumber, Validators.required],
          clinicStartTime: [res.data.clinicStartTime, Validators.required],
          clinicEndTime: [res.data.clinicEndTime, Validators.required],
          roomStartTime: [res.data.roomStartTime, Validators.required],
          roomEndTime: [res.data.roomEndTime, Validators.required],
          status: [res.data.status + '', Validators.required]
        });
      });
  }

  // tslint:disable-next-line: typedef
  updateById(id, data){
    if (this.submitForm.invalid) {
          this.message = 'Invalid form submission.';
          return;
        }
        else{
          this.isSubmitted = true;
          this.service.updateById(id, data).subscribe(response => {
            if (response.data){
              this.router.navigate([this.returnUrl]);
            }
            else{
              this.isSubmitted = false;
              this.message = 'Failed to submit the form.';
            }
          });
        }
  }

}
