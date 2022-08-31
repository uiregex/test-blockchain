import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UniWindowRefService } from 'uni-common';

import { Block } from '../../models/interfaces/block.model';
import { UniBlockchainStoreService } from '../../store/blockchain-store.service';
import { BlocksApiParams } from '../../models/interfaces/blocks-api-params.model';


@Injectable({ providedIn: 'root' })
export class UniBlocksService {

  constructor(
    private router: Router,
    private windowRef: UniWindowRefService,
    private blockchainStore: UniBlockchainStoreService
  ) {
  }

  loadBlocksCount(): void {
    this.blockchainStore.loadBlocksCount();
  }

  loadBlocks(payload: BlocksApiParams): void {
    this.blockchainStore.loadBlocks(payload);
  }

  getBlocksCount(): Observable<number> {
    return this.blockchainStore.getBlocksCount();
  }

  getBlocks(): Observable<Block[]> {
    return this.blockchainStore.getBlocks()
      .pipe(map((data: Block[]): Block[] => data ?? []));
  }

  setSelectedBlock(payload: number): void {
    this.blockchainStore.setSelectedBlock(payload);
  }

  setQueryParams(queryParams): void {
    this.router.navigate([], { queryParams, queryParamsHandling: 'merge' });
  }

  get queryParams(): string {
    return this.windowRef.nativeWindow.location.search;
  }
}
