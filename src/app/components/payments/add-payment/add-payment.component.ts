import { AuthService } from './../../../services/auth.service';
import { BoitesService } from './../../../services/boites.service';
import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';
import { StaffsService } from 'src/app/services/staffs.service';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
  idClient;
  client;
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
      this.forfaits = data;
    });
    this.authS.getStaff().subscribe((data) => {
      this.staff = data;
    });
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.forfaits.length; index++) {
      if (this.forfaits[index]) {
        this.total += this.forfaits[index].price;
      }

    }
    if (this.tax) {
      this.total += 3000;
    }

  }

  payment() {
    this.encaisser = true;
    const newPayment = {
      boiteNumber: this.client.boiteNumber,
      idBoite: this.boite._id,
      priceBoite: this.boite.price,
      idClient: this.client._id,
      tax: this.tax,
      idStaff: this.staff.id,
      date: this.date,
      total: this.total,
    };
    console.log(newPayment);
    
    this.payS.postPayment(newPayment).subscribe(() => {
      this.clientS.updateClient(this.client._id).subscribe(async (data) => {
        await this.router.navigate(['/client/' + this.client._id]);
      });
    }, (error) => {
      console.log(error.error);

    });
  }
  ngOnInit(): void {
  }

}
