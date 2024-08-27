import { Component, OnInit } from '@angular/core';
import { InvoiceFormComponent } from '../../Components/invoice-form/invoice-form.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  standalone: true,
  imports: [InvoiceFormComponent, RouterLink],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
})
export class CreateInvoiceComponent implements OnInit {
  id: string | null = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }
}
