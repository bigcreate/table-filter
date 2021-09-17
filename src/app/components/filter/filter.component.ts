import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Filter, FilterOperator} from "@pup/interfaces/filter";
import {Option} from "@pup/interfaces/option";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {filter, map, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'pup-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() set filter(value: Filter) {
    this.filterForm.setValue(value);
  }
  @Input() set columns(value: string[] | null) {
    this.columnOptions = (value || []).map((column) => (<Option<string>>{label: column, value: column}));
  };

  @Output() filterChanged = new EventEmitter<Filter>();

  // @Output() delete = new EventEmitter<void>();
  // @Output() save = new EventEmitter<void>();

  public columnOptions: Option<string>[] = [];
  public readonly operatorsOptions: Option<string>[] = Object.values(FilterOperator).map((operator) => ({label: operator, value: operator}));

  public readonly filterForm: FormGroup;

  public readonly columnNameControl = new FormControl('', [Validators.required]);
  public readonly operatorControl = new FormControl('', [Validators.required]);
  public readonly valueControl = new FormControl('');

  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.filterForm = new FormGroup(<Record<keyof Filter, FormControl>>{
      columnName: this.columnNameControl,
      operator: this.operatorControl,
      value: this.valueControl
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.pipe(
      filter(() => this.filterForm.valid),
      takeUntil(this.destroy$),
    ).subscribe((value: Filter) => this.filterChanged.emit(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
