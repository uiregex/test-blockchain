import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { errorHandler, UniObject, UniRestApiService } from 'uni-common';

import { TransactionsApiParams } from '../models/interfaces/transactions-api-params.model';
import { BlocksApiParams } from '../models/interfaces/blocks-api-params.model';
import { Transaction } from '../models/interfaces/transaction.model';
import { Block } from '../models/interfaces/block.model';
import { UniBlockchainStoreService } from './blockchain-store.service';
import {
  LOAD_BLOCKS,
  LOAD_BLOCKS_COUNT,
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_COUNTS,
  SET_BLOCKS,
  loadTransactionsCounts,
  setBlocks,
  setBlocksCount,
  setTransactions,
  setTransactionsCounts,
} from './blockchain.actions';
import { PayloadData } from '../models/interfaces/payload-data.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UniBlockchainEffects {

  constructor(
    private action$: Actions,
    private restService: UniRestApiService,
    private blockchainStore: UniBlockchainStoreService,
  ) {
  }

  loadBlocksCount$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_BLOCKS_COUNT),
      switchMap((): Observable<number> => this.restService.get('blocksCountUrl')),
      errorHandler('LOAD_BLOCKS_COUNT'),
      map((payload: number): Action => setBlocksCount({ payload })),
    ),
  );

  loadBlocks$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_BLOCKS),
      map((data: PayloadData<BlocksApiParams>): BlocksApiParams => data.payload),
      switchMap((params: BlocksApiParams): Observable<Block[]> => this.restService.get('blocksUrl', {
        request: {
          params: {
            limit: params.limit,
            'offset.pg': params.page,
            [`sort.${params.order}`]: params.sort,
            'select.fields': params.fields,
          },
        },
      })),
      errorHandler('LOAD_BLOCKS'),
      map((payload: Block[]): Action => setBlocks({ payload })),
    ),
  );

  setBlocks$ = createEffect(() =>
    this.action$.pipe(
      ofType(SET_BLOCKS),
      withLatestFrom(this.blockchainStore.getBlocksIds()),
      map(([data, ids]: [never, number[] | string[]]): string => ids.toString()),
      errorHandler('SET_BLOCKS'),
      map((levels: string): Action => loadTransactionsCounts({ payload: levels })),
    ),
  );

  loadTransactionsCount$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_TRANSACTIONS_COUNTS),
      map((data: PayloadData<string>): string => data.payload),
      switchMap((levels: string): Observable<number[]> => this.restService.get('transactionsUrl', {
        request: {
          params: {
            limit: 10000,
            'level.in': levels,
            'select.fields': 'level',
          },
        },
      })),
      map((data: number[]): UniObject<number> => data.reduce((acc: UniObject<number>, level: number) => {
        acc[level] = (acc[level] || 0) + 1;
        return acc;
      }, {})),
      errorHandler('LOAD_TRANSACTIONS_COUNT'),
      map((payload: UniObject<number>): Action => setTransactionsCounts({ payload })),
    ),
  );

  loadTransactions$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_TRANSACTIONS),
      map((data: PayloadData<TransactionsApiParams>): TransactionsApiParams => data.payload),
      switchMap((params: TransactionsApiParams): Observable<Transaction[]> =>
        this.restService.get('transactionsUrl', {
          request: {
            params: {
              limit: params.limit,
              'offset.pg': params.page,
              'level.in': params.level,
              'select.fields': params.fields,
            },
          },
        })),
      errorHandler('LOAD_TRANSACTIONS'),
      map((payload: Transaction[]): Action => setTransactions({ payload })),
    ),
  );
}
