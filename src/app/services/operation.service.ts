import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  url = 'https://lapostededjibouti.herokuapp.com'; //
  //url = 'http://localhost:3000'; //
  headers;
  public operation;
  constructor(private http: HttpClient) { }
  setHeader() {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', localStorage.getItem('token'));
  }
  getOperations(id) { // les operations d'une persone
    this.setHeader();
    return this.http.get(this.url + '/operations/' + id, { headers: this.headers });
  }
  getAllOperations() {
    this.setHeader();
    return this.http.get(this.url + '/allOperations', { headers: this.headers });
  }
  getOperation(id) { // operation precise
    this.setHeader();
    return this.http.get(this.url + '/operation/' + id, { headers: this.headers });
  }

  postOperation(operation) {
    this.setHeader();
    return this.http.post(this.url + '/historicOperation', operation, { headers: this.headers });
  }
  deleteOperation(id) {
    this.setHeader();
    return this.http.post(this.url + '/deleteOp/'+id,{}, { headers: this.headers });
  }
///////////////////////////////

getDeletions(id) { // les operations d'une persone
    this.setHeader();
    return this.http.get(this.url + '/deletions/' + id, { headers: this.headers });
  }
  getAllDeletions() {
    this.setHeader();
    return this.http.get(this.url + '/alldeletions', { headers: this.headers });
  }
  getDeletion(id) { // operation precise
    this.setHeader();
    return this.http.get(this.url + '/deletion/' + id, { headers: this.headers });
  }

  postDeletion(deletion) {
    this.setHeader();
    return this.http.post(this.url + '/deletion', deletion, { headers: this.headers });
  }


}
