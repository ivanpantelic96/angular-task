export type FieldType = 'text' | 'date' | 'select';

export type FormFieldConfig =  {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  pattern?: string;
}
