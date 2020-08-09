import {Category} from '../../categories/shared/Category.model';
import {BaseResourceModel} from '../../../shared/models/base-resource.model';

export class Entry extends BaseResourceModel{
  id: number;
  name: string;
  description: string;
  type: string;
  amount: string;
  date: string;
  paid: boolean;
  categoryId: number;
  category: Category;

  constructor() {
    super();
  }

  static types = {
    expense: 'Despesa',
    revenue: 'Receita'
  };

  getPaidText(): string {
    return this.paid ? 'Pago' : 'Pendente';
  }

  static fromJson(data:any): Entry{
    return Object.assign(new Entry(), data);
  }
}
