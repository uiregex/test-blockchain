import { UniObject } from '../primitives/object.model';
import { UniRestApiRequestOptions } from './rest-api-request-options.model';


export interface UniRestApiOptions {
  urlParameters: UniObject<string>;
  request: Partial<UniRestApiRequestOptions>;
}
