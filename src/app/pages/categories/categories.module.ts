import {NgModule} from '@angular/core';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {CategoryFormComponent} from './category-form/category-form.component';
import {CategoriesRoutingModule} from './categories-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CategoriesListComponent, CategoryFormComponent],
  imports: [
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
