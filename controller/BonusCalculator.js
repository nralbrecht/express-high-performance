function calculateTotal(ordersTotal, socialTotal) {
    return ordersTotal + socialTotal;
}

function calculateOrdersTotal(orders) {
    let totalOrderBonus = 0;
    for (const order of orders) {
        if (order.customer.accountRating == 3) {
            totalOrderBonus += 200;
        }
        else if (order.customer.accountRating == 2) {
            totalOrderBonus += 500;
        }
        else if (order.customer.accountRating == 1) {
            totalOrderBonus += 700;
        }
        else {
            throw new Error("unexprected accountRating (" + order.customer.accountRating + ")");
        }
    }
    return totalOrderBonus;
}

// TODO: implement
function calculateSocialTotal() {

}

export default {
    calculateTotal,
    calculateOrdersTotal,
    calculateSocialTotal
}
