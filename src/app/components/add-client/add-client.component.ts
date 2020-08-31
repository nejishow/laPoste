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
  clientForm2: FormGroup;
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
  availableboites = []; // les numero de boites libres
  availableBoitetypes = []; // les type de boites pour le type de client choisit
  boiteTypes = []; // toute les types de boite
  idNewClient;
  historicPayment = {
    boiteNumber: '',
    forfaits: [],
    idBoite: '',
    idClient: '',
    priceBoite: 0,
    idStaff: '',
    enabled: true,
    date: 0,
    total: 0,
    clientName: '',
    boiteType: ''
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
    idClientType: '',
    enabled: true,

  };
  clientBoite = {
    boiteNumber: '',
    idBoite: '',
    boiteType: '',
    idBoiteType: '',
    idClient: '',
    clientName: '',
    startDate: new Date().getFullYear(),
    clientType: '',
    idClientType: '',
    enabled: true,
    bg: '',
    idStatus: '',
    status: '',
    NA: true
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
    this.boiteS.getAvailableBoite().subscribe((data: any) => {
      this.availableboites = data;

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
    this.clientForm2 = this.formBuilder.group({
      available: ['', Validators.required],
      boiteType: ['', Validators.required],
    });
  }
  // les types de boite a afficher pour le type de client
  async setBoiteType() {
    await this.clientTypes.forEach(ct => {
      if (ct._id === this.clientForm.get('type').value) {
        this.availableBoitetypes = ct.idBoitetypes;
      }

    });

  }
  async onSubmit(): Promise<any> {
    this.loading = true;
    this.clientProfil = {
      name: this.clientForm.get('name').value,
      number: this.clientForm.get('number').value,
      address: this.clientForm.get('address').value,
      email: this.clientForm.get('email').value,
      idClientType: this.clientForm.get('type').value,
      enabled: true,
    };
    await this.setBoiteType();
    await this.step2();

  }
  async setBoiteNumber() {
    await this.availableboites.forEach(bt => {
      if (bt._id === this.clientForm2.get('available').value) {
        this.clientBoite.boiteNumber = bt.number;
      }
    });
    await this.availableBoitetypes.forEach(bt => {
      if (bt._id === this.clientForm2.get('boiteType').value) {
        this.clientBoite.idBoiteType = bt._id;
        this.clientBoite.boiteType = bt.name;
        this.historicPayment.boiteType = bt.name;
      }

    });
  }
  async onSubmit2(): Promise<any> {
    await this.setBoiteNumber();
    this.loading = true;
    this.clientBoite = {
      idBoite: this.clientForm2.get('available').value,
      idBoiteType: this.clientForm2.get('boiteType').value,
      idClientType: this.clientForm.get('type').value,
      clientType: '',
      boiteType: this.clientBoite.boiteType,
      idClient: '',
      clientName: this.clientForm.get('name').value,
      startDate: this.clientBoite.startDate,
      enabled: true,
      boiteNumber: this.clientBoite.boiteNumber,
      bg: 'background:green',
      status: 'A jour',
      idStatus: '5f211bafc9518f4404e03c2c',
      NA: true
    };
    const ct = await this.clientTypes.filter((c) => c._id === this.clientBoite.idClientType);
    this.clientBoite.clientType = ct[0].name;
    const ab = await this.availableboites.filter((c) => c._id === this.clientBoite.idBoite);
    this.clientBoite.clientType = ct[0].name;

    this.step3();

  }
  async createTotal() {
    const boite = await this.availableBoitetypes.filter((b) => b._id === this.clientBoite.idBoiteType);
    // prend le type de boite choisis , prend le prix et ajoute aux prix des forfaits choisis
    this.boitePrice = boite[0].price;
    this.choosenForfait.forEach(element => {
      // tslint:disable-next-line:radix
      this.total += element.price;
    });
    this.total = this.total + this.boitePrice;
  }
  async confirm() {
    this.loading = true;
    await this.clientS.postClient(this.clientProfil).subscribe(async (data: any) => {
      this.historiqueForfait = {
        idClient: data._id,
        forfaits: this.choosenForfait,
        idBoite: this.clientBoite.idBoite,
        idStaff: localStorage.getItem('id'),
        enabled: true
      };
      this.historicPayment = {
        boiteNumber: this.clientBoite.boiteNumber,
        forfaits: this.choosenForfait,
        idBoite: this.clientBoite.idBoite,
        idClient: data._id,
        clientName: this.clientForm.get('name').value,
        priceBoite: this.boitePrice,
        idStaff: localStorage.getItem('id'),
        enabled: true,
        date: new Date().getFullYear(),
        total: this.total,
        boiteType: this.historicPayment.boiteType
      };
      this.clientBoite.idClient = data._id;
      await this.clientS.postClientBoite(this.clientBoite).subscribe(async result => {
        await this.payS.postHistoricForfait(this.historiqueForfait).subscribe(async () => {
          await this.payS.postPayment(this.historicPayment).subscribe(async (_data: any) => {
            if (_data) {
              await this.router.navigate(['/receipt/', _data._id]);
            }
          });

        });
      });
    });
  }
  async getForfaits() {
    const ct = this.clientTypes.filter((c) => c._id === this.clientProfil.idClientType);
    this.forfaitClient = ct[0].forfaits;
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
