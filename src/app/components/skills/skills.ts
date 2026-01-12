@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {

}
import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent implements AfterViewInit {
  @ViewChildren('category') categories!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.categories.forEach((cat, index) => {
      gsap.from(cat.nativeElement, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2, // Stagger effect (one by one)
        scrollTrigger: {
          trigger: cat.nativeElement,
          start: 'top 85%',
        }
      });
    });
  }
}