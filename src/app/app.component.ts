import { Component } from '@angular/core';
import { SharedService } from './shared/shared.service';
import { ClientsService } from './services/clients.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'La Poste';
  constructor(private clients: ClientsService) {
    this.saveClients();
  }

  saveClients() {
    this.clients.getClients().subscribe((data:JSON)=> {
      localStorage.setItem('clients', JSON.stringify(data));
    })
  }
}
