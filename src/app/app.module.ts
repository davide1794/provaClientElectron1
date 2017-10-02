import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StudentService } from './student.service';

import { AppComponent } from './app.component';
import {Student} from './student';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
