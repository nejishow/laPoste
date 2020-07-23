import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientsService {
url = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(this.url +"/clients")
  }
  getClient(id) {
    return this.http.get(this.url +"/client/"+ id)
  }
  getClientType() {
    return this.http.get(this.url +"/ClientT")

  }
}
