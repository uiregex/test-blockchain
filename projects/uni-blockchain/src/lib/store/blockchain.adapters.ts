import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

import { Block } from '../models/interfaces/block.model';


export const uniBlocksAdapter: EntityAdapter<Block> = createEntityAdapter<Block>({
  selectId: (block: Block) => block.level,
});
