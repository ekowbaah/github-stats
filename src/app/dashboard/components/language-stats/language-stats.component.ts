import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { sum } from '@taiga-ui/cdk';

@Component({
  selector: 'app-language-stats',
  templateUrl: './language-stats.component.html',
  styleUrls: ['./language-stats.component.scss'],
})
export class LanguageStatsComponent implements OnChanges {
  @Input() repoLanguages?: any;
  pieChartValues: number[] = [];
  pieChartLabels: string[] = [];
  activeItemIndex = NaN;
  value: number[] = [];
  labels: string[] = [];
  sum!: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repoLanguages']) {
      console.log(changes['repoLanguages'].currentValue);
      this.getDataForPieChart();
      this.drawPieChart();
    }
  }
  isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : 0;
  }

  getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }
  getDataForPieChart() {
    this.pieChartLabels = [];
    this.pieChartValues = [];
    for (let property in this.repoLanguages) {
      if (!this.repoLanguages.hasOwnProperty(property)) {
        continue;
      }
      this.pieChartLabels.push(property);
      this.pieChartValues.push(this.repoLanguages[property]);
    }
  }

  drawPieChart() {
    this.sum = sum(...this.pieChartValues);
    this.value = [...this.pieChartValues];
    this.labels = [...this.pieChartLabels];
  }
}
