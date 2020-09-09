import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'https://doctors-management-app.herokuapp.com',
  })
};

const baseUrl = 'https://doctors-management-app.herokuapp.com/';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
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

  // getAllAdmin(): Observable<any> {
  //   return this.http.get(baseUrl + 'api/admin').pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //   );
  // }

}
