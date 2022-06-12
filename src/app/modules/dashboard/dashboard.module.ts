import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HistoricMonthComponent } from 'src/app/components/historic-month/historic-month.component';
import { MonthNamePipe } from 'src/app/pipe/month-name.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PlatformModule } from '@angular/cdk/platform';

@NgModule({
  declarations: [
    DashboardComponent,
    HistoricMonthComponent,
    MonthNamePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    Ng2GoogleChartsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    NgxSkeletonLoaderModule.forRoot(),
    PlatformModule
  ]
})
export class DashboardModule { }
