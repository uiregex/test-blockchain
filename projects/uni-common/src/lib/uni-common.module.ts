import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UniRestApiService } from './services/rest-api.service';
import { UniLocalStorageService } from './services/local-storage.service';
import { UniWindowRefService } from './services/window-ref.service';
import { UniEventBusService } from './services/event-bus.service';
import { UniSessionStorageService } from './services/session-storage.service';
import { UniErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { UniErrorHandlerService } from './services/error-handler.service';


@NgModule({
  providers: [
    UniRestApiService,
    UniEventBusService,
    UniWindowRefService,
    UniLocalStorageService,
    UniSessionStorageService,
    UniErrorHandlerService,
    { provide: HTTP_INTERCEPTORS, useClass: UniErrorHandlerInterceptor, multi: true },
  ],
})
export class UniCommonModule {
}
