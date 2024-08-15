import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormSubmissionService } from '../services/form-submission.service';
import { FormFieldService } from '../services/form-field.service';
import { FormFieldConfig } from '../types/form-field.type';
import { MissingFieldsResponse } from '../types/api-response.type';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})

export class DynamicFormComponent implements OnInit {
  
  formFields: FormFieldConfig[] = [];
  formGroup: FormGroup;
  successMessage: string | null = null;
  errorMessage: { [key: string]: string } = {};
  fieldLabelMap: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder, 
    private formSubmissionService: FormSubmissionService,
    private formFieldService: FormFieldService) {
    this.formGroup = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.formFieldService.getFormFields().subscribe((response: MissingFieldsResponse) => {
      this.formFields = response.data.fields;
      this.buildForm();

      this.fieldLabelMap = this.formFields.reduce((map, field) => {
        map[field.key] = field.label;
        return map;
      }, {} as { [key: string]: string });
    });
  }


  buildForm(): void {
    const formControls: Record<string, FormControl> = {}; 
    
    this.formFields.forEach(field => {
      formControls[field.key] = new FormControl('', this.getValidators(field));
    });
  
    this.formGroup = this.formBuilder.group(formControls);
  }


  getValidators(field: FormFieldConfig): ValidatorFn[] {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.type === 'text' && field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }
    return validators;
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.formSubmissionService.submitForm(this.formGroup.value).subscribe(response => {
        this.successMessage = response.message;
        this.errorMessage = {}; 
        this.formGroup.reset();
      });
    } else {
      this.successMessage = null; 
      this.errorMessage = this.getFieldErrors(); 
    }
  }


  getFieldErrors(): { [key: string]: string } {
    const errors: { [key: string]: string } = {};
    const controls = this.formGroup.controls;

    for (const key in controls) {
      if (controls[key].invalid && controls[key].errors?.['required']) {
        errors[key] = `The ${this.fieldLabelMap[key]} field is required.`;
      }
    }

    return errors;
  }
  
}
