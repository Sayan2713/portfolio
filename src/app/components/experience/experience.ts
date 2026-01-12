import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChildren('card1, card2') cards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.cards.forEach(card => {
      const el = card.nativeElement;

      // Mouse Move Event (Tilt)
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse position inside card
        const y = e.clientY - rect.top;
        
        // Calculate rotation (center is 0)
        const xPct = (x / rect.width - 0.5) * 20; // -10 to 10 degrees
        const yPct = (y / rect.height - 0.5) * -20; 

        gsap.to(el, {
          rotationY: xPct,
          rotationX: yPct,
          transformPerspective: 1000,
          duration: 0.5,
          ease: 'power2.out'
        });
      });

      // Mouse Leave Event (Reset)
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }
}