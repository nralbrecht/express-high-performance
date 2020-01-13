import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: any = null;

  constructor() {
    if (localStorage.currentUser) {
      this.currentUser = JSON.parse(localStorage.currentUser);
    }
  }

  async login(username: string, password: string) {
    let userResponse = await fetch("http://localhost:8080/issueToken", {
      "method": "POST",
      "mode": "cors",
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
      },
      "body": JSON.stringify({ "username": username, "password": password }),
      "redirect": "follow"
    });

    let user = await userResponse.json();

    if (user && user.token) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUser = user;
    }

    return user;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUsername() {
    if (this.isAuthenticated() && this.currentUser.username) {
      return this.currentUser.username;
    }
    else {
      throw "not authenticated";
    }
  }
}
