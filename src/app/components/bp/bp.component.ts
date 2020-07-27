import { Component, OnInit } from '@angular/core';
import { faUser, faBox, faMoneyBillWave, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { BoitesService } from 'src/app/services/boites.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';


@Component({
  selector: 'app-bp',
  templateUrl: './bp.component.html',
  styleUrls: ['./bp.component.css']
})
export class BpComponent implements OnInit {
  boite;
  boites;
  modify = false;
  faUser = faUser;
  faBox = faBox;
  faMoney = faMoneyBillWave;
  faExc = faExclamation;
  idBoite;
  constructor(
    private boiteS: BoitesService,
    private aR: ActivatedRoute,
    private clientS: ClientsService
  ) {
    this.aR.params.subscribe(async params => {
      this.idBoite = params.id;
      await boiteS.getBoite(params.id).subscribe((data: any) => {
        this.boite = data;
      });
      await boiteS.getBoiteClients(params.id).subscribe((data: any) => {
        this.boites = data;
      });
    });
  }

  ngOnInit(): void {
  }

}
