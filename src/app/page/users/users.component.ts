import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  //users: User[] = [];
  users: Observable<User[]>;

  displayedColumns = ['id', 'nome', 'idade', 'cpf', 'act'];
  //usersService: UsersService;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.usersService = new UsersService();
    this.users = this.usersService.getAll();
  }

  ngOnInit(): void {}

  Cadastrar() {
    this.router.navigate(['/cadastrar'], { relativeTo: this.route });
  }

  removeUser(id: string) {
    this.usersService.remove('users', id);

    this.usersService.reload();
  }
}
