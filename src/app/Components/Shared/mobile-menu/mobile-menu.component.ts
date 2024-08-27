import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  isOpen = false;
  items = [
    { title: 'Invoices', path: 'invoices-list' },
    { title: 'Create Invoice', path: 'create-invoice' },
  ];

  openMenu() {
    this.isOpen = !this.isOpen;
  }
}
