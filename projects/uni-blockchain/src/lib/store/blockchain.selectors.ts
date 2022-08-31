import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from '@ngrx/entity/src/models';

import { UniObject } from 'uni-common';

import { BlockchainState, BlockchainUiState } from '../models/interfaces/blockchain-state.model';
import { Transaction } from '../models/interfaces/transaction.model';
import { Block } from '../models/interfaces/block.model';
import { uniBlocksAdapter } from './blockchain.adapters';


const blockchainState = createFeatureSelector('blockchain');
const blocksState = createSelector(blockchainState, (state: BlockchainState): EntityState<Block> => state.blocks);
const blocksCountState = createSelector(blockchainState, (state: BlockchainState): number => state.blocksCount);
const transactionsState = createSelector(blockchainState, (state: BlockchainState): Transaction[] => state.transactions);
const transactionsCountState = createSelector(blockchainState, (state: BlockchainState): UniObject<number> => state.transactionsCount);


export const { selectAll: selectBlocks } = uniBlocksAdapter.getSelectors(blocksState);
export const { selectIds: selectBlocksIds } = uniBlocksAdapter.getSelectors(blocksState);

export const selectBlocksCount = createSelector(blocksCountState, (state: number): number => state);
export const selectTransactions = createSelector(transactionsState, (state: Transaction[]): Transaction[] => state);
export const selectTransactionsCount = createSelector(
  transactionsCountState,
  (state: UniObject<number>): UniObject<number> => state,
);


const uiState = createSelector(blockchainState, (state: BlockchainState): Partial<BlockchainUiState> => state.ui);

export const selectSelectedBlock = createSelector(uiState, (state: Partial<BlockchainUiState>): number => state.selectedBlock);
