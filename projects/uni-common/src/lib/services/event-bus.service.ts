import { Injectable } from "@angular/core";

import { Observable, ReplaySubject } from "rxjs";
import { filter } from "rxjs/operators";

import { UniNameValue } from "../models/interfaces/primitives/name-value.model";


@Injectable({providedIn: 'root'})
export class UniEventBusService {

  private eventBus = new ReplaySubject<UniNameValue>(1);
  private eventBusChanged$: Observable<UniNameValue<string, unknown>> = this.eventBus.asObservable();

  // Usage:
  // myEvent$ = this.eventBus.event('myEvent')
  // myEvent$.pipe(take(...)).subscribe(...)
  event(name: string) {
    return this.eventBusChanged$.pipe(filter((event: UniNameValue): boolean => event.name === name));
  }

  // Usage: this.eventBus.emit({ name: string, value: unknown });
  emit(event: UniNameValue<string, unknown>) {
    this.eventBus.next(event);
  }
}
