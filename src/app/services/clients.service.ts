import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(this.url + '/clients');
  }
  getClient(id) {
    return this.http.get(this.url + '/client/' + id);
  }
  getClientType() {
    return this.http.get(this.url + '/ClientT');
  }

  getOneClientType(id) {
    return this.http.get(this.url + '/ClientT/' + id);
  }
  getClientBoite(id) {
    return this.http.get(this.url + '/clientBoite/' + id);
  }
  getForfaits() {
    return this.http.get(this.url + '/forfaits');
  }
  getForfaitClientT(id) {
    return this.http.get(this.url + '/forfaitClientT/' + id);
  }
  postForfait() {

  }
  getHistoric(id) {
    return this.http.get(this.url + '/historicPs/' + id);

  }
}
