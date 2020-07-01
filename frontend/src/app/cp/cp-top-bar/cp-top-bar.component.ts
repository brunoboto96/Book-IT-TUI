import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cp-top-bar',
  templateUrl: './cp-top-bar.component.html',
  styleUrls: ['./cp-top-bar.component.css']
})
export class CpTopBarComponent implements OnInit {
  username;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().toPromise().then(
			res => {
				this.username = res['user']['name'];
				console.log(this.username)
			},
			err => {
				console.log(err);

			}
		);
  }


  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['']);
  }

}
