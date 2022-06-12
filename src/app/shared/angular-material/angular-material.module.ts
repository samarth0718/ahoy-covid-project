import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {LayoutModule} from '@angular/cdk/layout';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 


@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class AngularMaterialModule { }
