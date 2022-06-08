import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TaigaModule } from './modules/taiga.module';

@NgModule({
  declarations: [],
  imports: [CommonModule,],
  exports: [TaigaModule,NgxChartsModule,NgxSkeletonLoaderModule],
})
export class SharedModule {}
