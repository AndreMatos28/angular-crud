import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { delay, Subject } from 'rxjs';

import { User } from '../model/user';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  subjectNotifier: Subject<null> = new Subject<null>();
  private storage: Storage;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.storage = window.localStorage;
  }

  set(key: string, value: User) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get() {
    const storage = JSON.parse(this.storage.getItem('users') as string);
    const users = storage === null ? [] : storage;
    // return JSON.parse(this.storage.getItem('users') as string);
    if (users.length <= 0) {
      return console.log('nada');
    }
    return users;
  }

  remove(key: string, value: string) {
    const users = this.get();

    for (let user of users) {
      if (user.id === value) {
        users.splice(users.indexOf(user), 1);
        this.set('users', users);
      }
    }


    // window.location.reload();
  }

  save(record: User) {
    const storage = JSON.parse(this.storage.getItem('users') as string);
    const users = storage === null ? [] : storage;
    const user = record;
    const idR = this.randomID();
    user['id'] = idR.toString();
    users.push(user);
    this.set('users', users);
  }

  randomID() {
    const now = Date.now();
    const pipe = new DatePipe('en-US');
    const dat = pipe.transform(now, 'medium')?.replace(/[^0-9]/g, '') as string;

    return dat;
  }

  reload () {
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';
     this.router.navigate(['/'], { relativeTo: this.route });
  }
}

//[{ "id": "1", "nome": "string", "cpf": "252525252552", "idade": "29" },{ "id": "2", "nome": "string", "cpf": "252525252552", "idade": "29" }]
