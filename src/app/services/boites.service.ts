import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoitesService {
  url = 'http://localhost:3000';
  headers;
  constructor(private http: HttpClient) { }
  setHeader() {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', localStorage.getItem('token'));
  }
  getBoites() {
    this.setHeader();
    return this.http.get(this.url + '/boites', { headers: this.headers });
  }

  libererBoite(id) {
    this.setHeader();
    return this.http.post(this.url + '/attributeBoite/' + id, {}, { headers: this.headers });
  }

  getAvailableBoite() {
    this.setHeader();

    return this.http.get(this.url + '/Aboites', { headers: this.headers });
  }
  getBoite(id) {
    this.setHeader();

    return this.http.get(this.url + '/boite/' + id, { headers: this.headers });
  }
  getBoiteTypes() {
    this.setHeader();

    return this.http.get(this.url + '/boiteT', { headers: this.headers });
  }
  getBoiteType(id) {
    this.setHeader();

    return this.http.get(this.url + '/oneBoiteT/' + id, { headers: this.headers });
  }
  getBoiteClients(id) {
    this.setHeader();

    return this.http.get(this.url + '/boiteClient/' + id, { headers: this.headers });
  }
  getBoiteAllClients(id) {
    this.setHeader();

    return this.http.get(this.url + '/boiteClients/' + id, { headers: this.headers });
  }
  getAllClientBoites() {
    this.setHeader();

    return this.http.get(this.url + '/allClientBoites', { headers: this.headers });
  }


  changeBoiteType(idClient, idBoiteType) {
    this.setHeader();
    return this.http.post(this.url + '/newBoiteType', { idClient, idBoiteType }, { headers: this.headers });
  }
}
