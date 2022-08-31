import { UniRequestDataExt } from './request-data-ext.model';
import { UniRestApiOptions } from './rest-api-options.model';


export interface UniRequestData extends Partial<UniRequestDataExt> {
  url: string;
  options: Partial<UniRestApiOptions>;
}
