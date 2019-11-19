function getAllSalesmen() {
    // https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search
    // results gefiltert nach unit == "Sales"
    return [
        {
            "sid": "90123",
            "employeeId": "7",
            "unit": "Sales",
            "jobTitle": "Senior Salesman",
            "firstName": "John",
            "middleName": "Steven",
            "lastName": "Smith",
            "fullName": "John Steven Smith"
        }
    ]
}

function getSalesmenById(sid) {
    // https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search
    // results gefiltert nach unit == "Sales" && code == sid
    return [
        {
            "sid": "90123",
            "employeeId": "7",
            "unit": "Sales",
            "jobTitle": "Senior Salesman",
            "firstName": "John",
            "middleName": "Steven",
            "lastName": "Smith",
            "fullName": "John Steven Smith"
        }
    ]
}

function updateBonusGehalt(sid, newBonusGehalt) {
    // PUT https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/10/custom-field
    // Request Body:
    // fieldId:8
    // value:300
}

export {
    getAllSalesmen,
    getSalesmenById,
    updateBonusGehalt
}
