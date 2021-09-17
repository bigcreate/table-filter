import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {DataTableModule} from "./containers/data-table/data-table.module";
import {DataFiltersModule} from "./containers/data-filters/data-filters.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatSidenavModule,
    DataTableModule,
    DataFiltersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
