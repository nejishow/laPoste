import { PaymentsService } from './../../services/payments.service';
import { BoitesService } from './../../services/boites.service';
import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
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
  public pieChartLabels: Label[] = ['Grand', 'Moyen', 'Petit', 'Special'];
  public pieChartData: SingleDataSet = [300, 500, 100, 21];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  activeClients = [];
  activeboites = [];
  inactiveboites = [];
  constructor(
    private clientS: ClientsService,
    private boiteS: BoitesService, private payS: PaymentsService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.clientS.getClients().subscribe((data: any) => {
      data.forEach(async client => {
        if (client.enabled === true) {
          await this.activeClients.push(client);
        }
        if (client.status !== 'A jour' && client.status !== 'En retard') {
          console.log(client);

        }
      });
    });
    this.boiteS.getBoites().subscribe((data: any) => {
      data.forEach(async boite => {
        if (boite.enabled === true) {
          await this.inactiveboites.push(boite);
        } else {
          await this.activeboites.push(boite);

        }
      });
    });
  }

  ngOnInit(): void {
  }

}
