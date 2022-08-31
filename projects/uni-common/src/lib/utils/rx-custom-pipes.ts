import { Action } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, switchMap, filter } from 'rxjs/operators';


export const errorHandler = (name?: string, actions?: Action[]) => (source: Observable<any>) => source.pipe(
  catchError((error) => {
    console.error(`Error in: ${name}`, error);

    return actions ? of(null).pipe(
      switchMap(() => {
        console.warn(`Actions: ${JSON.stringify(actions)} were called!`);

        return actions;
      }),
    ) : of(null);
  }),
  filter(src => !!src),
);
