import { Component, OnInit } from '@angular/core';
import { faUser, faBox, faMoneyBillWave, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { BoitesService } from 'src/app/services/boites.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';


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
    private authS: AuthService
  ) {
    this.aR.params.subscribe(async params => {
      this.idBoite = params.id;
      await boiteS.getBoite(params.id).subscribe((data: any) => {
        this.boite = data;

      },
      (error) => {
        if (error.status === 401) {
          this.authS.logout();
        }

      });

      await boiteS.getBoiteClients(params.id).subscribe((data: any) => {
        this.boites = data;
      },
      (error) => {
        if (error.status === 401) {
          this.authS.logout();
        }

      });

    });
  }

  ngOnInit(): void {
  }

}
