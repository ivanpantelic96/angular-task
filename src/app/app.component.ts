import { Component } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [DynamicFormComponent, CommonModule]
})
export class AppComponent {}
