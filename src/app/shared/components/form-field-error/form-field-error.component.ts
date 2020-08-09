import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
      {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') formControl: FormControl;

  constructor() {
  }

  ngOnInit() {
  }

  get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private mustShowErrorMessage() {
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null {
    if(this.formControl.errors.required){
      return "Dado Obrigatório"
    } else if (this.formControl.errors.minlength){
      return `Deve ter no mínimo ${this.formControl.errors.minlength.requiredLength} carateres`
    } else if (this.formControl.errors.maxlength){
      return `Deve ter no máximo ${this.formControl.errors.maxlength.requiredLength} carateres`
    }
  }
}
