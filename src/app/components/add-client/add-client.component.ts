import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { StaffsService } from './../../services/staffs.service';
import { PaymentsService } from './../../services/payments.service';
import { BoitesService } from './../../services/boites.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  errorMessage;
  loading = false;
  clientForm: FormGroup;
  forfaits; // tous les forfaits
  forfaitClient = []; // les forfaits approprié ce type de client
  choosenForfait = []; // les forfaits qu'il a choisit
  historiqueForfait = {
    idClient: '',
    forfaits: [],
    idBoite: '',
    idStaff: '',
    enabled: true
  };
  total = 0; // premier paiement
  boitePrice = 0; // prix de la boite choisit
  choosenBoite;
  idNewClient;
  historicPayment = {
    boiteNumber: '',
    forfaits: [],
    idBoite: '',
    idClient: '',
    priceBoite: 0,
    staffs: [],
    enabled: true,
    date: 0,
    total: 0
  };
  clientTypes; // tous les types de client
  boites; // toutes les boites "disponibles"

  E1 = true;
  E2 = false;
  E3 = false;

  clientProfil = {
    name: '',
    number: '',
    email: '',
    address: '',
    boiteNumber: '',
    idBoite: '',
    clientType: '',
    idClientType: '',
    enabled: false,
    bg: '',
    idStatus: '',
    status: ''
  };
  constructor(
    private formBuilder: FormBuilder,
    private clientS: ClientsService,
    private boiteS: BoitesService,
    private payS: PaymentsService,
    private authS: AuthService,
    private router: Router

  ) {
    this.clientS.getForfaits().subscribe(data => {
      this.forfaits = data;
    },
      (error) => {
        if (error.status === 401) {
          this.authS.logout();
        }

      });
    this.clientS.getClientType().subscribe(data => {
      this.clientTypes = data;
    });
    this.boiteS.getAvailableBoite().subscribe(data => {
      this.boites = data;
    });
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.clientForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  async onSubmit(): Promise<any> {
    this.loading = true;
    this.clientProfil = {
      name: this.clientForm.get('name').value,
      number: this.clientForm.get('number').value,
      address: this.clientForm.get('address').value,
      boiteNumber: this.clientProfil.boiteNumber,
      email: this.clientForm.get('email').value,
      idClientType: this.clientForm.get('type').value,
      clientType: '',
      enabled: true,
      idBoite: this.clientProfil.idBoite,
      bg: 'background:green',
      status: 'A jour',
      idStatus: '5f211bafc9518f4404e03c2c'
    };
    const ct = await this.clientTypes.filter((c) => c._id === this.clientProfil.idClientType);
    this.clientProfil.clientType = ct[0].name;
    await this.step2();

  }
  async onSubmit2(): Promise<any> {
    this.loading = true;
    this.clientS.postClient(this.clientProfil).subscribe((data: any) => {
      this.historiqueForfait = {
        idClient: data._id,
        forfaits: this.choosenForfait,
        idBoite: data.idBoite,
        idStaff: localStorage.getItem('id'),
        enabled: true
      };
      this.idNewClient = data._id;
    });
    this.step3();

  }
  async createTotal() {
    const boite = await this.boites.filter((b) => b._id === this.clientProfil.idBoite);
    // tslint:disable-next-line: radix

    this.boitePrice = boite[0].price;
    this.choosenForfait.forEach(element => {
      // tslint:disable-next-line:radix
      this.total += element.price;
    });
    this.total = this.total + this.boitePrice;
  }
  async confirm() {
    this.loading = true;
    this.historicPayment = {
      boiteNumber: this.clientProfil.boiteNumber,
      forfaits: this.choosenForfait,
      idBoite: this.clientProfil.idBoite,
      idClient: this.historiqueForfait.idClient,
      priceBoite: this.boitePrice,
      staffs: [{ idStaff: localStorage.getItem('id') }],
      enabled: true,
      date: new Date().getFullYear(),
      total: this.total
    };

    await this.payS.postHistoricForfait(this.historiqueForfait).subscribe(async () => {
      await this.payS.postPayment(this.historicPayment).subscribe(async (_data: any) => {
        await this.boiteS.attributeBoite(this.clientProfil.idBoite).subscribe(async () => {
          if (_data) {
            await this.router.navigate(['/client/', _data.idClient]);
          }
        });
      });

    });
  }
  attribuer() { // attribuer une boite aléatoirement
    this.clientProfil.boiteNumber = this.boites[0].number;
    this.clientProfil.idBoite = this.boites[0]._id;
  }
  async getForfaits() {
    const ct = this.clientTypes.filter((c) => c._id === this.clientProfil.idClientType);
    await ct[0].forfaits.forEach(forfait => {
      this.forfaits.forEach(async element => {
        if (forfait.idForfait === element._id) {
          await this.forfaitClient.push(element);
        }
      });
    });
  }
  newForfait(event) {
    if (event.target.checked) {
      this.forfaits.forEach(async element => {
        if (event.target.value === element._id) {
          await this.choosenForfait.push({ idForfait: event.target.value, name: element.name, price: element.price });
        }
      });
    } else {
      this.choosenForfait = this.choosenForfait.filter((element) => element.idForfait !== event.target.value)
    }
  }
  step1() {
    this.E1 = true;
    this.E2 = false;
    this.E3 = false;
  }
  step2() {
    this.loading = false;
    this.getForfaits().then(() => {
      this.E1 = false;
      this.E2 = true;
      this.E3 = false;
    });

  }
  step3() {
    this.loading = false;
    this.createTotal().then(() => {
      this.E1 = false;
      this.E2 = false;
      this.E3 = true;
    });

  }
}
