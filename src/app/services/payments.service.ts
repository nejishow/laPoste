import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getPayment(id) {
    return this.http.get(this.url + '/payment/' + id);
  }
  getClientForfait(id) { // client
    return this.http.get(this.url + '/clientForfait/' + id);

  }
}
