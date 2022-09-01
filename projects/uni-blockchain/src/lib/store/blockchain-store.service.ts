import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { UniObject } from 'uni-common';

import { ModifiedBlock } from '../models/interfaces/block.model';
import { Transaction } from '../models/interfaces/transaction.model';
import { BlocksApiParams } from '../models/interfaces/blocks-api-params.model';
import { TransactionsApiParams } from '../models/interfaces/transactions-api-params.model';
import { BlockchainState } from '../models/interfaces/blockchain-state.model';
import {
  loadBlocks,
  loadBlocksCount,
  loadTransactions,
  setSelectedBlock,
} from './blockchain.actions';
import {
  selectBlocksCount,
  selectBlocksIds,
  selectEnrichedBlocks,
  selectSelectedBlock,
  selectTransactions,
  selectTransactionsCounts,
} from './blockchain.selectors';


@Injectable({providedIn: 'root'})
export class UniBlockchainStoreService {

  constructor(private store$: Store<BlockchainState>) {
  }

  loadBlocksCount(): void {
    this.store$.dispatch(loadBlocksCount());
  }

  loadBlocks(payload: BlocksApiParams): void {
    this.store$.dispatch(loadBlocks({ payload }));
  }

  loadTransactions(payload: TransactionsApiParams): void {
    this.store$.dispatch(loadTransactions({ payload }));
  }

  setSelectedBlock(payload: number): void {
    this.store$.dispatch(setSelectedBlock({ payload }));
  }

  getBlocksCount(): Observable<number> {
    return this.store$.pipe(select(selectBlocksCount));
  }

  getBlocks(): Observable<ModifiedBlock[]> {
    return this.store$.pipe(select(selectEnrichedBlocks));
  }

  getBlocksIds(): Observable<string[] | number[]> {
    return this.store$.pipe(select(selectBlocksIds));
  }

  getTransactionsCounts(): Observable<UniObject<number>> {
    return this.store$.pipe(select(selectTransactionsCounts));
  }

  getTransactions(): Observable<Transaction[]> {
    return this.store$.pipe(select(selectTransactions));
  }

  getSelectedBlock(): Observable<number | undefined> {
    return this.store$.pipe(select(selectSelectedBlock));
  }
}
