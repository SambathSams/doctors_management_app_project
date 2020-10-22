import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { baseURL, baseLocalURL } from '../../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class ClinicManagerService {

  readonly baseUrl = baseURL;
  readonly baseLocal = baseLocalURL;
  constructor(private http: HttpClient) { }

  
  loginss(data): Observable<any> {
    console.log('checkhitttttttssssss')
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseLocal + 'api/clinicMangerSignIn', data, httpOptions);
  }

 
}
