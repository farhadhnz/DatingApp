import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/Alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../_models/user';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm!: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if (this.editForm.dirty)
      $event.returnValue = true;
  }
  user!: User;
  constructor(private route:ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile Updated Successfully!');
      this.editForm.reset(this.user);

    }, error => {
      this.alertify.error(error);
    })
  }
}
