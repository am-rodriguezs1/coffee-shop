import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';


@NgModule({
  declarations: [
    CoffeeListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CoffeeListComponent
  ],
})
export class CoffeeModule { }
