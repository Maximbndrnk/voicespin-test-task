import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {GridsterModule} from 'angular-gridster2';
import {TimePastPipe} from '../core/pipes/timePastPipe';



@NgModule({
  declarations: [
    DashboardComponent,
    TimePastPipe
  ],
  imports: [
    CommonModule,
    GridsterModule,
  ],
  exports: [
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
