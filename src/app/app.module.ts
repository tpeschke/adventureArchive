import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdventureViewComponent } from './adventure-view/adventure-view.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { AdventureService } from './utils/adventure.service';
import { LoginService } from './utils/login.service';
import { AdventureAddComponent } from './adventure-add/adventure-add.component'

import { QuillModule } from 'ngx-quill';
import { EnvironConverterPipe } from './utils/environ-converter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdventureViewComponent,
    SearchResultsComponent,
    SearchHeaderComponent,
    AdventureAddComponent,
    EnvironConverterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    FormsModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot()
  ],
  providers: [AdventureService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
