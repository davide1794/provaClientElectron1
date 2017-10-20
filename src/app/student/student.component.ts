import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Student} from 'prova-esse3';
import {StudentService} from '../student.service';
import {StudentsSocketService} from "../students-socket.service";
import {WebsocketService} from "../websocket.service";


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [ WebsocketService, StudentsSocketService ]
})
export class StudentComponent implements OnInit {

  students: Student[];
  newStudent: Student;
  form: FormGroup;
  query ="";

  constructor(private studentService: StudentService, private fb: FormBuilder, private studentsSocketService: StudentsSocketService) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthYear: ['', Validators.required]
    });
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

  createStudent(): void {
    this.newStudent.firstName = this.form.value.firstName;
    this.newStudent.lastName = this.form.value.lastName;
    this.newStudent.birthYear = this.form.value.birthYear;
    this.studentService.createStudent(this.newStudent)
      .then(() => this.getStudents());
    this.form.reset();
  }

  deleteStudent(student: Student): void {
    this.studentService.deleteStudent(student);
    this.students = this.students.filter(element => element !== student);
  }

}
