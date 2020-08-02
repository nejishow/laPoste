import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoitesService {
  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getBoites() {
    return this.http.get(this.url + '/boites');
  }
  getAvailableBoite() {
    return this.http.get(this.url + '/Aboites');
  }
  getBoite(id) {
    return this.http.get(this.url + '/boite/' + id);
  }
  getBoiteTypes() {
    return this.http.get(this.url + '/boiteT');
  }
  getBoiteClients(id) {
    return this.http.get(this.url + '/boiteClient/' + id);
  }
}
