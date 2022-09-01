import { EntityState } from '@ngrx/entity/src/models';

import { UniObject } from 'uni-common';

import { Block } from './block.model';
import { Transaction } from './transaction.model';

export interface BlockchainState {
  blocksCount: number;
  blocks: EntityState<Block>;
  transactionsCounts: UniObject<number>;
  transactions: Transaction[];
  ui: Partial<BlockchainUiState>;
}

export interface BlockchainUiState {
  selectedBlock: number;
}
