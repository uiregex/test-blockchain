import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of, Observable, takeUntil } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { isDefined, RxUnsubscribe } from 'uni-common';

import { Block, ModifiedBlock } from '../../models/interfaces/block.model';
import { UniBlocksService } from './blocks.service';
import { SortPage } from '../../models/interfaces/sort-page.model';


@Component({
  selector: 'uni-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss'],
})
export class UniBlocksComponent extends RxUnsubscribe implements OnInit, AfterViewInit {

  columns: string[] = ['level', 'proposer', 'timestamp', 'transactions'];
  limits: number[] = [5, 10];
  limit: number = 5;
  blocksCount$: Observable<number> = of(0);
  activeRequests: number = 0;
  data: Block[] = [];
  params: Partial<{ page: number; selected: number; }> = {};

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private blocksService: UniBlocksService) {
    super();
  }

  ngOnInit() {
    const params = new URLSearchParams(this.blocksService.queryParams);

    this.params.page = parseInt(params.get('blocks-page') ?? '');
    this.params.selected = parseInt(params.get('block') ?? '');
    this.blocksService.setSelectedBlock(this.params.selected);

    this.blocksCount$ = this.blocksService.getBlocksCount();

    this.blocksService.getBlocks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ModifiedBlock[]): void => {
        this.activeRequests--;
        this.data = data;
      });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.pageIndex = this.params.page ?? this.paginator.pageIndex;

      if (this.sort) {
        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            takeUntil(this.destroy$),
          )
          .subscribe((params: SortPage): void => {
            this.activeRequests++;
            this.activeRequests++;

            // If the user changes the sort order, reset back to the first page.
            if (this.paginator && params.active && params.direction) {
              this.paginator.pageIndex = 0;
            }

            if (isDefined(params.pageIndex)) {
              this.blocksService.setQueryParams({ 'blocks-page': params.pageIndex });
            }

            this.blocksService.loadBlocksCount();

            if (this.paginator && this.sort) {
              this.blocksService.loadBlocks({
                limit: this.paginator.pageSize,
                page: this.paginator.pageIndex,
                sort: this.sort.active,
                order: this.sort.direction,
                fields: 'level,proposer,timestamp',
              });
            }
          });
      }
    }
  }

  setSelectedBlock(block: number): void {
    this.params.selected = block;
    this.blocksService.setSelectedBlock(block);
    this.blocksService.setQueryParams({ block });
  }
}
