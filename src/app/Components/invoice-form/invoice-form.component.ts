import { CurrencyPipe } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InvoicesService } from '../../Services/invoices.service';
import { Invoices } from '../../Models/invoices';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../Shared/loader/loader.component';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, LoaderComponent],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.scss',
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup = new FormGroup({});
  invoices = signal<Invoices[]>([]);
  invoice = signal<Invoices>({} as Invoices);
  id = signal<string>('');
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private invoicesService: InvoicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoiceNumber: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      itemDescription: [''],
      labor: ['', Validators.required],
      materials: ['', Validators.required],
      paymentStatus: ['pending'],
      paymentMethod: ['credit-card'],
    });
    this.id.set(this.route.snapshot.paramMap.get('id')!);
    if (this.route.snapshot.paramMap.get('id')) {
      this.getInvoice();
    }
  }

  /**
   * Fetches an invoice from the backend and updates the component's invoice and form values.
   */
  async getInvoice() {
    try {
      // Fetch the invoice from the backend using the provided id
      this.invoice.set(await this.invoicesService.getInvoice(this.id()));

      // Update the form values with the fetched invoice data
      this.invoiceForm.patchValue({
        invoiceNumber: this.invoice().invoiceNumber, // Invoice number
        clientName: this.invoice().clientName, // Client name
        clientEmail: this.invoice().clientEmail, // Client email
        invoiceDate: this.formatDate(this.invoice().invoiceDate), // Invoice date
        dueDate: this.formatDate(this.invoice().dueDate), // Due date
        itemDescription: this.invoice().itemDescription, // Item description
        labor: this.invoice().labor, // Labor cost
        materials: this.invoice().materials, // Materials cost
        paymentStatus: this.invoice().paymentStatus, // Payment status
        paymentMethod: this.invoice().paymentMethod, // Payment method
      });
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  }

  /**
   * Formats a date to a string in the 'YYYY-MM-DD' format.
   * @param {Date | string | number} date - The date to format.
   * @returns {string} - The formatted date string.
   */
  formatDate(date: Date | string | number): string {
    return new Date(date).toISOString().split('T')[0];
  }

  /**
   * Creates a new invoice using the data from the invoice form.
   * Redirects to the invoices list page after successful creation.
   *
   * @return {Promise<void>} - A promise that resolves when the invoice is created and the page is redirected.
   */
  async createInvoice() {
    // Check if the invoice form is valid
    if (this.invoiceForm.valid) {
      // Set the loading state to indicate that the invoice is being created
      this.loading.set(true);

      // Create a new invoice using the data from the invoice form
      await this.invoicesService.createInvoice(this.invoiceForm.value);

      // Set the loading state to indicate that the invoice creation is complete
      this.loading.set(false);

      // Redirect to the invoices list page
      this.router.navigate(['dashboard/invoices-list']);
    }
  }

  /**
   * Updates an existing invoice using the data from the invoice form.
   * Redirects to the invoices list page after successful update.
   */
  async updateInvoice() {
    // Check if the invoice form is valid
    if (this.invoiceForm.valid) {
      // Set the loading state to indicate that the invoice is being updated
      this.loading.set(true);

      // Update the existing invoice using the data from the invoice form
      await this.invoicesService.updateInvoice(
        this.id(), // Get the invoice ID from the URL parameter
        this.invoiceForm.value // Get the invoice data from the form
      );

      // Set the loading state to indicate that the invoice update is complete
      this.loading.set(false);

      // Redirect to the invoices list page
      this.router.navigate(['dashboard/invoices-list']);
    }
  }
}
