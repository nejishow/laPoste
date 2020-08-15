import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  url = 'http://localhost:3000';
  headers;
  public operation;
  constructor(private http: HttpClient) { }
  setHeader() {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', localStorage.getItem('token'));
  }
  getOperations(id) {
    this.setHeader();
    return this.http.get(this.url + '/operations/' + id, { headers: this.headers });
  }
  getOperation(id) {
    this.setHeader();
    return this.http.get(this.url + '/operation/' + id, { headers: this.headers });
  }
}
