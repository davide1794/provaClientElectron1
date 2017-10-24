import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Student} from 'prova-esse3';
import {StudentService} from "../service/student.service";
import { ipcRenderer } from 'electron';


@Component({
  selector: 'student-root',
  templateUrl: '../views/student.component.html',
  styleUrls: ['../styles/student.component.css']
})
export class StudentFormComponent {
  students: Student[];
  newStudent: Student;
  form: FormGroup;
  query = "";

  constructor(private studentService: StudentService, private fb: FormBuilder) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthYear: ['', Validators.required]
    });
  }

  createStudent(): void {
    this.newStudent.firstName = this.form.value.firstName;
    this.newStudent.lastName = this.form.value.lastName;
    this.newStudent.birthYear = this.form.value.birthYear;
    this.studentService.createStudent(this.newStudent)
      .then(() => ipcRenderer.send('windows-student-form-close'));
    this.form.reset();
  }
}
