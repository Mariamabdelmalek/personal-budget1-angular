// src\app\app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { ContactComponent } from "./contact/contact.component";
import { D3ChartComponent } from "./d3-chart/d3-chart.component";



@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, HeroComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent {
  title = 'personal-budget1';
}
