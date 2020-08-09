import {NgModule} from '@angular/core';

import {EntriesRoutingModule} from './entries-routing.module';
import {EntriesListComponent} from './entries-list/entries-list.component';
import {EntryFormComponent} from './entry-form/entry-form.component';
import {CalendarModule} from 'primeng/calendar';
import {IMaskModule} from 'angular-imask';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [EntriesListComponent, EntryFormComponent],
  imports: [
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule,
    SharedModule
  ]
})
export class EntriesModule {
}
