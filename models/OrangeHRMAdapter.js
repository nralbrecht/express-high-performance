import { XMLHttpRequest } from "xmlhttprequest";
import { toXWwwFormUrlencoded, jsonToArray} from "../util/Transformer";

function createToken() {
    const tokenData = {
        "client_id": 'tom',
        "client_secret": 'tom123',
        "grant_type": 'client_credentials'
    };

    return new Promise(function (resolve, reject) {
        const url = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/oauth/issueToken";
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
        xhr.onload = function () {
            const token = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                resolve(token);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.send(toXWwwFormUrlencoded(tokenData));
    })
}

function getAllSalesmen() {
    return createToken().then(token => {
        return new Promise(function (resolve, reject) {
            const url = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search";
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
            xhr.send();

            xhr.onload = function () {
                const employeesJSON = JSON.parse(xhr.responseText);

                if (xhr.status === 200) {
                    // transform json into array for filtering
                    const employeesArray = jsonToArray(employeesJSON);

                    const salesMen = employeesArray[0][1]
                        .filter((user) => {
                            return user.unit === 'Sales'} )
                        .map((user) => {
                            return {
                                "sid": user.code,
                                "employeeId": user.employeeId,
                                "unit": user.unit,
                                "jobTitle": user.jobTitle,
                                "firstName": user.firstName,
                                "middleName": user.middleName,
                                "lastName": user.lastName,
                                "fullName": user.fullName
                            }
                        });
                    resolve(salesMen);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
        });
    });
}

function getSalesmenById(sid) {
    return createToken().then(token => {
        return new Promise(function (resolve, reject) {
            const url = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php/api/v1/employee/search";
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
            xhr.send();

            xhr.onload = function () {
                const employeesJSON = JSON.parse(xhr.responseText);

                if (xhr.status === 200) {
                    // transform json into array for filtering
                    const employeesArray = jsonToArray(employeesJSON);
                    const salesMen = employeesArray[0][1]
                        .filter((user) => {
                            return user.unit === 'Sales' && user.code === sid.toString()} )
                        .map((user) => {
                            return {
                                "sid": user.code,
                                "employeeId": user.employeeId,
                                "unit": user.unit,
                                "jobTitle": user.jobTitle,
                                "firstName": user.firstName,
                                "middleName": user.middleName,
                                "lastName": user.lastName,
                                "fullName": user.fullName
                            }
                        });
                    resolve(salesMen);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
        });
    });
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
