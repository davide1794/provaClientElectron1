import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StudentService } from './student.service';
import { FormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { AppComponent } from './app.component';
import {SearchPipe} from './searchPipe';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
