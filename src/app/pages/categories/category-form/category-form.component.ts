import {AfterContentChecked, Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../shared/Category.model';
import {CategoryService} from '../shared/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {BaseResourceComponent} from '../../../shared/base-resource/base-resource.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceComponent<Category>{

  constructor(protected service:CategoryService, protected injector: Injector) {
    super(service, new Category(), injector, Category.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  protected creationPageTitle() {
    return "Cadastro de nova categoria"
  }

  protected editionPageTitle() {
    return `Editando Categoria: ${this.resource.name}`
  }

}
