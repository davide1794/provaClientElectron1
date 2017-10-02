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
      .then(response => response.json().data as Student[]);
  }

}
