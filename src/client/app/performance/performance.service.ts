import { Injectable } from '@angular/core';
import { OrderService, OrderEvaluation } from "../order/order.service";

export interface PerformanceRecord {
  sid: number;
  year: number;
  state: string;
  orders: OrderEvaluation;
  social: SocialEvaluation;
  remarks: string;
}

export interface SocialEvaluation {
  criteria: SocialCriterion[];
  totalBonus: number;
}

export interface SocialCriterion {
  actualValue: number;
  description: string;
  goalId: number;
  targetValue: number;
  bonus: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  // descriptions for social evaluation records
  socialDescription = {
    '1': 'Leadership Competence',
    '2': 'Openness to Employee',
    '3': 'Social Behaviour to Employee',
    '4': 'Attitude towards Client',
    '5': 'Communication Skills',
    '6': 'Integrity to Company'
  };

  constructor(private orderService: OrderService) { }

  async getYearsBySid(sid: number) {
    const url = "http://localhost:8080/salesmen/" + sid + "/report";
    const response = await fetch(url);
    const reports = await response.json();

    const years = [];
    reports.forEach(report => {
      years.push(report.year);
    });
    return years.sort((a, b) => {return b - a});
  }

  async getPerformanceRecordBySidAndYear(sid: number, year: number) {
    // get state and remarks
    const urlReport = "http://localhost:8080/salesmen/" + sid + "/report/" + year;
    const responseReport = await fetch(urlReport);
    const reportRecords = await responseReport.json();
    const state = reportRecords.state;
    const remarks = reportRecords.remark;

    // get orders
    const orders = await this.orderService.getOrdersBySidAndYear(sid, year);

    // get social
    const urlSocial = "http://localhost:8080/salesmen/" + sid + "/report/" + year + "/social";
    const responseSocial = await fetch(urlSocial);
    const socialRecords = await responseSocial.json();
    const criteriaWithDescription = [];

    socialRecords.social.forEach(socialRecord => {
      const id = socialRecord.goalId;
      socialRecord.description = this.socialDescription[id];
      criteriaWithDescription.push(socialRecord);
    });

    const social = {
      criteria: criteriaWithDescription,
      totalBonus: socialRecords.totalBonus
    };

    // return PerformanceRecord
    return {
      sid: sid,
      year: year,
      state: state,
      orders: orders,
      social: social,
      remarks: remarks
    }
  }

  async updatePerformanceRecordBySidAndYear(sid: number, year: number, newGoals: SocialCriterion[]) {
    const urlSocial = "http://localhost:8080/salesmen/" + sid + "/report/" + year + "/social";
    const response = await fetch(urlSocial, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGoals.map(criteria => {
        return {
          "actualValue": criteria.actualValue,
          "goalId": criteria.goalId,
          "targetValue": criteria.targetValue
        }
      }))
    });

    return response.ok;
  }

  async updateReportBySidAndYear(sid: number, year: number, newRemark: string, newState: string) {
    const urlReport = `http://localhost:8080/salesmen/${sid}/report/${year}`;

    let response = await fetch(urlReport, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        state: newState,
        remark: newRemark
      })
    });

    return response.ok;
  }
}
