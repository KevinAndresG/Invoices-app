export interface InvoiceStatus {
  Paid: string;
  Pending: string;
  Overdue: string;
  Cancelled: string;
  PartiallyPaid: string;
  Refunded: string;
  Sent: string;
  Approved: string;
  Rejected: string;
}

export enum PaymentStatus {
  Paid = 'Paid',
  Pending = 'Pending',
  Overdue = 'Overdue',
  Cancelled = 'Cancelled',
  PartiallyPaid = 'PartiallyPaid',
  Refunded = 'Refunded',
  Sent = 'Sent',
  Approved = 'Approved',
  Rejected = 'Rejected',
}
