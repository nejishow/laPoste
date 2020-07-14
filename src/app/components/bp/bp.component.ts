import { Component, OnInit } from '@angular/core';
import { faUser, faBox, faMoneyBillWave, faExclamation } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-bp',
  templateUrl: './bp.component.html',
  styleUrls: ['./bp.component.css']
})
export class BpComponent implements OnInit {
  Boite = {
    type: 'GRAND',
    number: '234567',
    price: '5000',
    id: '345678'
  };
  modify = false;
  faUser = faUser;
  faBox = faBox;
  faMoney = faMoneyBillWave;
  faExc = faExclamation;
  constructor() { }

  ngOnInit(): void {
  }

}
