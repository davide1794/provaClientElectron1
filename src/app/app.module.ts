import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StudentService } from './student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {SearchPipe} from './searchPipe';
import { StudentComponent } from './student/student.component';
import {WebsocketService} from "./websocket.service";
import {StudentsSocketService} from "./students-socket.service";

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [StudentService, WebsocketService, StudentsSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
