
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule ],
    declarations: [ AppComponent, DialogBoxComponent ],
    bootstrap:    [ AppComponent ]
  })
  export class AppModule { }
