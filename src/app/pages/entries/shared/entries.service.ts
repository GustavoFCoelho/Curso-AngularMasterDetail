import {Injectable, Injector} from '@angular/core';
import {Entry} from './Entry';
import {CategoryService} from '../../categories/shared/category.service';
import {BaseResourceService} from '../../../shared/service/base-resource.service';
import {Observable} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class EntriesService extends BaseResourceService<Entry>{
  constructor(protected injector: Injector, protected categoryService: CategoryService) {
    super("entrada/", injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToService(entry, super.create.bind(this))

  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToService(entry, super.update.bind(this))
  }

  private setCategoryAndSendToService(entry:Entry, sendFn: (entry) => Observable<Entry>): Observable<Entry>{
    return this.categoryService.getById(entry.categoryId).pipe(flatMap(value => {
      entry.category = value;
      return sendFn(entry);
    }), catchError(this.handleError));
  }

  getByMonthAndYear(month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
    return entries.filter(value => {
      const entryDate = moment(value.date, "DD/MM/YYYY");
      if(entryDate.month() + 1 == month && entryDate.year() == year){
        return value;
      }
    });
  }
}
