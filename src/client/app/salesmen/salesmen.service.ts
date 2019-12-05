import { Injectable } from '@angular/core';

export interface Salesman {
    sid: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
}

@Injectable({
  providedIn: 'root'
})
export class SalesmenService {
    salesmen: Salesman[] = [];

    async getSalesmen() {
       await this.loadSalesmen();
       return this.salesmen;
    }

    private async loadSalesmen() {
        const url = "http://localhost:8080/salesmen";
        const response = await fetch(url);
        const myJson = await response.json();
        myJson.forEach(salesman => {
            this.salesmen.push( {
                sid: salesman.sid,
                firstName: salesman.firstName,
                lastName: salesman.lastName,
                jobTitle: salesman.jobTitle
            });
        });
    }

    async getSalesmanBySid(sid) {
        const url = "http://localhost:8080/salesmen/" + sid;
        const response = await fetch(url);
        const salesman = await response.json();
        return {
            sid: salesman.sid,
            firstName: salesman.firstName,
            lastName: salesman.lastName,
            jobTitle: salesman.jobTitle
        };
    }
}
