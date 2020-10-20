import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { baseURL, baseLocalURL } from '../../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  readonly baseUrl = baseURL;
  readonly baseLocal = baseLocalURL;
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseLocal + 'api/banner');
  }

  create(data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post(this.baseLocal + 'api/banner', data, httpOptions);
  }

  getById(id): Observable<any> {
    return this.http.get(this.baseLocal + 'api/banner' + '/' + id);
  }

  updateById(id, data): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put(this.baseLocal + 'api/banner' + '/' + id, data, httpOptions);
  }

 
}
