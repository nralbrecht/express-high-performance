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
            throw new Error("unexpected accountRating (" + order.customer.accountRating + ")");
        }
    }
    return totalOrderBonus;
}

function calculateSocialTotal(socialCriteria) {
    let totalSocialBonus = 0;
    for (const social of socialCriteria) {
        if ((social.actualValue / social.targetValue) >= 1.25) {
            totalSocialBonus += 100;
        }
        else if ((social.actualValue / social.targetValue) >= 1.0) {
            totalSocialBonus += 50;
        }
        else if ((social.actualValue / social.targetValue) >= 0.75) {
            totalSocialBonus += 20;
        }
        else if ((social.actualValue / social.targetValue) >= 0.50) {
            totalSocialBonus += 10;
        }
    }
    return totalSocialBonus;
}

export {
    calculateTotal,
    calculateOrdersTotal,
    calculateSocialTotal
}
