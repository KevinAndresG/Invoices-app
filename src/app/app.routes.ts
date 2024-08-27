import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard/invoices-list' },
  {
    path: 'dashboard',
    pathMatch: 'full',
    redirectTo: 'dashboard/invoices-list',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./Pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    children: [
      {
        path: 'invoices-list',
        loadComponent: () =>
          import('./Pages/invoices-list/invoices-list.component').then(
            (m) => m.InvoicesListComponent
          ),
      },
      {
        path: 'invoice/:id',
        loadComponent: () =>
          import('./Pages/invoice-details/invoice-details.component').then(
            (m) => m.InvoiceDetailsComponent
          ),
      },
      {
        path: 'create-invoice',
        loadComponent: () =>
          import('./Pages/create-invoice/create-invoice.component').then(
            (m) => m.CreateInvoiceComponent
          ),
      },
      {
        path: 'edit-invoice/:id',
        loadComponent: () =>
          import('./Pages/create-invoice/create-invoice.component').then(
            (m) => m.CreateInvoiceComponent
          ),
      },
    ],
  },
];
