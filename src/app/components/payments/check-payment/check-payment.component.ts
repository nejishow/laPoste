import { ClientsService } from './../../../services/clients.service';
import { StaffsService } from './../../../services/staffs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from './../../../services/payments.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.css']
})
export class CheckPaymentComponent implements OnInit {
  id;
  payment;
  staff;
  forfaits = [];
  isSuperviseur;
  hasPower;
  isAgent = false;
  isVisiteur = false;
  constructor(
    private payS: PaymentsService,
    private staffS: StaffsService,
    private clientS: ClientsService,
    private aR: ActivatedRoute,
    private authS: AuthService, private router: Router
  ) {
    this.isSuperviseur = this.authS.isSuperviseur;
    this.hasPower = this.authS.hasPower;
    this.isVisiteur = this.authS.isVisiteur;
    this.isAgent = this.authS.isAgent;
    this.aR.params.subscribe(async params => {
      this.id = params.id;
      await this.payS.getPayment(this.id).subscribe((_data: any) => {
        this.payment = _data;
       
        this.staffS.getStaff(_data.idStaff).subscribe((data) => {
          this.staff = data;
        },
          (error) => {
            if (error.status === 401) {
              this.authS.logout();
            }

          });

        this.clientS.getForfaits().subscribe((data: any) => {
          this.payment.forfaits.forEach(forfait => {
            data.forEach(element => {
              if (forfait.idForfait === element._id) {
                this.forfaits.push(element);
              }
            });
          });
        })
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

  cancelPayment() {
    this.payS.removePayment(this.payment._id).subscribe(() => {
      this.clientS.checkClientBoite(this.payment.idClient).subscribe((data)=>{
        this.router.navigate(['/client/', this.payment.idClient]);
      })
    });
  }
}
