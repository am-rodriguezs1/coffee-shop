import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoffeeModule } from './coffee/coffee.module'; 
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [  
    AppComponent    
  ],
  imports: [
    BrowserModule,
    CoffeeModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
