/**
 * Provides destroy$ observable for subclasses to use .takeUntil(this.destroy$)
 * Avoids having to keep up with so many subscriptions
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export abstract class RxUnsubscribe implements OnDestroy {

  destroy$: Subject<boolean> = new Subject();

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
