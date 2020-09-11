import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { SpecializationService } from 'src/app/services/master/specialization/specialization.service';

@Component({
  selector: 'app-edit-specialization',
  templateUrl: './edit-specialization.component.html',
  styleUrls: ['./edit-specialization.component.css']
})
export class EditSpecializationComponent implements OnInit {
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: SpecializationService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      specialization: ['', Validators.required],
      condition: [''],
      status: ['', Validators.required]
    });
    this.returnUrl = '/master/settings/specialization';
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
          specialization: [res.data.specialization, Validators.required],
          condition: [res.data.condition]
        });
      });
  }

  // tslint:disable-next-line: typedef
  updateByIdData(id, data){
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
