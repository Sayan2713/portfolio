import { Component, AfterViewInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificate.html',
  styleUrl: './certificate.scss'
})
export class CertificateComponent implements AfterViewInit {
  
  // Inject NgZone to fix the lag
  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone) {}

  certs = [
    { title: 'Python for Data Science', issuer: 'NPTEL', year: '2023', icon: '🏆', color: '#FFD700' },
    { title: 'AI for Everyone', issuer: 'Coursera', year: '2023', icon: '🧠', color: '#0056D2' },
    { title: 'Cyber Security', issuer: 'Training Project', year: '2025', icon: '🔐', color: '#00FF00' },
    { title: 'IoT Training', issuer: 'Industrial Training', year: '2023', icon: '☁️', color: '#00BFFF' },
    { title: 'Website Testing', issuer: 'IBM', year: '2025', icon: '🐞', color: '#FF4500' }
  ];

  activeCert = this.certs[0];
  activeIndex = 0;

  ngAfterViewInit() {
    ScrollTrigger.refresh();
    const totalScroll = this.certs.length * 400; 

    // Run the scroll logic OUTSIDE Angular to stop the lag
    this.ngZone.runOutsideAngular(() => {
      
      ScrollTrigger.create({
        trigger: '.cert-section',
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: true,
        scrub: 0.5, // Reduced scrub time for snappier feel
        onUpdate: (self) => {
          const index = Math.floor(self.progress * (this.certs.length - 0.01));
          
          // Only re-enter Angular if the index ACTUALLY changed
          if (index !== this.activeIndex) {
            this.ngZone.run(() => {
              this.activeIndex = index;
              this.activeCert = this.certs[index];
              this.cd.detectChanges(); // Manually update UI
            });
          }
        }
      });

    });

    // Simple fade in
    gsap.from('.display-deck', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.cert-section',
        start: 'top 80%',
      }
    });
  }
}