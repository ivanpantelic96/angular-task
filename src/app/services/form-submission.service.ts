import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SubmitFormError, SubmitFormResponse, UserFormData } from '../types/api-response.type';

@Injectable({ providedIn: 'root' })
export class FormSubmissionService {
  private apiUrl = 'https://localhost:4200/submit'; 

  constructor() {}

  submitForm(userFormData: UserFormData): Observable<SubmitFormResponse | SubmitFormError> {
    // Always return error since API doesn't exist.
    return from(
      axios.post(this.apiUrl, userFormData).then(response => {
        return {
          success: response.status === 200,
          message: 'Form submitted successfully',
        };
      })
    ).pipe(
      catchError(error => {
        return of({
          success: false,
          message: `Failed to submit form (API doesn't exist)`,
          error: error.message
        });
      })
    );
  }
}
