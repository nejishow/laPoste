import { StaffsService } from './services/staffs.service';
import { AuthGuardService as AuthGuard } from './services/guards/auth-guard.service';
import { AddPaymentComponent } from './components/payments/add-payment/add-payment.component';
import { CheckPaymentComponent } from './components/payments/check-payment/check-payment.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { AddBPComponent } from './components/add-bp/add-bp.component';
import { BpComponent } from './components/bp/bp.component';
import { AllBpComponent } from './components/all-bp/all-bp.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientComponent } from './components/client/client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClientsComponent } from './components/clients/clients.component';
import { MyProfilComponent } from './components/my-profil/my-profil.component';

export const AppRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent  },
  {
    path: 'clients', component: ClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addClient', component: AddClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client/:id', component: ClientComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allBp', component: AllBpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addBP', component: AddBPComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bp/:id', component: BpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stats', component: StatistiquesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profil', component: MyProfilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkPayment/:id', component: CheckPaymentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addPayment/:id', component: AddPaymentComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
