import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

export interface SortPage extends Partial<Sort>, Partial<PageEvent> {
}
