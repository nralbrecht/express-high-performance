import SalesMen from "./SalesMen";

function createSalesMen(sid, firstName, lastName) {
    return new SalesMen(
        sid || 0,
        firstName || "Max",
        lastName || "Musterman"
    );
}

function createSalesMenFromObject(object) {
    return createSalesMen(
        object.sid,
        object.firstName,
        object.lastName);
}

function createDefaultSalesMen() {
    return createSalesMen({});
}

export default {
    createSalesMen,
    createSalesMenFromObject,
    createDefaultSalesMen,
}
