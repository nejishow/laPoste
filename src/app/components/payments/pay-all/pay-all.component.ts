import { AuthService } from "./../../../services/auth.service";
import { BoitesService } from "./../../../services/boites.service";
import { Component, OnInit } from "@angular/core";
import { PaymentsService } from "src/app/services/payments.service";
import { ClientsService } from "src/app/services/clients.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ThemeService } from "ng2-charts";
@Component({
  selector: "app-pay-all",
  templateUrl: "./pay-all.component.html",
  styleUrls: ["./pay-all.component.css"],
})
export class PayAllComponent implements OnInit {
  idClient;
  client;
  loading = false;
  newPayment;
  idPayments = [];
  date;
  boite;
  tax = true;
  error = false;
  staff;
  total = 0;
  forfaits = [];
  encaisser = false;
  lastPayment = "";
  currentYear = "";
  allyear = [];
  numberofYear = 0;
  allTotal = 0;
  constructor(
    private payS: PaymentsService,
    private authS: AuthService,
    private boiteS: BoitesService,
    private clientS: ClientsService,
    private aR: ActivatedRoute
  ) {
    this.aR.params.subscribe(async (params) => {
      this.idClient = params.id;
      this.date = params.queryParams;
      const today = new Date().getFullYear();
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
        this.lastPayment = allh[0].date;
        var index = 1;
        do {
          this.allyear.push(parseInt(this.lastPayment) + index);
          index++;
          var year = parseInt(this.lastPayment) + index;
        } while (year <= today);
      });
    });
  }
  inputValue(){
    console.log(this.boite.price);
    
    if (this.boite.price === undefined || this.boite.price === null) {
      this.boite.price = 0
    }
  }
  changeBoitePrice() {
    if (this.boite.price === undefined || this.boite.price === null) {
      this.boite.price = 0
    }
    this.total = 0;
    this.allTotal = 0;
    if (parseInt(this.currentYear) > 2014) {
      this.total = this.total + 3000;
    } else {
      this.total = this.total + 6000;
    }
    this.total += parseInt(this.boite.price);
    this.allTotal = this.total * this.numberofYear;
  }
  getData(event) {
    this.total = 0;
    this.allTotal = 0;
    this.currentYear = event;
    this.numberofYear = parseInt(event) - parseInt(this.lastPayment);

    if (parseInt(event) > 2014) {
      this.total = this.total + 3000;
    } else {
      this.total = this.total + 6000;
    }
    this.clientS.getClientBoite(this.idClient).subscribe((data: any) => {
      this.client = data;
      this.boiteS
        .getBoiteType(this.client.idBoiteType)
        .subscribe((data1: any) => {
          this.boite = data1;
          this.total += this.boite.price;
          this.allTotal = this.total * this.numberofYear;
        });
    });
    this.payS.getClientForfait(this.idClient).subscribe((data: any) => {
      if (
        data.forfaits !== undefined &&
        data.forfaits !== null &&
        data.forfaits.length > 0
      ) {
        this.payS.getForfaits().subscribe(async (forfaits: any) => {
          await data.forfaits.forEach(async (forfait) => {
            await forfaits.forEach(async (element) => {
              if (forfait.idForfait === element._id) {
                await this.forfaits.push({
                  idForfait: element._id,
                  name: element.name,
                  price: element.price,
                });
              }
            });
            this.forfaits.forEach((element) => {
              this.total = this.total + parseInt(element.price);
              this.allTotal = this.total * this.numberofYear;
            });
          });
        });
      }
    });
    this.authS.getStaff().subscribe((data) => {
      this.staff = data;
    });
  }

  async payment() {
    this.loading = true;
    for (let index = 1; index <= this.numberofYear; index++) {
      this.newPayment = {
        boiteNumber: this.client.boiteNumber,
        idBoite: this.boite._id,
        priceBoite: this.boite.price,
        idClient: this.idClient,
        tax: this.tax,
        forfaits: this.forfaits,
        idStaff: this.staff.id,
        date: parseInt(this.lastPayment) + index,
        total: this.total,
      };
      await this.payS.postPayment(this.newPayment).subscribe(
        async (result: any) => {
          await this.clientS.updateClient(this.idClient).subscribe(async () => {
            await this.idPayments.push(result._id);
            this.updateFinish(index);
          });
        },
        () => {}
      );
    }
  }

  updateFinish(index) {
    if (index === this.numberofYear) {
      this.loading = false;
      this.encaisser = true;
    }
  }
  ngOnInit(): void {}
  removeTax() {
    this.tax = false;
    if (parseInt(this.currentYear) > 2014) {
      this.total = this.total - 3000;
      this.allTotal = this.total * this.numberofYear;
    } else {
      this.total = this.total - 6000;
      this.allTotal = this.total * this.numberofYear;
    }
  }
}
