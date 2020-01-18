import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

export interface Salesman {
  sid: number;
  firstName: string;
  lastName: string;
  jobTitle: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalesmenService {
  salesmen: Salesman[] = [];

  constructor(
    private authenticationService: AuthenticationService) { }

  async getSalesmen() {
    await this.loadSalesmen();
    return this.salesmen;
  }

  private async loadSalesmen() {
    const url = "http://localhost:8080/salesmen";
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${this.authenticationService.getCurrentUser().token}`
      }
    });
    const myJson = await response.json();

    myJson.forEach(salesman => {
      this.salesmen.push( {
        sid: salesman.sid,
        firstName: salesman.firstName,
        lastName: salesman.lastName,
        jobTitle: salesman.jobTitle,
        photo: salesman.photoBase64
      });
    });
  }

  async getSalesmanBySid(sid) {
    const url = "http://localhost:8080/salesmen/" + sid;
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${this.authenticationService.getCurrentUser().token}`
      }
    });
    const salesman = await response.json();

    return {
      sid: salesman.sid,
      firstName: salesman.firstName,
      lastName: salesman.lastName,
      jobTitle: salesman.jobTitle,
      photo: salesman.photoBase64
    };
  }
}
