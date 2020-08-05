import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  url = 'http://localhost:3000';
  headers;
  constructor(private http: HttpClient) { }
  setHeader() {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', localStorage.getItem('token'));
  }
  getPayment(id) {
    this.setHeader();
    return this.http.get(this.url + '/payment/' + id, { headers: this.headers });
  }
  getClientForfait(id) { // client
    this.setHeader();
    return this.http.get(this.url + '/clientForfait/' + id, { headers: this.headers });

  }
  postHistoricForfait(historic) {
    this.setHeader();
    return this.http.post(this.url + '/historicForfait', historic, { headers: this.headers });

  }
  postPayment(payment) {
    this.setHeader();
    return this.http.post(this.url + '/historicP', payment, { headers: this.headers });

  }
}
