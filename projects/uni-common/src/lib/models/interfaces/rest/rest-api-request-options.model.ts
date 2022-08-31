import { HttpHeaders, HttpParams } from '@angular/common/http';

import { UniObject } from '../primitives/object.model';
import { uniRequestObserveType } from '../../types/request-observe.type';
import { uniResponseType } from '../../types/response.type';


export interface UniRestApiRequestOptions {
  headers: HttpHeaders;
  observe: uniRequestObserveType;
  params: HttpParams | UniObject<string | number | boolean>;
  reportProgress: boolean;
  responseType: uniResponseType;
  withCredentials: boolean;
}
