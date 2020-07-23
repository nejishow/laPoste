import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser, faBox, faMoneyBillWave, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { ClientsService } from 'src/app/services/clients.service';
import { BoitesService } from 'src/app/services/boites.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  idUser;
  modify = false;
  faUser = faUser;
  faBox = faBox;
  faMoney = faMoneyBillWave;
  faExc = faExclamation;

  client ;
  boite;
  constructor(private aR: ActivatedRoute,
    private route: Router,
    private clientS: ClientsService,
    private boiteS: BoitesService
  ) {
    this.aR.params.subscribe(params => {
      this.idUser = params.id;
      clientS.getClient(params.id).subscribe((data: any) => {
        this.client = data;
        
      });
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    //
  }

}
