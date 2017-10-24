import {Component, OnInit} from '@angular/core';
import {Student} from 'prova-esse3';
import {StudentService} from '../service/student.service';
import {StudentsSocketService} from "../service/students-socket.service";
import {WebsocketService} from "../service/websocket.service";
import * as electron from 'electron';
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

  constructor(private studentService: StudentService, private studentsSocketService: StudentsSocketService) { }

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
