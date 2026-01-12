import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar'; 
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about';
import { ExperienceComponent } from './components/experience/experience';
import { HeroComponent } from './components/hero/hero'; 
import { SkillsComponent } from './components/skills/skills';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, NavbarComponent, HeroComponent, AboutComponent, CommonModule, ExperienceComponent, SkillsComponent ], 
  templateUrl: './app.html', 
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'my-portfolio';
}