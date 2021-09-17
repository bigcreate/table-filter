import {Injectable} from '@angular/core';
import {DataHttpService} from "@pup/services/data-http.service";
import {DataItem} from "@pup/interfaces/data";
import {map, shareReplay, tap} from "rxjs/operators";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {FiltersListService} from "@pup/services/filters-list.service";
import {Filter} from "@pup/interfaces/filter";
import {compare} from "@pup/utils/comparison";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public readonly getFilteredData$: Observable<DataItem[]>;
  public readonly getColumnNames$: Observable<string[]>;

  private readonly dataSubject = new BehaviorSubject<DataItem[]>([]);
  private readonly data$: Observable<DataItem[]> = this.dataSubject.asObservable();

  constructor(
    private readonly dataHttpService: DataHttpService,
    private readonly filtersListService: FiltersListService,
  ) {
    this.getFilteredData$ = combineLatest([this.data$, this.filtersListService.filters$]).pipe(
      map(([items, filters]) => items.filter((item) => this.filterData(item, filters))),
      shareReplay(1),
    );

    this.getColumnNames$ = this.data$.pipe(
      map((data) => this.getColumnNamesFromItem(data[0])),
      shareReplay(1),
    );
  }

  updateData(): Observable<DataItem[]> {
    return this.dataHttpService.getData().pipe(
      map((data) => Object.values<DataItem>(data)),
      tap((dataItems) => this.dataSubject.next(dataItems))
    );
  }

  private getColumnNamesFromItem(item: DataItem): string[] {
    if (item === undefined) {
      return [];
    }
    return Object.keys(item);
  }

  private filterData(item: DataItem, filters: Filter[]): boolean {
    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const itemValue = item[filter.columnName];
      if (itemValue === undefined) {
        continue;
      }
      const value = filter.value;
      const compareMethod = filter.operator;

      const result = compare(itemValue, value, compareMethod);
      if (!result) {
        return false;
      }
    }
    return true;
  }
}
