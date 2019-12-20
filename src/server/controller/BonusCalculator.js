function calculateTotalBonus(ordersTotal, socialTotal) {
    return ordersTotal + socialTotal;
}

function calculateOrderBonus(order) {
    if (order.customer.accountRating == 3) {
        return 200;
    }
    else if (order.customer.accountRating == 2) {
        return 500;
    }
    else if (order.customer.accountRating == 1) {
        return 700;
    }
    else {
        throw new Error("unexpected accountRating (" + order.customer.accountRating + ")");
    }
}

function calculateOrdersTotalBonus(orders) {
    let totalOrderBonus = 0;

    for (const order of orders) {
        totalOrderBonus += order.bonus;
    }

    return totalOrderBonus;
}

function calculateSocialBonus(social) {
    if ((social.actualValue / social.targetValue) >= 1.25) {
        return 100;
    }
    else if ((social.actualValue / social.targetValue) >= 1.0) {
        return 50;
    }
    else if ((social.actualValue / social.targetValue) >= 0.75) {
        return 20;
    }
    else if ((social.actualValue / social.targetValue) >= 0.50) {
        return 10;
    }
    else if ((social.actualValue / social.targetValue) < 0.50) {
        return 0;
    }
    else {
        throw new Error("unexpected actualValue (" + social.actualValue + ")");
    }
}

function calculateSocialTotalBonus(criterions) {
    let totalSocialBonus = 0;

    for (const criterion of criterions) {
        totalSocialBonus += criterion.bonus;
    }

    return totalSocialBonus;
}

export {
    calculateTotalBonus,
    calculateOrdersTotalBonus,
    calculateOrderBonus,
    calculateSocialBonus,
    calculateSocialTotalBonus
}
