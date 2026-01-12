import { Component, AfterViewInit } from '@angular/core';
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
  
  // 1. The Data
  certs = [
    { title: 'Python for Data Science', issuer: 'NPTEL', year: '2023', icon: '🏆', color: '#FFD700' },
    { title: 'AI for Everyone', issuer: 'Coursera', year: '2023', icon: '🧠', color: '#0056D2' },
    { title: 'Cyber Security', issuer: 'Training Project', year: '2025', icon: '🔐', color: '#00FF00' },
    { title: 'IoT Training', issuer: 'Industrial Training', year: '2023', icon: '☁️', color: '#00BFFF' },
    { title: 'Website Testing', issuer: 'IBM', year: '2025', icon: '🐞', color: '#FF4500' }
  ];

  // 2. Track the "Active" card (Default to the first one)
  activeCert = this.certs[0];

  // 3. Function to switch cards on hover
  setActive(cert: any) {
    this.activeCert = cert;
  }

  ngAfterViewInit() {
    ScrollTrigger.refresh();
    
    // Animate the entrance
    gsap.from('.display-deck', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.cert-section',
        start: 'top 80%',
      }
    });
  }
}