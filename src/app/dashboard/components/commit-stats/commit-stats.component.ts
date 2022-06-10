import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommitActivity } from '@shared/models/commits.model';
import { Months } from '@core/utils/constants';

@Component({
  selector: 'app-commit-stats',
  templateUrl: './commit-stats.component.html',
  styleUrls: ['./commit-stats.component.scss'],
})
export class CommitStatsComponent {
  barChartValues: { name: string; value: number }[] = [];

  @Input() set commitActivities(commitActivities: CommitActivity[] | null) {
    if (commitActivities) this.getBarChartData(commitActivities);
  }
  
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Commit count';
  months = Months;
  view: [number, number] = [700, 400];
  labelsY = ['0', '50'];

  getBarChartData(commitActivities: CommitActivity[]) {
    let barValues: number[] = Array(12).fill(0);
    commitActivities?.forEach((commit: CommitActivity) => {
      const month = this.getMonthFromUnixTimestamp(commit.week);
      barValues[month] += commit.total;
    });
    this.drawBarChart(barValues);
  }

  getMonthFromUnixTimestamp(unixTimestamp: number) {
    const dateObject = new Date(unixTimestamp * 1000);
    return dateObject.getMonth();
  }

  drawBarChart(values: number[]) {
    this.barChartValues = [];
    values.forEach((val, index) => {
      this.barChartValues.push({ name: this.months[index], value: val });
    });
  }
}
