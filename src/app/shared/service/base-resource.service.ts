import {BaseResourceModel} from '../models/base-resource.model';
import {baseUrl} from '../../app.component';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected apiPath:string, protected injector: Injector, protected jsonDataToResourceFn: (jsonData) => T) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get(baseUrl + this.apiPath).pipe(
      map((jsonData:Array<any>) => this.jsonDataToResources(jsonData)),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<T> {
    return this.http.get(baseUrl + this.apiPath + id).pipe(
      map((jsonData:any) => this.jsonDataToResource(jsonData)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(baseUrl + this.apiPath, resource
    ).pipe(
      map((jsonData:any) => this.jsonDataToResource(jsonData)),
      catchError(this.handleError));
  }

  update(resource: T): Observable<T> {
    return this.http.put(baseUrl + this.apiPath + resource.id, resource).pipe(
      map((jsonData:any) => this.jsonDataToResource(jsonData)),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(baseUrl + this.apiPath + id).pipe(
      catchError(this.handleError),
    );
  }

  protected handleError(error: any) {
    console.log('ERRO NA REQUISIÇÃO ->', error);
    return throwError(error);
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(e => {
      resources.push(this.jsonDataToResourceFn(e));
    });
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

}
