import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UsersService } from '../../shared/servises/users.service';
import { User } from '../../shared/models/user.model';
import { Message } from '../../shared/models/message.model';
import { AuthService } from '../../shared/servises/auth.service';
import { fadeStateTrigger } from '../../shared/animations/fade.animation';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'tim-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.sass'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'логин,вход,система'},
      {name: 'description', content: 'Страница для входа в систему'}

    ])
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    
    this.route.queryParams
      .subscribe((params: Params) => {
        if(params['nowCanLogin']) {
          this.showMessage({
            text: 'Now you can login',
            type: 'success'
          })
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'You need login in system',
            type: 'warning'
          })
        }
      });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            console.log('login is success')
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({
              text: 'password not correct',
              type: 'danger'
          });
            
          }
        } else {
          this.showMessage({
            text: 'user not found',
            type: 'danger'})
        }
      })
  }

}
