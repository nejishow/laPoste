import { Injectable } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private clientS: ClientsService) {
  }
}
