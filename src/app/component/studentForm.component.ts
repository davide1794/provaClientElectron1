import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Student} from 'prova-esse3';
import {StudentService} from "../service/student.service";
import { ipcRenderer } from 'electron';
import {StudentsSocketService} from "../service/students-socket.service";
const remote = require('electron').remote;


@Component({
  selector: 'student-root',
  templateUrl: '../views/studentForm.component.html',
  styleUrls: ['../styles/student.component.css']
})
export class StudentFormComponent {
  students: Student[];
  newStudent = new Student();
  form: FormGroup;
  private studentSocket: StudentsSocketService;

  constructor(private studentService: StudentService, private fb: FormBuilder) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthYear: ['', Validators.required]
    });
    this.studentSocket = remote.getGlobal('sharedObj').studentsSocketService;
  }

  createStudent(): void {
    this.newStudent.firstName = this.form.value.firstName;
    this.newStudent.lastName = this.form.value.lastName;
    this.newStudent.birthYear = this.form.value.birthYear;
    this.form.reset();
    this.studentSocket.messages.next(this.newStudent);
    this.studentService.createStudent(this.newStudent)
      .then(() => ipcRenderer.send('windows-student-form-close'));
  }
}
