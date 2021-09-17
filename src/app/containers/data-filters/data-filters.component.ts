import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from "@pup/services/data.service";
import {Filter, FilterOperator} from "@pup/interfaces/filter";
import {FiltersListService} from "@pup/services/filters-list.service";

const defaultFilter: Filter = {
  columnName: '',
  operator: FilterOperator.Contains,
  value: ''
};

@Component({
  selector: 'pup-data-filters',
  templateUrl: './data-filters.component.html',
  styleUrls: ['./data-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataFiltersComponent implements OnInit {
  public readonly columnNames$ = this.dataService.getColumnNames$;
  public filters: Filter[] = [];

  constructor(
    private readonly dataService: DataService,
    private readonly filtersListService: FiltersListService,
  ) { }

  ngOnInit(): void {
    this.filtersListService.filters$.subscribe((filters) => this.filters = filters);
  }

  createFilter(): void {
    this.filters = this.filters.concat(defaultFilter);
  }

  deleteFilter(index: number): void {
    const newFilters = [...this.filters];
    newFilters.splice(index, 1);
    this.filters = newFilters;
  }

  filterChange(filter: Filter, index: number): void {
    const newFilters = [...this.filters];
    newFilters[index] = filter;
    this.filters = newFilters;
  }

  saveFilters(): void {
    this.filtersListService.setFilters(this.filters);
  }

  trackByFilter(index: number): string {
    return `${index}`;
  }
}
