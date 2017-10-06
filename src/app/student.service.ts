import { Injectable } from '@angular/core';
import {Student} from './student';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StudentService {

  private studentUrl = 'http://localhost:8080/students';

  constructor(private http: Http) {}

  getStudents(): Promise<Student[]> {
    return this.http.get(this.studentUrl)
      .toPromise()
      .then(response => response.json()._embedded.students as Student[]);
  }

  createStudent(newStudent: Student): Promise<Student> {
    return this.http
      .post(this.studentUrl, JSON.stringify({newStudent}))
      .toPromise()
      .then(res => res.json()._embedded.student as Student);
  }

}
