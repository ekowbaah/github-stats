import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TaigaModule } from './modules/taiga.module';

@NgModule({
  declarations: [],
  imports: [CommonModule,],
  exports: [TaigaModule,NgxChartsModule],
})
export class SharedModule {}
