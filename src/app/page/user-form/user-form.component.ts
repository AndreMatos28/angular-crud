import { UsersService } from './../services/users.service';

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form: FormGroup;

  //formeBuild tem a logica para criar form group

  constructor(private service: UsersService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nome: new FormControl(null, Validators.required),
      idade: new FormControl(null, Validators.required),
      cpf: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  justNumbers(event: any) {
    let charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  justLetters(event: any) {
    let charCode = event.which ? event.which : event.keyCode;
    if (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) 
    ) {
      return true;
    } else {
      return false;
    }
  }

  postar() {
    if (!this.form.valid) {
      console.log('Formulário inválido');
      return;
    }
    console.log('asd');
    console.log(this.form.value);
    console.log('Formulário válido', this.service.save(this.form.value));
  }
}
