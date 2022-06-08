import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommitActivity } from 'src/app/shared/models/commits.model';

@Component({
  selector: 'app-commit-stats',
  templateUrl: './commit-stats.component.html',
  styleUrls: ['./commit-stats.component.scss'],
})
export class CommitStatsComponent implements OnChanges {
  @Input() commitActivities!: CommitActivity[];
  barChartValues: { name: string; value: number }[] = [];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Commit count';
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  view: [number, number] = [700, 400];
  labelsY = ['0', '50'];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['commitActivities']) {
      this.getBarChartData();
    }
  }

  getBarChartData() {
    let barValues: number[] = Array(12).fill(0);
    this.commitActivities?.forEach((commit: any) => {
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
