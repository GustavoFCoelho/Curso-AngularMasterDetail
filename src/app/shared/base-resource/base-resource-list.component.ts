import {BaseResourceService} from '../service/base-resource.service';
import {BaseResourceModel} from '../models/base-resource.model';
import {Component, OnInit} from '@angular/core';

@Component({})
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit{
  resources:T[];
  constructor(protected service: BaseResourceService<T>) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(value => {
      this.resources = value.reverse();
    }, error => {
      alert('Erro ao carregar a lista');
    });
  }

  deleteResource(resource: T) {
    if (confirm('Deseja realmente excluir este item?')) {
      this.service.delete(resource.id).subscribe(() => {
        this.resources = this.resources.filter(element => element != resource);
      }, error => {
        alert('Erro na tentativa de exclusão');
      });
    }
  }
}
