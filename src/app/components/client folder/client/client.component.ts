import { PaymentsService } from './../../../services/payments.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser, faBox, faMoneyBillWave, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ClientsService } from 'src/app/services/clients.service';
import { BoitesService } from 'src/app/services/boites.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createHostListener } from '@angular/compiler/src/core';


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
  facheck = faCheck;
  // tslint:disable-next-line:radix
  year = parseInt((new Date().getFullYear()).toString());
  client;
  boites;
  currentBoite;
  historics;
  unpaids = [];
  constructor(public dialog: MatDialog, private aR: ActivatedRoute,
    private route: Router,
    private clientS: ClientsService,
    private boiteS: BoitesService
  ) {
    this.aR.params.subscribe(async params => {
      this.idUser = params.id;
      await this.clientS.getClient(params.id).subscribe((data: any) => {
        this.client = data;
        console.log(data);
        
      });
      await this.clientS.getHistoric(params.id).subscribe(async (data: any) => {
        this.historics = data;
        await this.historics.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          if (b.createdAt < a.createdAt) {
            return -1;
          }
          return 0;
        });
        if (this.historics[0]) {
          this.getUnpaid(this.historics[0]);

        }
        this.historics.forEach(historic => {
          // tslint:disable-next-line:max-line-length
          historic.createdAt = new Date(historic.createdAt).getDate() + '/' + (new Date(historic.createdAt).getMonth() + 1) + '/' + new Date(historic.createdAt).getFullYear();
        });

      });
      await this.clientS.getClientBoite(params.id).subscribe(async (datas: any) => {
        this.boites = datas;
        this.currentBoite = this.boites;
        

      });
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    //
  }
  getUnpaid(historic) {
    const year = new Date().getFullYear();
    for (let index = 0; index < year - historic.date; index++) {
      this.unpaids[index] = { idClient: historic.idClient, date: historic.date + index + 1 };

    }
    this.unpaids.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      }
      if (b.date > a.date) {
        return -1;
      }
      return 0;
    });
  }

  pay(id, date: number) {
    this.route.navigate(['/addPayment/', id, { queryParams: date }]);

  }
}
