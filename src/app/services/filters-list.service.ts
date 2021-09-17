import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Filter} from "@pup/interfaces/filter";

const defaultFilters: Filter[] = [];

@Injectable({
  providedIn: 'root'
})
export class FiltersListService {
  public readonly filters$: Observable<Filter[]>;

  private readonly filtersSubject = new BehaviorSubject<Filter[]>(defaultFilters);
  private filters: Filter[] = defaultFilters;

  constructor() {
    this.filters$ = this.filtersSubject.asObservable();
  }

  setFilters(filters: Filter[]): void {
    this.filters = [...filters];
    this.filtersSubject.next(this.filters);
  }
}
