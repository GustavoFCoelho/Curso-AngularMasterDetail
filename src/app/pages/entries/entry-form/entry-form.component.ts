import {Component, Injector, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {Entry} from '../shared/Entry';
import {EntriesService} from '../shared/entries.service';
import {Category} from '../../categories/shared/Category.model';
import {CategoryService} from '../../categories/shared/category.service';
import {BaseResourceComponent} from '../../../shared/base-resource/base-resource.component';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceComponent<Entry> implements OnInit{

  categorias: Category[];
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };
  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };

  constructor(protected service: EntriesService, protected categoryService: CategoryService, protected injector: Injector) {
    super(service, new Entry(), injector, Entry.fromJson)
  }

  ngOnInit() {
    super.ngOnInit()
    this.loadCategories()
  }

  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        };
      }
    );
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      date: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]],
    });
  }

  protected loadCategories() {
    this.categoryService.getAll().subscribe((categ)=>{
      this.categorias = categ;
    })
  }

  protected creationPageTitle() {
    return "Cadastro de novo Lançamento"
  }

  protected editionPageTitle() {
    return `Editando Lançamento: ${this.resource.name}`
  }
}
