import { Injectable } from '@angular/core';
import {Student} from 'prova-esse3';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StudentService {

  private studentUrl = 'http://localhost:8080/students';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  getStudents(): Promise<Student[]> {
    return this.http.get(this.studentUrl)
      .toPromise()
      .then(response => response.json()._embedded.students as Student[]);
  }

  createStudent(student: Student): Promise<Student> {
    return this.http
      .post(this.studentUrl, JSON.stringify(student), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Student);
  }

  deleteStudent(student: Student): void {
    const url = student._links.self.href;
    this.http.delete(url, {headers: this.headers})
      .subscribe();
  }
}
