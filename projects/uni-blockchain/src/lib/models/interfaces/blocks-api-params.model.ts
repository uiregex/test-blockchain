import { SortDirection } from '@angular/material/sort';

export interface BlocksApiParams {
  limit: number;
  page: number;
  sort: string;
  order: SortDirection;
  fields: string;
}
