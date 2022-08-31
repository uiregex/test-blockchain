import { Contact } from './contact.model';

export interface Transaction {
  sender: Contact;
  target: Contact;
  amount: number;
  status: string;
}
