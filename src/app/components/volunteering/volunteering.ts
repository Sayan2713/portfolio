import { Component, AfterViewInit, NgZone, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-volunteering',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volunteering.html',
  styleUrl: './volunteering.scss'
})
export class VolunteeringComponent implements AfterViewInit {
  
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    ScrollTrigger.refresh();

    this.ngZone.runOutsideAngular(() => {
      
      // Select all lines inside the terminal
      const lines = gsap.utils.toArray('.terminal-body .line');

      // Staggered Typewriter Effect
      gsap.fromTo(lines, 
        { 
          opacity: 0, 
          x: -20 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.2, // Lines appear one by one
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.volunteering-section',
            start: 'top 75%', // Start when section is visible
            toggleActions: 'play none none reverse'
          }
        }
      );

    });
  }
}