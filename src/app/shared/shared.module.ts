import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { JsonpModule } from '@angular/http';

/* components */
import { CardComponent } from './components/card/card.component';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { CustomDataTableComponent } from './components/custom-data-table/custom-data-table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    JsonpModule,
  ],
  declarations: [
    CardComponent,
    CustomDataTableComponent
  ],
  exports: [
    CardComponent,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    CustomDataTableComponent
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class SharedModule { }
