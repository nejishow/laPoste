import { Injectable } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
private clients= new Subject<any>();
public allClients;
  constructor(private clientS: ClientsService) { 
    this.sendClients()
  }
  sendClients() {
    this.clientS.getClients().subscribe(async(data:any)=> {
      this.allClients = data
      this.clients.next(this.allClients)
    }
  )
  }
  getClients(): Observable<any> {
    return this.clients.asObservable();
  }
}
