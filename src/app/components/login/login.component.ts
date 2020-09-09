import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse} from '@angular/common/http';
import { baseURL } from 'constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': baseURL,
  })
};

const baseUrl = baseURL;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model;
  loginForm: FormGroup;
  message: string;
  returnUrl: string;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/master/dashboard';
    this.getAllAdmin().subscribe(data => {
      this.model = { email: data.data[0].email, password: data.data[0].password};
    });
  }

  // convenience getter for easy access to form fields
  // tslint:disable-next-line: typedef
  get f() { return this.loginForm.controls; }

  // tslint:disable-next-line: typedef
  login() {
    this.authService.logout();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    else{
      // tslint:disable-next-line: triple-equals
      if (this.f.email.value == this.model.email && this.f.password.value == this.model.password){
        console.log('Login successful');
        // this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.f.email.value);
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.message = 'Please check your email and password';
      }
    }
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getAllAdmin(): Observable<any> {
    return this.http.get(baseUrl + 'api/admin').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }


}
