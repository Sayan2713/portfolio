import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Components
import { NavbarComponent } from './shared/navbar/navbar';
import { HeroComponent } from './components/hero/hero';
import { AboutComponent } from './components/about/about';
import { ExperienceComponent } from './components/experience/experience';
import { SkillsComponent } from './components/skills/skills';
import { ProjectsComponent } from './components/projects/projects';
import { CertificateComponent } from './components/certificate/certificate';
import { VolunteeringComponent } from './components/volunteering/volunteering';
import { ContactComponent } from './components/contact/contact';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, HeroComponent, AboutComponent,
    ExperienceComponent, SkillsComponent, ProjectsComponent,
    CertificateComponent, VolunteeringComponent, ContactComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('inkVideo') inkVideoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    ScrollTrigger.refresh();
    const video = this.inkVideoRef.nativeElement;

    // Wait for video metadata to load (so we know duration)
    video.onloadedmetadata = () => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.pin-wrapper',
          start: 'top top',
          end: '+=200%', // Scroll distance (adjust for speed)
          pin: true,
          scrub: 1,      // Smooth scrubbing
        }
      });

      // 1. Fade in the Ink Wrapper
      tl.to('.ink-wrapper', { opacity: 1, duration: 0.1 })
      
      // 2. SCRUB THE VIDEO: Change currentTime based on scroll
      .fromTo(video, 
        { currentTime: 0 }, 
        { currentTime: video.duration || 1, duration: 1.5, ease: 'none' }
      );
    };
  }
}