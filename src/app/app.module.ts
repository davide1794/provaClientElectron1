import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StudentService } from './service/student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {SearchPipe} from './pipe/searchPipe';
import { StudentComponent } from './component/student.component';
import {WebsocketService} from "./service/websocket.service";
import {StudentsSocketService} from "./service/students-socket.service";
import {StudentFormComponent} from "./component/studentForm.component";

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    StudentFormComponent,
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
