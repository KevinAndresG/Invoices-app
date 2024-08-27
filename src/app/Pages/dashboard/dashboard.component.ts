import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../Components/Shared/side-bar/side-bar.component';
import { HeaderComponent } from '../../Components/Shared/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  viewportWidth: number = 0;

  ngOnInit(): void {
    this.updateViewportSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateViewportSize();
  }

  /**
   * Updates the viewport width based on the current screen width.
   * This method is called in the `ngOnInit` lifecycle hook and on window resize.
   */
  updateViewportSize() {
    // Get the current width of the screen
    this.viewportWidth = window.screen.width;
  }
}
