import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { baseURL } from '../../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  readonly baseUrl = baseURL;
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/doctor');
  }

  getById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'api/doctor' + '/' + id);
  }

  create(data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseUrl + 'api/doctor', data, httpOptions);
  }

  updateById(id, data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.baseUrl + 'api/doctor' + '/' + id, data, httpOptions);
  }

  deleteById(id): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/doctor' + '/' + id);
  }
}
