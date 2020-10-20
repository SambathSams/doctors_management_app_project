import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BannerService } from '../../../../services/master/banner/banner.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: BannerService) { }
  submitForm: FormGroup;
  returnUrl: string;
  message: string;
  isSubmitted = false;
  imageSrc: string;
  Category: any = ['Web', 'Doctors on app', 'Users on app']
  ngOnInit(): void {
    this.initForm();
    this.returnUrl = '/master/banner';
  }

  initForm() {
    this.isSubmitted = false;
    this.submitForm = this.formBuilder.group({
      bannerTitle: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\\-\\s]+$")]),
      categoryName: new FormControl('', Validators.required),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
      // contactNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  // changeCategory(e) {
  //   console.log('hiiiiiirrrr', e.value)
  //   this.categoryName.setValue(e.target.value, {
  //     onlySelf: true
  //   })
  // }


  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        // console.log(reader.result)
        this.submitForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  // tslint:disable-next-line: typedef
  get f() { return this.submitForm.controls; }

  get categoryName() {
    return this.submitForm.get('categoryName');
  }
  // tslint:disable-next-line: typedef
  addData(formGroup: FormGroup, data) {
    console.log(data);
    // Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
    this.isSubmitted = true;
    if (this.submitForm.invalid) {
      this.message = 'Invalid form submission.';
      return;
    }
    const temp: any = {
      banner_title: data.bannerTitle,
      banner_category: data.categoryName,
      banner_image: 'banner_image'
    };
    // else{
    this.isSubmitted = true;
    this.service.create(temp).subscribe(response => {
      if (response.data) {
        this.router.navigate([this.returnUrl]);
      }
      else {
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
