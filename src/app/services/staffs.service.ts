import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffsService {
  url = environment.backendURL;
  headers;
  constructor(private http: HttpClient) { }
  setHeader() {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', localStorage.getItem('token'));
  }
  getStaff(id) {
    this.setHeader();
    return this.http.get(this.url + '/staff/' + id, { headers: this.headers });
  }
  getAllStaff() {
    this.setHeader();
    return this.http.get(this.url + '/staffs', { headers: this.headers });
  }
}
