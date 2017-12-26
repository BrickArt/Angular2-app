import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../shared/servises/users.service';
import { User } from '../../shared/models/user.model';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'tim-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup
  

  constructor(
    private usersService: UsersService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Регистрация');
    meta.addTags([
      {name: 'keywords', content: 'логин,регистрация,система'},
      {name: 'description', content: 'Страница для регистрации в системе'}

    ])
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
    console.log(this.form)
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    console.log(this.form)
    console.log('submit')
    this.usersService.createNewUser(user)
    .subscribe((user: User) => {
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      });
    });
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          console.log(user)
          if (user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null)
          }
        })
    })
  }


}
