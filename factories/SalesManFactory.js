import SalesMan from "./SalesMan";

function createSalesMan(sid, firstName, lastName, department) {
    return new SalesMan(
        sid || 0,
        firstName || "Max",
        lastName || "Musterman",
        department || "Sales"
    );
}

function createSalesManFromObject(object) {
    return createSalesMan(
        object.sid,
        object.firstName,
        object.lastName,
        object.department);
}

function createDefaultSalesMan() {
    return createSalesMan({});
}

export {
    createSalesMan,
    createSalesManFromObject,
    createDefaultSalesMan,
}
