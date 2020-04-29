import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
          private router: Router,
          private route: ActivatedRoute,
          private userService: UserService
        ) {}

    ngOnInit(){

      this.getUserInfo();
    }

    getUserInfo(){

      this.userService.getUserDetails().subscribe(success => {

		    const out_data = success['data'];

        if(out_data)
        {
          this.router.navigate(['/user-page']);
        }
        else
        {
          window.location.href = "/users/sign_in";
        }
      });
  }

}
