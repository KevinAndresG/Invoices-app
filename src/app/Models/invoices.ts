import { PaymentStatus } from './status';

export interface Invoices {
  id?: string;
  invoiceDate: any;
  clientName: string;
  clientEmail: string;
  labor: number;
  materials: number;
  paymentMethod: string;
  itemDescription: string;
  paymentStatus: PaymentStatus;
  invoiceNumber: string;
  dueDate: any;
}
