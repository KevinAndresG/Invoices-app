import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InvoicesService } from '../../Services/invoices.service';
import { Invoices } from '../../Models/invoices';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { LoaderComponent } from '../../Components/Shared/loader/loader.component';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, LoaderComponent, RouterLink],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent implements OnInit {
  id: string = '';
  invoice = signal<Invoices>({} as Invoices);

  constructor(
    private route: ActivatedRoute,
    private invoicesService: InvoicesService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getInvoice();
  }

  /**
   * Fetches an invoice from the backend and updates the component's invoice.
   */
  async getInvoice() {
    // Fetch the invoice from the backend using the provided id
    this.invoice.set(await this.invoicesService.getInvoice(this.id));
  }
}
