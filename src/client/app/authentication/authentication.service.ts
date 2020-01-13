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

    if (userResponse.ok) {
      let user = await userResponse.json();

      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;

        return true;
      }
    }

    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  isAuthenticated() {
    return !!this.currentUser && (this.currentUser.exp - Math.floor(Date.now() / 1000)) > 0;
  }

  getCurrentUser() {
    if (this.isAuthenticated()) {
      return this.currentUser;
    }
    else {
      return null;
    }
  }
}
