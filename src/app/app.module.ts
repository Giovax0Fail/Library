import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablebackgroundComponent } from './tablebackground/tablebackground.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InsertFormBackgroundComponent } from './insert-form-background/insert-form-background.component';
import { SharedModule } from './shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { LoaderComponent } from './loader/loader.component'; // Aggiungi questa importazione
import { LoaderInterceptor } from './services/interceptors/loader.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    TablebackgroundComponent,
    TableComponent,
    FormComponent,
    DashboardComponent,
    InsertFormBackgroundComponent,
    SearchComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule, // Aggiungi questo modulo
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
