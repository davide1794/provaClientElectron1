import {Component, OnInit} from '@angular/core';
import {Student} from 'prova-esse3';
import {StudentService} from '../service/student.service';
import {StudentsSocketService} from "../service/students-socket.service";
import {WebsocketService} from "../service/websocket.service";
import * as electron from 'electron';
import * as WebSocket from "ws";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Data} from "ws";
const ipcRenderer = electron.ipcRenderer;



@Component({
  selector: 'app-student',
  templateUrl: '../views/student.component.html',
  styleUrls: ['../styles/student.component.css'],
  providers: [ WebsocketService, StudentsSocketService ]
})
export class StudentComponent implements OnInit {

  students: Student[];
  newStudent: Student;
  form: FormGroup;
  private wsConnection: WebSocket;
  private wsURL: string = 'ws://localhost:8080/name';

  constructor(private studentService: StudentService, private fb: FormBuilder) {
    this.wsConnect();
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthYear: ['', Validators.required]
    });
  }

  private wsConnect() {
    this.wsConnection = new WebSocket(this.wsURL);
    this.wsConnection.on('open', () =>console.log("Aperta"));
    this.wsConnection.on('error', (err: Error) => console.log(err));
    this.wsConnection.on('message', (message) =>console.log(message.toString()));
  }

  private onMessage(data: Data) {
    /*this.newStudent = new Student();
    this.newStudent.firstName = data.firstName;
    this.newStudent.lastName = data.lastName;
    this.newStudent.birthYear = data.birthYear;

    this.students.push(this.newStudent);*/
  }


    createStudent(): void {
      this.newStudent.firstName = this.form.value.firstName;
      this.newStudent.lastName = this.form.value.lastName;
      this.newStudent.birthYear = this.form.value.birthYear;
      this.form.reset();
      this.studentService.createStudent(this.newStudent)
        .then(() => ipcRenderer.send('windows-student-form-close'));
  }


  getStudents(): void {
    this.studentService
      .getStudents()
      .then(students => this.students = students);
  }

  ngOnInit() {
    this.newStudent = new Student();
    this.getStudents();
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student);
    this.students = this.students.filter(element => element !== student);
  }

  openForm(): void {
    ipcRenderer.send('windows-student-form-active');
  }

}
