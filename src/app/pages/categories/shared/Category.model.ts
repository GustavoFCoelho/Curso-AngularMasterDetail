import {BaseResourceModel} from '../../../shared/models/base-resource.model';

export class Category extends BaseResourceModel{
  id: number;
  name: string;
  description: string;

  constructor() {
    super();
  }

  static fromJson(jsonData: any): Category{
    return Object.assign(new Category(), jsonData)
  }
}
