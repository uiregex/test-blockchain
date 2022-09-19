import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { UniRoutes } from '../models/interfaces/routes/routes.model';
import { UniObject } from '../models/interfaces/primitives/object.model';
import { UniRestApiOptions } from '../models/interfaces/rest/rest-api-options.model';
import { UniRequestData } from '../models/interfaces/rest/request-data.model';
import { UniRestApiRequestOptions } from '../models/interfaces/rest/rest-api-request-options.model';
import { UniLocalStorageService } from './local-storage.service';


@Injectable()
export class UniRestApiService {

  constructor(
    private http: HttpClient,
    private localStorage: UniLocalStorageService,
    @Inject('uniRoutesServiceModel') private uniRoutes: UniRoutes = {
      prod: { gateways: {}, urls: {} },
      mock: { urls: {} },
    },
  ) {
  }

  /*Protected API*/
  protected debug = this.localStorage.getItem('debug');

  /*Public API*/
  defaultHeaders: HttpHeaders = new HttpHeaders();

  get(url: string, options: Partial<UniRestApiOptions> = {}): Observable<any> {
    return this.getRequestByType({
      requestType: 'get',
      url,
      options,
    });
  }

  post(url: string, body: unknown = null, options: Partial<UniRestApiOptions> = {}): Observable<any> {
    return this.getRequestByType({
      requestType: 'post',
      url,
      body,
      options,
    });
  }

  put(url: string, body: unknown = null, options: Partial<UniRestApiOptions> = {}): Observable<any> {
    return this.getRequestByType({
      requestType: 'put',
      url,
      body,
      options,
    });
  }

  patch(url: string, body: unknown = null, options: Partial<UniRestApiOptions> = {}): Observable<any> {
    return this.getRequestByType({
      requestType: 'patch',
      url,
      body,
      options,
    });
  }

  delete(url: string, options: Partial<UniRestApiOptions> = {}): Observable<any> {
    return this.getRequestByType({
      requestType: 'delete',
      url,
      options,
    });
  }

  /*Private API*/
  private getRequestByType(data: UniRequestData): Observable<unknown> {
    let currentUrl = this.resolveUrl(data.url, data.options.urlParameters);
    let request$ = new Observable<unknown>();

    if (!data.options.request) {
      data.options.request = {};
    }

    this.setDefaultHeaders(data.options.request);

    if (this.debug) {
      request$ = this.http.get(currentUrl, data.options.request);
    } else {
      switch (data.requestType) {
        case 'get':
        case 'delete':
          request$ = this.http[data.requestType](currentUrl, data.options.request);
          break;
        case 'post':
        case 'put':
        case 'patch':
          request$ = this.http[data.requestType](currentUrl, data.body, data.options.request);
          break;
      }
    }

    return request$.pipe(
      catchError(error => throwError(() => new Error(error))),
      finalize(() => null),
    );
  }

  private setDefaultHeaders(requestOptions: Partial<UniRestApiRequestOptions>): void {
    const defaultHeaders: HttpHeaders = this.defaultHeaders;
    requestOptions.headers = requestOptions.headers ? requestOptions.headers : new HttpHeaders();

    defaultHeaders.keys().forEach((key: string) => {
      const header = defaultHeaders.get(key);

      if (header) {
        requestOptions.headers = requestOptions.headers?.set(key, header);
      }
    });
  }

  private resolveUrl(url: string, options?: UniObject<string>): string {
    let path = this.debug ? this.uniRoutes.mock.urls[url] : this.uniRoutes.prod.urls[url];

    if (options) {
      for (let key in options) {
        path = path.replace('{' + key + '}', options[key]);
      }
    }

    return encodeURI(path);
  }
}
