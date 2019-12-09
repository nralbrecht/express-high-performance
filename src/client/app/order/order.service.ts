import { Injectable } from '@angular/core';

export interface OrderEvaluation {
    orders: Order[];
    totalBonus: number;
}

export interface Order {
    activeOn: string;
    customer: Customer;
    positions: OrderPosition[];
}

export interface Customer {
    fullName: string;
    accountRating: number;
}

export interface OrderPosition {
    quantity: number;
    product: Product;
}

export interface Product {
    description: string;
    productNumber: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    async getOrdersBySidAndYear(sid: number, year: number) : Promise<OrderEvaluation> {
        const response = await fetch("http://localhost:8080/salesmen/" + sid + "/report/" + year + "/orders");

        return await response.json();
    }
}
