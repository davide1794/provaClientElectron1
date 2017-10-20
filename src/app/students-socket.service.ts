import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import {Student} from 'prova-esse3';

const URL = 'ws://localhost:8080/name';

@Injectable()
export class StudentsSocketService {
  public studentsSocket: Subject<Student>;

  constructor(wsService: WebsocketService) {
    this.studentsSocket = <Subject<Student>>wsService
      .connect(URL)
      .map((response: MessageEvent): Student => {
        let data = JSON.parse(response.data);
        return {
          firstName: data.firstName,
          lastName: data.lastName,
          birthYear: data.birthYear
        };
      });
  }
}
