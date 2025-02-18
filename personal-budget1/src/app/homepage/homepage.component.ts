// src\app\homepage\homepage.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import { ArticleComponent } from "../article/article.component";
import { BreadcrumbsComponent } from "../breadcrumbs/breadcrumbs.component";
import { D3ChartComponent } from "../d3-chart/d3-chart.component";
import { DataService } from '../data.service';



@Component({
  selector: 'pb-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [ArticleComponent, BreadcrumbsComponent, D3ChartComponent],

})
export class HomepageComponent implements OnInit {
  public dataSource = {
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [
          'rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)',
          'rgb(75, 192, 192)', 'rgb(153, 102, 255)', 'rgb(255, 159, 64)',
          'rgb(201, 203, 207)', 'rgb(140, 220, 80)', 'rgb(240, 128, 128)', 'rgb(123, 104, 238)'
        ]
      }
    ],
    labels: [] as string[]
  };

  constructor(private dataService: DataService) {}


  ngOnInit(): void {
    this.dataService.getBudget().subscribe({
      next: (res: any) => {
        console.log('Data fetched:', res);
        for (let i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
        }
        console.log('DataSource:', this.dataSource);
        this.createChart();
      },
      error: (err: any) => {
        console.error('Error fetching budget data:', err);
      }
    });
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (ctx) {
      var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: window.devicePixelRatio,
        }
      });
    } else {
      console.error('Canvas element not found');
    }
  }
}

