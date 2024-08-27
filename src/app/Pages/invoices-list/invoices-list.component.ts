import { Component, OnInit, signal } from '@angular/core';
import { InvoiceTableComponent } from '../../Components/invoice-table/invoice-table.component';
import { RouterLink } from '@angular/router';
import { InvoicesService } from '../../Services/invoices.service';
import { Invoices } from '../../Models/invoices';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [InvoiceTableComponent, RouterLink],
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.scss',
})
export class InvoicesListComponent implements OnInit {
  constructor(private invoicesService: InvoicesService) {}

  invoices = signal<Invoices[]>([]);

  ngOnInit(): void {
    this.getInvoices();
  }

  /**
   * Retrieves a list of invoices from the backend and updates the invoices state.
   */
  async getInvoices() {
    try {
      // Call the getInvoices method of the invoicesService to retrieve the invoices list
      const response = await this.invoicesService.getInvoices();
      // Update the invoices state with the fetched invoices list
      this.invoices.set(response);
    } catch (error) {
      // Handle any errors that occur during the fetching of the invoices list
      console.error('Error fetching invoices:', error);
    }
  }
}
