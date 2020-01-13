import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  returnUrl: string;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async login() {
    this.loading = true;

    try {
      const successful = await this.authenticationService.login(this.model.username, this.model.password);

      if (successful) {
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.loading = false;
        this.model = {};
      }
    } catch (error) {
      this.loading = false;
      this.model = {};
    }

  }
}
