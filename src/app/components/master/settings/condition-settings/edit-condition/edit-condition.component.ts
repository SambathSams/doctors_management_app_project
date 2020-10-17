import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ConditionService } from 'src/app/services/master/condition/condition.service';

@Component({
  selector: 'app-edit-condition',
  templateUrl: './edit-condition.component.html',
  styleUrls: ['./edit-condition.component.css']
})
export class EditConditionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: ConditionService) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      healthIssues: ['', Validators.required]
    });
    this.returnUrl = '/master/settings/condition';
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
          healthIssues: res.data.healthIssues
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
