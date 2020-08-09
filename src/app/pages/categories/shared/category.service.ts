import {Injectable, Injector} from '@angular/core';
import {BaseResourceService} from '../../../shared/service/base-resource.service';
import {Category} from './Category.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category>{

  constructor(protected injector: Injector) {
    super("categoria/", injector, Category.fromJson)
  }

}
