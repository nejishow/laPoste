import { BoitesService } from './../../services/boites.service';
import { ClientsService } from 'src/app/services/clients.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  errorMessage;
  clientForm: FormGroup;
  forfaits; // tous les forfaits
  forfaitClient = []; // les forfaits approprié ce type de client
  clientTypes;
  boites; // toutes les boites "disponibles"
  clientProfil = {
    name: '',
    number: '',
    email: '',
    address: '',
    cin: '',
    boiteNumber: '',
    idBoite: '',
    clientType: '',
    idClientType: '',
    enabled: false,
  };
  E1 = true;
  E2 = false;
  E3 = false;
  constructor(
    private formBuilder: FormBuilder,
    private clientS: ClientsService,
    private boiteS: BoitesService,

  ) {
    this.clientS.getForfaits().subscribe(data => {
      this.forfaits = data;
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
      cin: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  async onSubmit(): Promise<any> {
    //
    this.clientProfil = {
      name: '',
      number: this.clientForm.get('number').value,
      address: this.clientForm.get('address').value,
      boiteNumber: this.clientProfil.boiteNumber,
      email: this.clientForm.get('email').value,
      cin: this.clientForm.get('cin').value,
      idClientType: this.clientForm.get('type').value,
      clientType: '',
      enabled: true,
      idBoite: this.clientProfil.idBoite,
    };
    await this.clientS.getOneClientType(this.clientForm.get('type').value).subscribe((data: any) => {
      this.clientProfil.clientType = data.name;
      this.step2();

    });

  }
  async onSubmit2(): Promise<any> {
    //
    this.clientProfil = {
      name: '',
      number: this.clientForm.get('number').value,
      address: this.clientForm.get('address').value,
      boiteNumber: this.clientProfil.boiteNumber,
      email: this.clientForm.get('email').value,
      cin: this.clientForm.get('cin').value,
      clientType: '',
      idClientType: this.clientForm.get('type').value,
      enabled: true,
      idBoite: this.clientProfil.idBoite,
    };
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

  step1() {
    this.E1 = true;
    this.E2 = false;
    this.E3 = false;
  }
  step2() {
    this.getForfaits();
    this.E1 = false;
    this.E2 = true;
    this.E3 = false;
  } step3() {
    this.E1 = false;
    this.E2 = false;
    this.E3 = true;
  }
}
