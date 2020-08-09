import {Component} from '@angular/core';
import {CategoryService} from '../shared/category.service';
import {Category} from '../shared/Category.model';
import {BaseResourceListComponent} from '../../../shared/base-resource/base-resource-list.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent extends BaseResourceListComponent<Category> {

  constructor(protected service: CategoryService) {
    super(service);
  }

}
