import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TimingService } from 'src/app/services/master/timing/timing.service';

@Component({
  selector: 'app-add-timing',
  templateUrl: './add-timing.component.html',
  styleUrls: ['./add-timing.component.css']
})
export class AddTimingComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: TimingService ) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      clinicStartTime: ['09:00', Validators.required],
      clinicEndTime: ['18:00', Validators.required],
      roomStartTime: ['09:00', Validators.required],
      roomEndTime: ['18:00', Validators.required]
    });
    this.returnUrl = '/master/settings/timing';
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(data){
    console.log(data);
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
