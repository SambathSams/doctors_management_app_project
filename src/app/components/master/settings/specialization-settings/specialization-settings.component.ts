import { Component, OnInit } from '@angular/core';

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
  selector: 'app-specialization-settings',
  templateUrl: './specialization-settings.component.html',
  styleUrls: ['./specialization-settings.component.css']
})
export class SpecializationSettingsComponent implements OnInit {

  allData;
  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.getAllSpecialization().subscribe(data => {
      this.allData = {all: data};
    });
    console.log(this.allData);
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

  getAllSpecialization(): Observable<any> {
    return this.http.get(baseUrl + 'api/specialization').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

}
