import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UniErrorHandlerService {

  constructor(private router: Router) {
  }

  // @TODO refactor after receiving errors design
  handleErrors(error: HttpEvent<unknown>): Observable<HttpEvent<unknown>> {
    if (error instanceof HttpErrorResponse) {
      switch ((error as HttpErrorResponse).status) {
        case 401:
          this.router.navigateByUrl('login');
          break;
        case 403:
          this.router.navigateByUrl('login');
          break;
        case 404:
          return this.handleErrorWithNotifying(error, 'REQUEST_NOT_FOUND');
        case 422:
          return this.handleErrorWithNotifying(error);
        case 500:
          return this.handleErrorWithNotifying(error, 'ERROR_ON_SERVER_SIDE');
        default:
          return this.handleErrorWithNotifying(error, 'SOMETHING_WENT_WRONG');
      }
    }

    throw error;
  }

  // @TODO add UI notifications
  private handleErrorWithNotifying(error: HttpErrorResponse, errorKey: string = ''): Observable<never> {
    if (error) {
      alert(`${errorKey} ${error.message}`);
    }

    return throwError(() => new Error(error.message));
  }
}
