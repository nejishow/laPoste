import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  url = 'https://lapostededjibouti.herokuapp.com'; //
  //  url = 'http://localhost:3000';
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
    return this.http.get(this.url + '/clientBoites', { headers: this.headers });
  }
  getClient(id) {
    this.setHeader();
    return this.http.get(this.url + '/client/' + id, { headers: this.headers });
  }
  postClient(client) {
    this.setHeader();
    return this.http.post(this.url + '/client', client, { headers: this.headers });
  }
  postClientBoite(clientBoite) {
    this.setHeader();
    return this.http.post(this.url + '/clientBoite', clientBoite, { headers: this.headers });
  }
  getClientType() {
    this.setHeader();
    return this.http.get(this.url + '/ClientT', { headers: this.headers });
  }

  getOneClientType(id) {
    this.setHeader();
    return this.http.get(this.url + '/ClientT/' + id, { headers: this.headers });
  }
  getClientBoite(id) {
    this.setHeader();
    return this.http.get(this.url + '/clientBoites/' + id, { headers: this.headers });
  }
  getAllClientBoite() {
    this.setHeader();
    return this.http.get(this.url + '/allClientBoites', { headers: this.headers });
  }
  getRedClients() {
    this.setHeader();
    return this.http.get(this.url + '/clientBoiteRED/', { headers: this.headers });
  }
  getForfaits() {
    this.setHeader();
    return this.http.get(this.url + '/forfaits', { headers: this.headers });
  }
  updateClient(id) {
    this.setHeader();
    return this.http.post(this.url + '/updateClient/' + id, {}, { headers: this.headers });
  }
  getForfaitClientT(id) {
    this.setHeader();
    return this.http.get(this.url + '/forfaitClientT/' + id, { headers: this.headers });
  }
  getHistoric(id) {
    this.setHeader();
    return this.http.get(this.url + '/historicPs/' + id, { headers: this.headers });

  }
  deleteClient(id) {
    this.setHeader();
    return this.http.delete(this.url + '/deleteClient/' + id, { headers: this.headers });

  }

  modifiyClient(id, client) {
    this.setHeader();
    return this.http.post(this.url + '/modifyClient/' + id, client, { headers: this.headers });
  }

}
