import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { SpecializationService } from '../../../../../services/master/specialization/specialization.service';

@Component({
  selector: 'app-add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.css']
})
export class AddSpecializationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: SpecializationService) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;

  ngOnInit(): void {
    // this.submitForm = new FormGroup({
    //   specialization: new FormControl(),
    //   condition : new FormControl()
    // });
    this.submitForm = this.formBuilder.group({
      specialization: ['', Validators.required],
      // condition: ['']
    });
    this.returnUrl = '/master/settings/specialization';
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  // tslint:disable-next-line: typedef
  addData(formGroup: FormGroup,data){
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    // else{
      // this.isSubmitted = true;
      this.service.create(data).subscribe(response => {
        if (response.data){
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.isSubmitted = false;
          this.message = 'Failed to submit the form.';
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
