import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataFiltersComponent} from './data-filters.component';
import {FilterModule} from "@pup/components/filter/filter.module";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    DataFiltersComponent
  ],
  exports: [
    DataFiltersComponent
  ],
  imports: [
    CommonModule,
    FilterModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DataFiltersModule {
}
