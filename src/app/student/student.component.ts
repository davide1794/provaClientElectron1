import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  form: FormGroup;

  constructor(private studentService: StudentService, @Inject(FormBuilder) fb: FormBuilder) {
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

}
