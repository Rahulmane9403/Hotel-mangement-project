import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // collapsed = false; 
  // toggle() { this.collapsed = !this.collapsed; }
  collapsed = false;
  mobileSidebarOpen = false;
  isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkMobile();
  }

  ngOnInit() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.collapsed = false;
    }
  }

  toggle() {
    if (this.isMobile) {
      // this.collapsed = !this.collapsed;
      // this.toggleSidebar.emit();
      this.mobileSidebarOpen = !this.mobileSidebarOpen;
    } else {
      this.collapsed = !this.collapsed;
    }
  }

  closeMobileSidebar() {
    if (this.isMobile) {
      this.mobileSidebarOpen = false;
    }
  }

  // // sidebar.component.ts
  // @Output() toggleSidebar = new EventEmitter<void>();

  

}
