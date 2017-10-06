import { Component, OnInit } from '@angular/core';
import {Student} from '../student';
import {StudentService} from '../student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: Student[];
  newStudent: Student;

  constructor(private studentService: StudentService) { }

  getStudents(): void {
    this.studentService
      .getStudents()
      .then(students => this.students = students);
  }

  ngOnInit() {
    this.newStudent = new Student();
    this.getStudents();
  }

  createStudent(newStudent): void {
    this.studentService.createStudent(newStudent)
      .then(student => this.students.concat(student));
  }

}
