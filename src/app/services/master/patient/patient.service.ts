import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { baseURL } from '../../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  readonly baseUrl = baseURL;
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
      console.log('uuurrrrllll', this.baseUrl)
    return this.http.get<any>(this.baseUrl + 'api/patient');
  }

  getById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/patient' + '/' + id);
  }

  create(data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + 'api/patient', data, httpOptions);
  }

  updateById(id, data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.baseUrl + 'api/patient' + '/' + id, data, httpOptions);
  }

  deleteById(id): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/patient' + '/' + id);
  }
}
