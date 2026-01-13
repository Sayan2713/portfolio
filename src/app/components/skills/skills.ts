import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('tagCloudContainer') containerRef!: ElementRef;
  @ViewChild('floatingChar') charRef!: ElementRef;
  @ViewChild('skillTitle') titleRef!: ElementRef; // Reference to "My Skills"

  // YOUR SKILLS LIST
  mySkills = [
    'React', 'Angular', 'React Native', 'HTML5', 'CSS3', 
    'Tailwind CSS', 'Bulma CSS', 'JavaScript', 'Bootstrap', 
    'UI/UX Design', 'Figma', 'Node.js', 'Express.js', 
    'Django', 'Python', 'MongoDB', 'MySQL', 'SQL', 
    'Git', 'GitHub', 'SDLC', 'REST APIs', 
    'MVC Architecture', 'Problem Solving', 'Teamwork', 
    'Communication', 'Collaboration'
  ];

  ngAfterViewInit() {
    // Dynamically load TagCloud
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/TagCloud@2.2.0/dist/TagCloud.min.js';
    script.onload = () => {
      this.initSphere();
    };
    document.body.appendChild(script);
  }

  initSphere() {
    const container = this.containerRef.nativeElement;
    const options = {
      radius: 450,        
      maxSpeed: 'fast',   
      initSpeed: 'normal',
      direction: 135,
      keep: true,
      useContainerInlineStyles: false 
    };

    // @ts-ignore
    TagCloud(container, this.mySkills, options);
  }

  // MOUSE MOVEMENT LOGIC
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = (window.innerWidth - event.pageX) / 40;
    const y = (window.innerHeight - event.pageY) / 40;

    // Move Character
    if (this.charRef) {
      this.charRef.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
    }

    // Move Title ("My Skills") - Move slightly less for depth effect
    if (this.titleRef) {
      this.titleRef.nativeElement.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    }
  }
}