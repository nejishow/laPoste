import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  url = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', localStorage.getItem('token'));
  constructor(private http: HttpClient) {
  }

  setHeader() {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', localStorage.getItem('token'));
  }
  getClients() {
    this.setHeader();
    return this.http.get(this.url + '/clients', { headers: this.headers });
  }
  getClient(id) {
    this.setHeader();
    return this.http.get(this.url + '/client/' + id, { headers: this.headers });
  }
  postClient(client) {
    this.setHeader();
    return this.http.post(this.url + '/client', client , { headers: this.headers });
  }
  getClientType() {
    this.setHeader();
    return this.http.get(this.url + '/ClientT', { headers: this.headers});
  }

  getOneClientType(id) {
    this.setHeader();
    return this.http.get(this.url + '/ClientT/' + id, { headers: this.headers});
  }
  getClientBoite(id) {
    this.setHeader();
    return this.http.get(this.url + '/clientBoite/' + id, { headers: this.headers});
  }
  getForfaits() {
    this.setHeader();
    return this.http.get(this.url + '/forfaits', { headers: this.headers});
  }
  getForfaitClientT(id) {
    this.setHeader();
    return this.http.get(this.url + '/forfaitClientT/' + id, { headers: this.headers});
  }
  getHistoric(id) {
    this.setHeader();
    return this.http.get(this.url + '/historicPs/' + id, { headers: this.headers});

  }
}