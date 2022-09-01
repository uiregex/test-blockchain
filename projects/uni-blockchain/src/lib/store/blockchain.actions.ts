import { createAction, props } from "@ngrx/store";

import { UniObject } from 'uni-common';

import { Block } from '../models/interfaces/block.model';
import { Transaction } from '../models/interfaces/transaction.model';
import { TransactionsApiParams } from '../models/interfaces/transactions-api-params.model';
import { BlocksApiParams } from '../models/interfaces/blocks-api-params.model';


export const LOAD_BLOCKS_COUNT = "[Blocks] Load Count";
export const SET_BLOCKS_COUNT = "[Blocks] Set Count";

export const LOAD_BLOCKS = "[Blocks] Load";
export const SET_BLOCKS = "[Blocks] Set";
export const SET_SELECTED_BLOCK = "[Blocks] Set Selected";

export const LOAD_TRANSACTIONS_COUNTS = "[Transactions] Load Counts";
export const SET_TRANSACTIONS_COUNTS = "[Transactions] Set Counts";

export const LOAD_TRANSACTIONS = "[Transactions] Load";
export const SET_TRANSACTIONS = "[Transactions] Set";


export const loadBlocksCount = createAction(LOAD_BLOCKS_COUNT);
export const setBlocksCount = createAction(SET_BLOCKS_COUNT, props<{ payload: number }>());

export const loadBlocks = createAction(LOAD_BLOCKS, props<{ payload: BlocksApiParams }>());
export const setBlocks = createAction(SET_BLOCKS, props<{ payload: Block[] }>());
export const setSelectedBlock = createAction(SET_SELECTED_BLOCK, props<{ payload: number }>());

export const loadTransactionsCounts = createAction(LOAD_TRANSACTIONS_COUNTS, props<{ payload: string }>());
export const setTransactionsCounts = createAction(SET_TRANSACTIONS_COUNTS, props<{ payload: UniObject<number> }>());

export const loadTransactions = createAction(LOAD_TRANSACTIONS, props<{ payload: TransactionsApiParams }>());
export const setTransactions = createAction(SET_TRANSACTIONS, props<{ payload: Transaction[] }>());
