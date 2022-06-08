import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiModeModule,
  TuiRootModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import {
  TuiAxesModule,
  TuiBarChartModule,
  TuiLegendItemModule,
  TuiPieChartModule,
} from '@taiga-ui/addon-charts';
import {
  TuiDataListWrapperModule,
  TuiInputModule,
  TuiSelectModule,
} from '@taiga-ui/kit';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiHoveredModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiInputModule,
    TuiAlertModule,
    TuiPieChartModule,
    TuiButtonModule,
    TuiLegendItemModule,
    TuiHoveredModule,
    FormsModule,
    ReactiveFormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiBarChartModule,
    TuiAxesModule,
  ],
})
export class TaigaModule {}
