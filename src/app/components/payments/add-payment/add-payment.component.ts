import { AuthService } from './../../../services/auth.service';
import { BoitesService } from './../../../services/boites.service';
import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  idClient;
  client;
  newPayment;
  idPayment;
  date;
  boite;
  tax = false;
  error = false;
  staff;
  total = 0;
  forfaits = [];
  encaisser = false;
  constructor(
    private payS: PaymentsService,
    private authS: AuthService,
    private boiteS: BoitesService,
    private clientS: ClientsService,
    private router: Router,
    private aR: ActivatedRoute) {
    this.aR.params.subscribe(async params => {
      this.idClient = params.id;
      this.date = params.queryParams;
      this.clientS.getHistoric(this.idClient).subscribe(async (data: any) => {
        const allh = data;
        await allh.sort((a, b) => {
          if (a.date < b.date) {
            return 1;
          }
          if (b.date < a.date) {
            return -1;
          }
          return 0;
        });
        const lastPayment = allh[0].date;
        if (this.date.match("[a-zA-Z]+")) {
          this.error = true;
        }

        if (lastPayment.toString() === params.queryParams.toString()) {
          this.encaisser = true;
        }

        if ((parseInt(this.date) - lastPayment) > 1) { // verifie si il a depassé 3ans
          this.error = true;
        }
      });
      if (new Date().getFullYear() < this.date) {
        this.error = true;
        // tslint:disable-next-line:radix
      } else if ((new Date().getFullYear()) === parseInt(this.date) && (new Date().getMonth() + 1) > 3) { // verifie si il a depassé mars
        this.tax = true;
      } else if ((new Date().getFullYear() - this.date) > 0) {
        this.tax = true;
      }
    });
    this.clientS.getClientBoite(this.idClient).subscribe((data: any) => {
      this.client = data;
      this.boiteS.getBoiteType(this.client.idBoiteType).subscribe((data1: any) => {
        this.boite = data1;
        this.total += this.boite.price;

      });
    });
    this.payS.getClientForfait(this.idClient).subscribe((data: any) => {
      if (data.forfaits !== undefined && data.forfaits !== null && data.forfaits.length>0) {
        this.payS.getForfaits().subscribe(async (forfaits: any) => {
          await data.forfaits.forEach(async forfait => {
            await forfaits.forEach(async element => {
              if (forfait.idForfait === element._id) {
                await this.forfaits.push({ idForfait: element._id, name: element.name, price: element.price });
              }
            });
            this.forfaits.forEach(element => {
              this.total = this.total + parseInt(element.price);
            });
  
          });
        });
      }

    });
    this.authS.getStaff().subscribe((data) => {
      this.staff = data;
    });
    if (this.tax) {
      if (parseInt(this.date) > 2015) {
        this.total = this.total + 3000;
      } else {
        this.total = this.total + 6000;
      }
    }

  }

  async payment() {
    this.encaisser = true;
    this.newPayment = {
      boiteNumber: this.client.boiteNumber,
      idBoite: this.boite._id,
      priceBoite: this.boite.price,
      idClient: this.idClient,
      tax: this.tax,
      forfaits: this.forfaits,
      idStaff: this.staff.id,
      date: this.date,
      total: this.total,
    };
    await this.payS.postPayment(this.newPayment).subscribe(async (result: any) => {
      this.clientS.updateClient(this.idClient).subscribe(async (data: any) => {
        this.idPayment = result._id;
      });
    }, () => {
    });
  }
  ngOnInit(): void {
  }

  removeTax(){
    this.tax = false;
    if (parseInt(this.date) > 2015) {
      this.total = this.total - 3000;
    } else {
      this.total = this.total - 6000;
    }
    
  }
}
