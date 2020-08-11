import { PaymentsService } from './../../services/payments.service';
import { BoitesService } from './../../services/boites.service';
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Grande', 'Moyenne', 'Petite', 'BL'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  activeClients = [];
  activeboites = [];
  inactiveboites = [];
  constructor(
    private clientS: ClientsService,
    private boiteS: BoitesService, private authS: AuthService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.clientS.getClients().subscribe((data: any) => {      
      data.forEach(async client => {
        if (client.enabled === true) {
          await this.activeClients.push(client);
        }
        if (client.status !== 'A jour' && client.status !== 'En retard') {
        }
      });
    },
    (error) => {
      if (error.status === 401) {
        this.authS.logout();
      }

    });

    this.boiteS.getBoites().subscribe(async (data: any) => {
      await data.forEach(async boite => {
        if (boite.enabled === true) {
          await this.inactiveboites.push(boite);
        } else {
          await this.activeboites.push(boite);
        }
      });
      // this.activeboites.forEach(async boite => {
      //     let G= 0;
      //     let M= 0;
      //     let P= 0;
      //     let BL= 0;
      //     this.activeboites.forEach(async boite => {
      //       switch (boite.boiteType) {
      //         case 'Grande':
      //           G++
      //           break;
      //           case 'Moyenne':
      //           M++
      //           break;
      //           case 'Petite':
      //           P++
      //           break;
      //           case 'BL':
      //           BL++
      //           break;
      //       }
      //     });        
      //     this.pieChartData=[G,M,P,BL];
      // });
    },
    (error) => {
      if (error.status === 401) {
        this.authS.logout();
      }

    });

  }

  ngOnInit(): void {
  }

}
