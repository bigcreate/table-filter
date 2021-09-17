import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Data} from "@pup/interfaces/data";
import data from "@assets/jsons/table_data.json";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataHttpService {
  getData(): Observable<Data> {
    return of(data as Data).pipe(
      delay(300)
    );
  }
}
