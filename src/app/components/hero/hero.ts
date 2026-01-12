import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
    // Entrance Animation
    const tl = gsap.timeline();
    tl.from(this.bgLayer.nativeElement, { duration: 1.5, scale: 1.2, ease: 'power2.out' })
      .from(this.midLayer.nativeElement, { duration: 1, y: 100, opacity: 0 }, '-=1')
      .from(this.frontLayer.nativeElement, { duration: 1, y: 100, opacity: 0 }, '-=0.8');
  }

  onMouseMove(event: MouseEvent) {
    const x = (event.clientX / window.innerWidth - 0.5);
    const y = (event.clientY / window.innerHeight - 0.5);

    // Parallax Logic
    // Background moves slightly opposite to mouse (Depth)
    gsap.to(this.bgLayer.nativeElement, {
      x: x * -20,
      y: y * -20,
      duration: 1,
      ease: 'power2.out'
    });

    // Walkie Talkie moves WITH mouse (Float)
    gsap.to(this.midLayer.nativeElement, {
      x: x * 40,
      y: y * 40,
      rotation: x * 5,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Hello World moves FAST with mouse (Foreground)
    gsap.to(this.frontLayer.nativeElement, {
      x: x * 80,
      y: y * 80,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
}