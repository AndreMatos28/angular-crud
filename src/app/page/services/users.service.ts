import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../model/user';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private storage: Storage;
  private api = 'http://localhost:3000/users';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.storage = window.localStorage;
  }

  set(key: string, value: User) {21
    this.storage.setItem(key, JSON.stringify(value));
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  /////////////////////////////////////////////////////////////////////////////

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

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/'], { relativeTo: this.route });
  }
}

/*
[  {
      "id": 1099180166,
      "nome": "Ericka Grimes",
      "idade": 15,
      "cpf": 1118699905
    },
    {
      "id": 1026945914,
      "nome": "Lydia Gentry",
      "idade": 26,
      "cpf": 1199140827
    },
    {
      "id": 1147452095,
      "nome": "Toni Brock",
      "idade": 69,
      "cpf": 1135508626
    },
    {
      "id": 1173639254,
      "nome": "Dickerson Gibson",
      "idade": 27,
      "cpf": 1179982391
    },
    {
      "id": 1160901050,
      "nome": "Angelita Carpenter",
      "idade": 33,
      "cpf": 1133002155
    },
    {
      "id": 1081690902,
      "nome": "Faulkner Greer",
      "idade": 17,
      "cpf": 1103103805
    },
    {
      "id": 1084229969,
      "nome": "Pitts Rush",
      "idade": 58,
      "cpf": 1096610967
    },
    {
      "id": 1059717128,
      "nome": "Lee Parrish",
      "idade": 18,
      "cpf": 1189607975
    },
    {
      "id": 1149064367,
      "nome": "Cynthia Waters",
      "idade": 37,
      "cpf": 1065593646
    },
    {
      "id": 1054238552,
      "nome": "Chan Salazar",
      "idade": 72,
      "cpf": 1205561706
    }
]
 */
