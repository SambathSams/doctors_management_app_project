import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ReceptionistService } from '../../../../services/master/receptionist/receptionist.service';

@Component({
  selector: 'app-add-receptionist',
  templateUrl: './add-receptionist.component.html',
  styleUrls: ['./add-receptionist.component.css']
})
export class AddReceptionistComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ReceptionistService ) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      receptionistName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.returnUrl = '/master/receptionist';
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(formGroup: FormGroup,data){
    console.log(data);
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    // else{
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
      this.onReset();
    // }
  }

  onReset() {
    this.isSubmitted = false;
    this.submitForm.reset();
  }

}
