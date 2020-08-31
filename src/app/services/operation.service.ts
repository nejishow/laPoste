import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  url = 'https://lapostededjibouti.herokuapp.com';
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
  getAllOperations() {
    this.setHeader();
    return this.http.get(this.url + '/allOperations', { headers: this.headers });
  }
  getOperation(id) {
    this.setHeader();
    return this.http.get(this.url + '/operation/' + id, { headers: this.headers });
  }

  postOperation(operation) {
    this.setHeader();
    return this.http.post(this.url + '/historicOperation', operation, { headers: this.headers });
  }


}
