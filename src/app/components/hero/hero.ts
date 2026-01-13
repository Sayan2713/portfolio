import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('bgLayer') bgLayer!: ElementRef;
  @ViewChild('midLayer') midLayer!: ElementRef;
  @ViewChild('frontLayer') frontLayer!: ElementRef;

  ngAfterViewInit() {
    // Entrance Animation (Runs once on load)
    const tl = gsap.timeline();
    
    // Background zooms out
    tl.from(this.bgLayer.nativeElement, { 
      duration: 1.5, 
      scale: 1.5, 
      ease: 'power2.out' 
    })
    // Gadget floats up
    .from(this.midLayer.nativeElement, { 
      duration: 1.2, 
      y: 150, 
      opacity: 0, 
      ease: 'back.out(1.7)' 
    }, '-=1.2')
    // Code snippet floats up
    .from(this.frontLayer.nativeElement, { 
      duration: 1.2, 
      y: 200, 
      opacity: 0, 
      ease: 'back.out(1.7)' 
    }, '-=1');
  }

  // LISTENS TO MOUSE EVERYWHERE (Fixes the blocking issue)
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Calculate mouse position relative to center (range -0.5 to 0.5)
    const x = (event.clientX / window.innerWidth - 0.5);
    const y = (event.clientY / window.innerHeight - 0.5);

    // 1. Background: Moves opposite to mouse (Parallax Depth)
    if (this.bgLayer) {
      gsap.to(this.bgLayer.nativeElement, {
        x: x * -30, // Small movement
        y: y * -30,
        duration: 1.5,
        ease: 'power2.out'
      });
    }

    // 2. Middle (Walkie Talkie): Moves with mouse, rotates slightly
    if (this.midLayer) {
      gsap.to(this.midLayer.nativeElement, {
        x: x * 40,
        y: y * 40,
        rotation: x * 10, // Slight tilt
        duration: 1,
        ease: 'power2.out'
      });
    }

    // 3. Front (Hello World): Moves FAST with mouse (Foreground feel)
    if (this.frontLayer) {
      gsap.to(this.frontLayer.nativeElement, {
        x: x * 80,
        y: y * 80,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }
}