import { element } from 'protractor';
import { ExcelService } from './../../services/excel.service';
import { OperationService } from 'src/app/services/operation.service';
import { StaffsService } from './../../services/staffs.service';
import { BoitesService } from './../../services/boites.service';
import { PaymentsService } from './../../services/payments.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['na', 'client', 'boiteNumber', 'boiteType', 'total', 'staff'];
  errorMessage = false;
  datasource;
  date; // date filtré
  maxDate;
  allPayments: Array<{
    clientName: string, boiteNumber: number, boiteType: string,
    total: number, staffName: string, createdAt: Date, time: string,
    idStaff: string, idClient: string, NA: boolean
  }> = []; // tous les clients
  filteredPayments: Array<{
    clientName: string, boiteNumber: number, boiteType: string,
    total: number, staffName: string, createdAt: Date, time: string,
    idStaff: string, idClient: string, NA: boolean
  }> = [];

  allOperations = []; // toutes les operations
  filteredOperations = [];
  operationTab;
  loading = true;
  length;
  length2;
  currentPage = 1; // pour le tableau des operations
  pageSize2 = 4; // pour le tableau des operations
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 25];

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Grande', 'Moyenne', 'Petite', 'BL'];
  public pieChartData: SingleDataSet = [];
  public pieChartData2: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(
    private route: Router,
    private ops: OperationService,
    private staffS: StaffsService,
    private clientS: ClientsService,
    private payS: PaymentsService,
    private authS: AuthService,
    private excelService: ExcelService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.maxDate = new Date();
  }
  async getData() {
    await this.payS.getAllPayment().subscribe(async (payments: any) => {
      this.allPayments = payments;
      await this.staffS.getAllStaff().subscribe(async (staffs: any) => {
        await this.allPayments.forEach(async pay => {
          await staffs.forEach(staff => {
            if (pay.idStaff === staff._id) {
              pay.staffName = staff.name;
            }
          });
        });
        await this.clientS.getAllClientBoite().subscribe(async (cbs: any) => {
          await this.allPayments.forEach(async pay => {
            await cbs.forEach(cb => {
              if (pay.idClient === cb.idClient) {
                pay.NA = cb.NA;
                pay.clientName = cb.clientName;
                pay.boiteType = cb.boiteType;
              }
            });
          });
        });
        await this.getTodayData();
      }, (error) => {
        if (error.status === 401) {
          this.authS.logout();
        }

      });


    },
      (error) => {
        if (error.status === 401) {
          this.authS.logout();
        }

      });

  }
  async getOperations() {
    await this.ops.getAllOperations().subscribe(async (operations: any) => {
      this.allOperations = operations;

      await this.getTodayData();


    },
      (error) => {
        if (error.status === 401) {
          this.authS.logout();
        }

      });

  }

  refreshOperations() {
    this.operationTab = this.filteredOperations
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize);
  }
  async getTodayData() {
    this.filteredPayments = await this.allPayments.filter((pay) => this.today(pay.createdAt));
    this.datasource = await new MatTableDataSource(this.filteredPayments);
    this.length = this.datasource.length;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;

    this.filteredOperations = await this.allOperations.filter((ops) => this.today(ops.createdAt));
    this.operationTab = this.filteredOperations;

    this.boiteStats();
    this.newBoiteStats();

  }
  async checkDate() {
    this.filteredPayments = await this.allPayments.filter((pay) => this.filterDate(pay.createdAt, this.date));
    this.datasource = await new MatTableDataSource(this.filteredPayments);
    this.length = this.datasource.length;
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;

    this.filteredOperations = await this.allOperations.filter((ops) => this.filterDate(ops.createdAt, this.date));
    this.operationTab = this.filteredOperations;
    await this.boiteStats();
    await this.newBoiteStats();

  }
  today(d1) {
    const today = new Date();
    const date1 = new Date(d1);
    if (today.getFullYear() === date1.getFullYear() && today.getMonth === date1.getMonth && today.getDate() === date1.getDate()) {
      return true;
    }
    return false;
  }
  filterDate(d1, d2) {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    if (date2.getFullYear() === date1.getFullYear() && date2.getMonth === date1.getMonth && date2.getDate() === date1.getDate()) {
      return true;
    }
    return false;
  }

  async boiteStats() {
    let countG = 0;
    let countM = 0;
    let countP = 0;
    let countB = 0;
    await this.filteredPayments.forEach(async pay => {
      switch (pay.boiteType) {
        case 'Grande':
          countG++;
          break;
        case 'Moyenne':
          countM++;
          break;
        case 'Petite':
          countP++;
          break;
        case 'BL':
          countB++;
          break;

        default:
          break;
      }
    });
    this.pieChartData = [countG, countM, countP, countB];
    const percentageG = await ((countG * 100) / this.filteredPayments.length);
    const percentageM = await ((countM * 100) / this.filteredPayments.length);
    const percentageP = await ((countP * 100) / this.filteredPayments.length);
    const percentageB = await ((countB * 100) / this.filteredPayments.length);
    this.pieChartData2 = [Math.round(percentageG), Math.round(percentageM), Math.round(percentageP), Math.round(percentageB)];
  }
  async newBoiteStats() {
    let countG = 0;
    let countM = 0;
    let countP = 0;
    let countB = 0;
    const newBoites = await this.filteredPayments.filter((pay) => pay.NA);
    await newBoites.forEach(async pay => {
      switch (pay.boiteType) {
        case 'Grande':
          countG++;
          break;
        case 'Moyenne':
          countM++;
          break;
        case 'Petite':
          countP++;
          break;
        case 'BL':
          countB++;
          break;

        default:
          break;
      }
    });
    this.pieChartData2 = [countG, countM, countP, countB];
  }
  details(idUser) {
    this.route.navigate(['/client/', idUser]);
  }

  async ngOnInit() {
    await this.getData();
    await this.getOperations();
    //
  }

  async exportAsXLSX() {
    const rapport = [];
    await this.filteredPayments.forEach(async element => {
      if (element.NA) {
        await rapport.push({
          NA: 'Oui',
          Client: element.clientName,
          'Numero boite': element.boiteNumber,
          'Type de boite': element.boiteType,
          Montant: element.total,
          Agent: element.staffName,
          Date: new Date(element.createdAt).getDate() + '/' + (new Date(element.createdAt).getMonth() + 1) + '/' + new Date(element.createdAt).getFullYear()
        });
      } else {
        await rapport.push({
          NA: '',
          Client: element.clientName,
          'Numero boite': element.boiteNumber,
          'Type de boite': element.boiteType,
          Montant: element.total,
          Agent: element.staffName,
          Date: new Date(element.createdAt).getDate() + '/' + (new Date(element.createdAt).getMonth() + 1) + '/' + new Date(element.createdAt).getFullYear()
        });
      }

    });
    if (this.date === undefined) {
      const date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
      this.excelService.exportAsExcelFile(rapport, "Redevance payé le " + date);
    } else {
      const date = new Date(this.date).getDate() + '/' + (new Date(this.date).getMonth() + 1) + '/' + new Date(this.date).getFullYear();
      this.excelService.exportAsExcelFile(rapport, "Redevance payé le " + date);

    }


  }
  async exportAsXLSX_OP() {
    const rapport = [];
    await this.filteredOperations.forEach(async element => {
      await element.operations.forEach(async op => {
        await rapport.push({
          Libellé: op.name,
          'Client': element.clientName,
          'Boite': element.boiteNumber,
          'Prix': op.price,
          'Agent': element.staffName,
          Date: new Date(element.createdAt).getDate() + '/' + (new Date(element.createdAt).getMonth() + 1) + '/' + new Date(element.createdAt).getFullYear()
        });
      });

    });
    if (this.date === undefined) {
      const date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
      this.excelService.exportAsExcelFile(rapport, 'Autre paiements du ' + date); // le json et le titre du fichier
    } else {
      const date = new Date(this.date).getDate() + '/' + (new Date(this.date).getMonth() + 1) + '/' + new Date(this.date).getFullYear();
      this.excelService.exportAsExcelFile(rapport, 'Autre paiements du ' + date);

    }


  }
}
