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
  boiteclients = [];
  modify = false;
  faUser = faUser;
  faBox = faBox;
  faMoney = faMoneyBillWave;
  faExc = faExclamation;
  idBoite;
  message;
  showMessage = false;
  isSuperviseur = false;
  hasPower = false;
  isAgent = false;
  isVisiteur = false;
  constructor(
    private boiteS: BoitesService,
    private aR: ActivatedRoute,
    private authS: AuthService
  ) {
    this.isSuperviseur = this.authS.isSuperviseur;
    this.hasPower = this.authS.hasPower;
    this.isVisiteur = this.authS.isVisiteur;
    this.isAgent = this.authS.isAgent;
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
      await boiteS.getBoiteClients(params.id).subscribe(async (data: any) => {
        this.boiteclients = data;
        await this.boiteclients.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          if (b.createdAt < a.createdAt) {
            return -1;
          }
          return 0;
        });
      },
        (error) => {
          if (error.status === 401) {
            this.authS.logout();
          }

        });

    });
  }
  libererBoite() {
    this.boiteS.libererBoite(this.boite._id).subscribe(async () => {
      this.message = 'Le client a eté resilié et la boite est libre';
      await this.boiteS.getBoiteClients(this.idBoite).subscribe(async (data: any) => {
        this.boiteclients = data;
        await this.boiteclients.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          if (b.createdAt < a.createdAt) {
            return -1;
          }
          return 0;
        });
        await this.boiteS.getBoite(this.boite._id).subscribe((_data: any) => {
          this.boite = _data;
        });
      });
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    });
  }

  ngOnInit(): void {
  }

}
