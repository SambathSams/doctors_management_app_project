import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { RoomService } from 'src/app/services/master/room/room.service';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: RoomService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      rentPerMonth: [''],
      paidStatus: ['false', Validators.required]
    });
    this.returnUrl = '/master/room';
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
      rentPerMonth: [res.data.rentPerMonth],
      paidStatus: [res.data.paidStatus + '', Validators.required],
      });
    });
  }

  // tslint:disable-next-line: typedef
  updateById(id, data) {
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
