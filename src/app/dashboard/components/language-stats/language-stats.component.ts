import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import { sum } from '@taiga-ui/cdk';

@Component({
  selector: 'app-language-stats',
  templateUrl: './language-stats.component.html',
  styleUrls: ['./language-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageStatsComponent {
  @Input() set repoLanguages(repoLanguages: any | null) {
    this.getDataForPieChart(repoLanguages);
  }

  pieChartValues: number[] = [];
  pieChartLabels: string[] = [];
  activeItemIndex = NaN;
  value: number[] = [];
  labels: string[] = [];
  sum!: number;

  isItemActive(index: number): boolean {
    return this.activeItemIndex === index;
  }

  onHover(index: number, hovered: boolean): void {
    this.activeItemIndex = hovered ? index : 0;
  }

  getColor(index: number): string {
    return `var(--tui-chart-${index})`;
  }

  getDataForPieChart(repoLanguages: any | null) {
    this.value = [];
    this.labels = [];
    this.sum = 0;
    this.pieChartLabels = [];
    this.pieChartValues = [];
    for (let property in repoLanguages) {
      if (!repoLanguages.hasOwnProperty(property)) {
        continue;
      }
      this.pieChartLabels.push(property);
      this.pieChartValues.push(repoLanguages[property]);
    }
    this.drawPieChart();
  }

  drawPieChart() {
    this.sum = sum(...this.pieChartValues);
    this.value = [...this.pieChartValues];
    this.labels = [...this.pieChartLabels];
  }
}
