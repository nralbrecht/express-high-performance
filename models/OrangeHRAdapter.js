import { XMLHttpRequest } from "xmlhttprequest";

function createToken() {
    const tokenUrl = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken";

    const tokenData = {
        "client_id": 'tom',
        "client_secret": 'tom123',
        "grant_type": 'client_credentials'
    };
    // transform json into x-www-form-urlencoded
    let formBody = [];
    for (const property in tokenData) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(tokenData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", tokenUrl, true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
    xhr.send(formBody);

    xhr.onload = function () {
        const token = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
            console.table(token);
        } else {
            console.error(token);
        }
    };
}

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
    updateBonusGehalt,
    createToken
}
