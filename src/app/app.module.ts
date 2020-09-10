import { ExcelService } from './services/excel.service';
import { OperationService } from './services/operation.service';
import { PaymentsService } from './services/payments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyProfilComponent } from './components/my-profil/my-profil.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { BpComponent } from './components/bp/bp.component';
import { AllBpComponent } from './components/all-bp/all-bp.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ComptabiliteComponent } from './components/statistiques/comptabilite/comptabilite.component';
import { AddBPComponent } from './components/add-bp/add-bp.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { ClientsService } from './services/clients.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared/shared.service';
import { StoreModule } from '@ngrx/store';
import { clientReducers } from './store/index';
import { EffectsModule } from '@ngrx/effects';
import { ClientEffect } from './store/effects/clients.effect';
import { CheckPaymentComponent } from './components/payments/check-payment/check-payment.component';
import { AddPaymentComponent } from './components/payments/add-payment/add-payment.component';
import { ActivityComponent } from './components/activity/activity.component';
import { RedClientsComponent } from './components/client folder/red-clients/red-clients.component';
import { ClientComponent } from './components/client folder/client/client.component';
import { ClientsComponent } from './components/client folder/clients/clients.component';
import { BoitesService } from './services/boites.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OpeationsComponent } from './components/opeations/opeations.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ForfaitsComponent } from './components/forfaits/forfaits.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
    ClientComponent,
    MyProfilComponent,
    NotificationsComponent,
    BpComponent,
    AllBpComponent,
    ClientsComponent,
    DashboardComponent,
    LoginComponent,
    AddClientComponent,
    ComptabiliteComponent,
    AddBPComponent,
    StatistiquesComponent,
    CheckPaymentComponent,
    AddPaymentComponent,
    ActivityComponent,
    RedClientsComponent,
    OpeationsComponent,
    ReceiptComponent,
    ForfaitsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
    StoreModule.forRoot(clientReducers),
    EffectsModule.forRoot([ClientEffect]),
    NgbModule
  ],
  providers: [ClientsService, SharedService, PaymentsService, BoitesService, OperationService, ExcelService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
