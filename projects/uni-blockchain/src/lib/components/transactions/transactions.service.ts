import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UniObject, UniWindowRefService } from 'uni-common';

import { UniBlockchainStoreService } from '../../store/blockchain-store.service';
import { Transaction } from '../../models/interfaces/transaction.model';
import { TransactionsApiParams } from '../../models/interfaces/transactions-api-params.model';


@Injectable({ providedIn: 'root' })
export class UniTransactionsService {

  constructor(
    private router: Router,
    private windowRef: UniWindowRefService,
    private blockchainStore: UniBlockchainStoreService
  ) {
  }

  getTransactions(): Observable<Transaction[]> {
    return this.blockchainStore.getTransactions();
  }

  getTransactionsCounts(): Observable<UniObject<number>> {
    return this.blockchainStore.getTransactionsCounts();
  }

  getSelectedBlock(): Observable<number | undefined> {
    return this.blockchainStore.getSelectedBlock();
  }

  loadTransactions(payload: TransactionsApiParams): void {
    this.blockchainStore.loadTransactions(payload);
  }
}

