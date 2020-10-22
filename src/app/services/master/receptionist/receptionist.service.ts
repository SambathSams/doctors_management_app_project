import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { baseURL, baseLocalURL } from '../../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {

  readonly baseUrl = baseURL;
  readonly baseLocal = baseLocalURL;
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/receptionist');
  }

  getById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/receptionist' + '/' + id);
  }
 
  create(data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + 'api/receptionist', data, httpOptions);
  }

  addClinicManager(data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseLocal + 'api/addClinicManager', data, httpOptions);
  }

  updateById(id, data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.baseUrl + 'api/receptionist' + '/' + id, data, httpOptions);
  }

  deleteById(id): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/receptionist' + '/' + id);
  }
}
