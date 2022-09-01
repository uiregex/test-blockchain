import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { startWith } from 'rxjs/operators';
import { takeUntil } from 'rxjs';

import { RxUnsubscribe, UniObject } from 'uni-common';

import { Transaction } from '../../models/interfaces/transaction.model';
import { UniTransactionsService } from './transactions.service';


@Component({
  selector: 'uni-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class UniTransactionsComponent extends RxUnsubscribe implements OnInit, AfterViewInit {

  columns: string[] = ['sender', 'target', 'amount', 'status'];
  limits: number[] = [5, 10];
  limit: number = 5;
  transactionsCount: number = 0;
  activeRequests: number = 1;
  data: Transaction[] = [];

  private transactions: Transaction[] = [];
  private transactionsCounts: UniObject<number> = {};
  private params: Partial<{ selected: number; }> = {};

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private transactionsService: UniTransactionsService) {
    super();
  }

  ngOnInit(): void {
    this.transactionsService.getTransactions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Transaction[]): void => {
        this.data = data;
        // Set reserved copy
        this.transactions = data;
        this.activeRequests--;
      });

    this.transactionsService.getTransactionsCounts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: UniObject<number>): void => {
        this.transactionsCounts = data;
        // Set total count if selected is visible;
        this.transactionsCount = this.params.selected ? data[this.params.selected] : 0;
        // Remove table data if selected is not visible
        this.data = this.transactionsCount ? this.transactions : [];

        this.loadTransactions();
      });
  }

  ngAfterViewInit(): void {
    this.transactionsService.getSelectedBlock()
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedBlock: number | undefined): void => {
        this.params.selected = selectedBlock;
        // Set total count if selected is visible;
        this.transactionsCount = this.transactionsCounts && selectedBlock ? this.transactionsCounts[selectedBlock] : 0;

        // If the user selects other block, reset back to the first page.
        if (this.paginator) {
          this.paginator.pageIndex = 0;
        }

        this.loadTransactions();
      });

    this.paginator?.page
      .pipe(
        startWith({}),
        takeUntil(this.destroy$),
      )
      .subscribe((): void => (this.loadTransactions()));
  }

  private loadTransactions(): void {
    if (this.paginator && this.params.selected && this.transactionsCount > 0) {
      this.activeRequests++;

      this.transactionsService.loadTransactions({
        level: this.params.selected,
        page: this.paginator.pageIndex,
        limit: this.paginator.pageSize,
        fields: this.columns.toString(),
      });
    }
  }
}
