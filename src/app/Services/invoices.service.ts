import { Injectable } from '@angular/core';
import { FireBaseApp } from '../../../FirebaseCredentials';
import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { Invoices } from '../Models/invoices';

const db = getFirestore(FireBaseApp);

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  async getInvoices() {
    try {
      const resp: any = await getDocs(collection(db, 'invoices'));
      const invoicesList: Invoices[] = [];
      resp.forEach((doc: any) => {
        const data: Invoices = { ...doc.data(), id: doc.id };
        const invoiceDate =
          data.invoiceDate instanceof Timestamp
            ? data.invoiceDate.toDate()
            : null;
        const dueDate =
          data.dueDate instanceof Timestamp ? data.dueDate.toDate() : null;
        invoicesList.push({
          ...data,
          invoiceDate,
          dueDate,
        } as Invoices);
        return invoicesList;
      });
      return invoicesList;
    } catch (error) {
      alert('Error getting invoices: ');
      return [];
    }
  }

  async getInvoice(id: string) {
    const docRef = doc(db, 'invoices', id);
    return await getDoc(docRef)
      .then((docSnap: any) => {
        if (docSnap.exists()) {
          const data: Invoices = docSnap.data();
          const invoiceDate =
            data.invoiceDate instanceof Timestamp
              ? data.invoiceDate.toDate()
              : null;
          const dueDate =
            data.dueDate instanceof Timestamp ? data.dueDate.toDate() : null;
          return { ...docSnap.data(), invoiceDate, dueDate };
        } else {
          alert('No invoice found with that ID');
          return [];
        }
      })
      .catch((error) => {
        alert('Error getting invoice: ');
        return [];
      });
  }

  async createInvoice(invoice: Invoices) {
    try {
      await addDoc(collection(db, 'invoices'), {
        ...invoice,
        dueDate: Timestamp.fromDate(new Date(invoice.dueDate!)),
        invoiceDate: Timestamp.fromDate(new Date(invoice.invoiceDate!)),
      });
    } catch (error) {
      alert('Error creating document');
    }
  }

  async updateInvoice(id: string, body: Invoices) {
    try {
      const docRef = doc(db, 'invoices', id);
      await updateDoc(docRef, {
        ...body,
        dueDate: Timestamp.fromDate(new Date(body.dueDate!)),
        invoiceDate: Timestamp.fromDate(new Date(body.invoiceDate!)),
      });
    } catch (error) {
      alert('Error Updating Invoice');
    }
  }

  async deleteInvoice(invoice: Invoices) {
    try {
      await deleteDoc(doc(db, 'invoices', invoice.id!));
    } catch (error) {
      alert('Error deleting invoice');
    }
  }
}
