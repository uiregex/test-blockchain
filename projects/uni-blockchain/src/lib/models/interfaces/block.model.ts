import { Contact } from './contact.model';

export interface Block {
  level: number;
  timestamp: string;
  proposer: Contact;
}

export interface ModifiedBlock extends Block {
  transactions: number;
}
