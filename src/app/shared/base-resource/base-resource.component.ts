import {AfterContentChecked, Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import toastr from 'toastr';

import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {BaseResourceModel} from '../models/base-resource.model';
import {BaseResourceService} from '../service/base-resource.service';

export abstract class BaseResourceComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder

  constructor(protected service: BaseResourceService<T>, public resource:T, protected injector:Injector, protected jsonDataResourceFn: (jsonData) => T) {
    this.route = injector.get(ActivatedRoute);
    this.formBuilder = injector.get(FormBuilder);
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }



  private loadResource() {
    if (this.currentAction == 'edit') {
      this.route.paramMap.pipe(switchMap(params => this.service.getById(+params.get('id')))).subscribe(resource => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
        }, (error) => alert('Ocorreu um erro no servidor! Tente novamente mais tarde')
      );

    }
  }

  private setPageTitle() {
    if (this.currentAction == 'new') {
      this.pageTitle = this.creationPageTitle();
    } else {
      this.pageTitle = this.editionPageTitle()
    }
  }

  protected abstract creationPageTitle()
  protected abstract editionPageTitle()

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  private createResource() {
    const resource: T = this.jsonDataResourceFn(this.resourceForm.value);
    this.service.create(resource).subscribe((resource) => {
      this.actionsForSuccess(resource);
    }, error => {
      this.actionsForError(error);
    });
  }

  private updateResource() {
    const resource: T = this.jsonDataResourceFn(this.resourceForm.value);
    this.service.update(resource).subscribe((resource) => {
      this.actionsForSuccess(resource);
    }, error => {
      this.actionsForError(error);
    });
  }

  private actionsForSuccess(resource: T) {
    toastr.success('Solicitação processada com Sucesso!');
    let baseComponentPath:string = this.route.snapshot.parent.url[0].path;
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(() => this.router.navigate([baseComponentPath, resource.id, 'edit']));
  }

  private actionsForError(error: any) {
    toastr.error('Ocorreu um erro ao processar a sua solicitação!');
    this.submittingForm = false;
    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por Favor, tente mais tarde'];
    }
  }

  protected abstract buildResourceForm(): void;
}
