import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatBadgeModule,
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSortModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatDividerModule,
    MatInputModule,
    MatStepperModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialModule { }
