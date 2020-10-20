import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { BannerService } from '../../../../services/master/banner/banner.service';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit {

  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  id: string;
  getData;
  isSubmitted = false;
  Category: any = ['Web', 'Doctors on app', 'Users on app']
  constructor(private formBuilder: FormBuilder, private router: Router, private service: BannerService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      bannerTitle: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]),
      categoryName: new FormControl('', Validators.required),
      // file: new FormControl('', [Validators.required]),
      // fileSource: new FormControl('', [Validators.required]),
      active: ['', Validators.required]
    });
    this.returnUrl = '/master/banner';
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
        bannerTitle: new FormControl(res.data.banner_title, [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]),
      categoryName: new FormControl(res.data.banner_category, Validators.required),
      // file: new FormControl('', [Validators.required]),
      // fileSource: new FormControl('', [Validators.required]),
      active: [res.data.is_active + '', Validators.required],
      });
    });
  }

  get categoryName() {
    return this.submitForm.get('categoryName');
  }
  // tslint:disable-next-line: typedef
  updateById(id, data) {
    this.isSubmitted = true;

    // if (data.doctorName.trim() != "") {
    //   if (!($("#val_id1").hasClass("hidden")))
    //     $("#val_id1").addClass("hidden");
    // } else {
    //   $("#val_id1").removeClass("hidden");
    //   return false;
    // }

    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }

    const temp: any = {
      banner_title: data.bannerTitle,
      banner_category: data.categoryName,
      banner_image: 'banner_image'
    };
    // else {
      this.service.updateById(id, temp).subscribe(response => {
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
