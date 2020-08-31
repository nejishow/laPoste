import { BoitesService } from './../../../services/boites.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OperationService } from './../../../services/operation.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser, faBox, faMoneyBillWave, faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ClientsService } from 'src/app/services/clients.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public idUser;
  clientType: FormGroup;
  modify = false;
  faUser = faUser;
  faBox = faBox;
  faMoney = faMoneyBillWave;
  faExc = faExclamation;
  facheck = faCheck;
  // tslint:disable-next-line:radix
  year = parseInt((new Date().getFullYear()).toString());
  client;
  clientBoite;
  allClientType = [];
  operations = []; // les operations disponibles
  myoperations = []; // mes operations
  boites;
  currentBoite;
  historics;
  unpaids = [];
  isSuperviseur = false;
  hasPower = false;
  isAgent = false;
  isVisiteur = false;
  isNewBoite = false;
  newBoiteType: FormGroup;
  boiteTypes = [];
  constructor(private aR: ActivatedRoute,
    private route: Router, private formBuilder: FormBuilder,
    private clientS: ClientsService, private boiteS: BoitesService,
    private operationS: OperationService, private authS: AuthService
  ) {
    this.isSuperviseur = this.authS.isSuperviseur;
    this.hasPower = this.authS.hasPower;
    this.isVisiteur = this.authS.isVisiteur;
    this.isAgent = this.authS.isAgent;
    this.aR.params.subscribe(async params => {
      this.idUser = params.id;
      await this.clientS.getClient(params.id).subscribe(async (data: any) => {
        this.client = data;
        await this.clientS.getClientBoite(params.id).subscribe(async (_data: any) => {
          this.clientBoite = _data;
          this.initModifyClientForm();
          await this.clientS.getOneClientType(data.idClientType).subscribe((result: any) => {
            this.operations = result.operations;
            this.boiteTypes = result.idBoitetypes;
          });

        });
        await this.operationS.getOperations(params.id).subscribe((operations: any) => {
          this.myoperations = operations;
        });

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
    this.clientS.getClientType().subscribe((ct: any) => {
      this.allClientType = ct;
    });
  }
  newBoiteT() {
    this.boiteS.changeBoiteType(this.idUser, this.newBoiteType.get('newBoite').value).subscribe(async (data) => {
      this.clientBoite = data;
      this.isNewBoite = false;
    });
  }
  ngOnInit(): void {
    this.newBoiteType = this.formBuilder.group({
      newBoite: ['', Validators.required],
    });
  }

  initModifyClientForm() {
    this.clientType = this.formBuilder.group({
      ctype: ['', Validators.required],
      name: [this.client.name, Validators.required],
      address: [this.client.address, Validators.required],
      email: [this.client.email, Validators.required],
      number: [this.client.number, Validators.required],

    });
  }

  save(): void {
    //
    const client = {
      name: this.clientType.get('name').value,
      number: this.clientType.get('number').value,
      address: this.clientType.get('address').value,
      email: this.clientType.get('email').value,
      idClientType: this.clientType.get('ctype').value
    };
    this.clientS.modifiyClient(this.idUser, client).subscribe((data: any) => {
      this.clientBoite = data.cb;
      this.client = data.client;
      this.modify = false;

    });

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
