import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  authenticated;
  constructor(private user: UserService) { }

  ngOnInit() {
    this.authenticated = this.user.isLoggedIn()
    console.log(this.authenticated)
  }

}
