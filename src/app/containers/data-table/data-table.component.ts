import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {DataService} from "@pup/services/data.service";
import {DataItem} from "@pup/interfaces/data";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'pup-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) readonly sort!: MatSort;
  @ViewChild(MatPaginator) readonly paginator!: MatPaginator;

  displayedColumns$: Observable<string[]>;
  data$: Observable<DataItem[]>;
  dataSource = new MatTableDataSource();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly dataService: DataService,
  ) {
    this.dataService.updateData().subscribe();
    this.data$ = this.dataService.getFilteredData$;
    this.displayedColumns$ = this.dataService.getColumnNames$;
  }

  ngOnInit(): void {
    this.data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.dataSource.data = data;
      this.cdr.markForCheck();
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
