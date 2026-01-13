import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChildren('jobCard') jobCards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.jobCards.forEach((card) => {
      const el = card.nativeElement;

      // Ensure initial state is set before animation starts
      gsap.set(el, { 
        opacity: 0, 
        filter: "blur(20px)", // Start VERY blurred
        y: 100 
      });

      gsap.to(el, {
        opacity: 1,
        filter: "blur(0px)", // Become clear
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",    // Start animating when card is near bottom of screen
          end: "top 30%",      // Animation finishes here
          
          // ACTIONS:
          // onEnter: Play forward (Blur -> Clear)
          // onLeave: Do nothing
          // onEnterBack: Do nothing
          // onLeaveBack: Reverse (Clear -> Blur) -> This creates the re-blur on scroll up
          toggleActions: "play none none reverse", 
        }
      });
    });
  }
}