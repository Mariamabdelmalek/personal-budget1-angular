import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3-chart',
  standalone: true,
  templateUrl: './d3-chart.component.html',
  styleUrls: ['./d3-chart.component.scss'],
})
export class D3ChartComponent implements OnInit {
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

  private data: any[] = [];
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getBudget().subscribe((res: any) => {
      console.log('Data fetched:', res);
      this.dataSource = res;
      this.data = res.datasets[0].data;
      this.createSvg();
      this.createColors();
      this.drawChart();
    });
  }

  private createSvg(): void {
    this.svg = d3.select('figure#pie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.category))
      .range(this.dataSource.datasets[0].backgroundColor);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value(d => d.amount);
    const arc = d3.arc<any>().innerRadius(0).outerRadius(this.radius);

    this.svg.selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => this.colors(d.data.category))
      .attr('stroke', '#ffffff')
      .style('stroke-width', '2px');
  }
}
