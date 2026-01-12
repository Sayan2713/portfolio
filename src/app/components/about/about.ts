import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent implements AfterViewInit {
  // Grab all elements with the class 'reveal'
  @ViewChildren('revealText') revealText!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // We target standard CSS classes directly for simplicity
    const elements = gsap.utils.toArray('.reveal');

    elements.forEach((el: any) => {
      gsap.fromTo(el, 
        { 
          y: 50,      // Start 50px lower
          opacity: 0, // Start invisible
          filter: 'blur(10px)' // Start blurry
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)', // Become clear
          color: '#fff', // Turn white
          duration: 1,
          scrollTrigger: {
            trigger: el, // Animate when THIS specific line appears
            start: 'top 80%', // Start when top of text hits 80% of viewport height
            end: 'top 50%',
            scrub: 1, // Smoothly link animation to scrollbar speed
          }
        }
      );
    });
  }
}