import { FormFieldConfig } from "./form-field.type";

export type MissingFieldsResponse =  {
    status: string;
    statusCode: number;
    data: FormFieldsData;
  }

  export type FormFieldsData = {
    fields: FormFieldConfig[];
  }

export type SubmitFormResponse =  {
    success: boolean;
    message: string;
}
  
export type SubmitFormError = {
    success: boolean;
    message: string;
    error: string;
}

export type UserFormData  = {
    birthdate?: string;  
    birthplace?: string;
    sex?: string
    currentAddress?: string;
}
  
  