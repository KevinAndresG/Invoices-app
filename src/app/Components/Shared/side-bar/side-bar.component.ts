import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [SideBarComponent, RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  items = [
    { title: 'Invoices', path: 'invoices-list' },
    { title: 'Create Invoice', path: 'create-invoice' },
  ];
}
