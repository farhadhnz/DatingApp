import { AlertifyService } from './../_services/Alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model)
     .subscribe(() => {
      this.alertify.success('registration successful');
     }, error => {
      this.alertify.error(error);
     });
  }

  cancel(){
    this.cancelRegister.emit(false);
    // this.alertify.success('cancelled');
  }

}
