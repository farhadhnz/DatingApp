import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/Alertify.service';
import { UserService } from '../_services/user.service';
import { User, UserResolved } from '../_models/user';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";

@Injectable()
export class MemeberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, 
        private router: Router,
        private authService: AuthService,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}