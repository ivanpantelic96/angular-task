import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import axios from 'axios';
import { MissingFieldsResponse } from '../types/api-response.type';

@Injectable({ providedIn: 'root' })
export class FormFieldService {
  private apiUrl = 'http://localhost:4200/required-fields.json';

  constructor() {}

  getFormFields(): Observable<MissingFieldsResponse> {
    return new Observable(observer => {
      axios.get(this.apiUrl)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

}