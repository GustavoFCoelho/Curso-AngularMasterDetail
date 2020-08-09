import {Component} from '@angular/core';
import {Entry} from '../shared/Entry';
import {EntriesService} from '../shared/entries.service';
import {BaseResourceListComponent} from '../../../shared/base-resource/base-resource-list.component';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css']
})
export class EntriesListComponent extends BaseResourceListComponent<Entry>{

  constructor(protected service:EntriesService) {
    super(service);
  }

}
