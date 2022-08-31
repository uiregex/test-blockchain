import { ActionReducerMap, createReducer, on } from '@ngrx/store';

import { BlockchainState } from '../models/interfaces/blockchain-state.model';
import { uniBlocksAdapter } from './blockchain.adapters';
import {
  setBlocks,
  setBlocksCount,
  setModifiedBlocks,
  setSelectedBlock,
  setTransactions,
  setTransactionsCount,
} from './blockchain.actions';


const blocksCountReducer = createReducer(0, on(setBlocksCount, (state, { payload }) => payload));

const blocksReducer = createReducer(
  uniBlocksAdapter.getInitialState(),
  on(setBlocks, (state, { payload }) => uniBlocksAdapter.setMany(payload, { ids: [], entities: {} })),
  on(setModifiedBlocks, (state, { payload }) => uniBlocksAdapter.setMany(payload, { ids: [], entities: {} })),
);

const transactionsCountReducer = createReducer({}, on(setTransactionsCount, (state, { payload }) => payload));

const transactionsReducer = createReducer([], on(setTransactions, (state, { payload }) => payload));

const uiReducer = createReducer(
  {},
  on(setSelectedBlock, (state, { payload }) => ({...state, selectedBlock: payload })),
);

export const uniBlockchainReducers: ActionReducerMap<BlockchainState> = {
  blocks: blocksReducer,
  blocksCount: blocksCountReducer,
  transactionsCount: transactionsCountReducer,
  transactions: transactionsReducer,
  ui: uiReducer
};