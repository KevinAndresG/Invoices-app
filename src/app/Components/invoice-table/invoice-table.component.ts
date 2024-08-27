import { Component, input } from '@angular/core';
import { Invoices } from '../../Models/invoices';
import { CurrencyPipe } from '@angular/common';
import { InvoicesService } from '../../Services/invoices.service';
import { LoaderComponent } from '../Shared/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-table',
  standalone: true,
  imports: [CurrencyPipe, LoaderComponent, RouterLink],
  templateUrl: './invoice-table.component.html',
  styleUrl: './invoice-table.component.scss',
})
export class InvoiceTableComponent {
  constructor(private invoicesService: InvoicesService) {}
  invoices = input<Invoices[]>();

  /**
   * Deletes an invoice from the database and refreshes the page.
   *
   * @param invoice - The invoice to delete.
   * @returns A promise that resolves when the invoice is deleted and the page is refreshed.
   */
  async delete(invoice: Invoices) {
    // Call the deleteInvoice method of the invoicesService with the given invoice.
    await this.invoicesService.deleteInvoice(invoice);

    // Reload the current page using the window.location.reload() method.
    window.location.reload();
  }
}
