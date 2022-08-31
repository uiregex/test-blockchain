import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { UniCommonModule } from 'uni-common';
import { UniBlockchainModule } from 'uni-blockchain';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { apiRoutes } from './api-routes';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    StoreModule.forRoot({}, { metaReducers: [] }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !localStorage.getItem('debug') }),

    UniCommonModule,
    UniBlockchainModule,

    AppRoutingModule,
  ],
  declarations: [AppComponent],
  providers: [{ provide: 'uniRoutesServiceModel', useValue: apiRoutes }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
