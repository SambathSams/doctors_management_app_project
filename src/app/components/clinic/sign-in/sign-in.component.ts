import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { ClinicManagerService } from './sign-in.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  model;
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private authService: AuthService,
    private service: ClinicManagerService,
    // private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/master/dashboard';

  }

  get f() { return this.loginForm.controls; }
  login(data) {
    console.log(data)
    const temp: any = {
      email: data.email,
      password: data.password,
    };
    // const temp = {
    //   'email': data.email,
    //   'password': data.password,
    // };
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    
    else{
      // tslint:disable-next-line: triple-equals
      this.service.loginss(temp).subscribe(response => {
        console.log('check...', response);
        if (response.success) {
          console.log('reeeeesss', response)
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', this.f.email.value);
          this.router.navigate([this.returnUrl]);
        }
        else {
          // this.isSubmitted = false;
          this.message = 'Failed to submit the form.';
          console.log('fffffffff',data);
        }
      });
    }
  }

}
