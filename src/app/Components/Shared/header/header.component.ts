import { Component, HostListener, OnInit } from '@angular/core';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MobileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  viewportWidth: number = 0;

  ngOnInit(): void {
    this.updateViewportSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateViewportSize();
  }

  /**
   * Updates the viewport width based on the window's screen width.
   * This function is called when the component is initialized and when the window is resized.
   */
  updateViewportSize(): void {
    // Get the width of the screen
    this.viewportWidth = window.screen.width;
  }
}
