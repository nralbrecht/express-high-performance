import { XMLHttpRequest } from "xmlhttprequest";
import { toXWwwFormUrlencoded, jsonToArray} from "../util/Transformer";
import config from '../../../config'

function createToken() {
    const tokenData = {
        "client_id": config.ORANGEHRM_CREDENTIALS.client_id,
        "client_secret": config.ORANGEHRM_CREDENTIALS.client_secret,
        "grant_type": 'client_credentials'
    };

    return new Promise(function (resolve, reject) {
        const url = config.ORANGEHRM_BASE_PATH + "/oauth/issueToken";
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
            const url = config.ORANGEHRM_BASE_PATH + "/api/v1/employee/search";
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
            const url = config.ORANGEHRM_BASE_PATH + "/api/v1/employee/search";
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
            xhr.send();

            xhr.onload = async function () {
                const employeesJSON = JSON.parse(xhr.responseText);

                if (xhr.status === 200) {
                    // transform json into array for filtering
                    const employeesArray = jsonToArray(employeesJSON);
                    const salesMen = employeesArray[0][1]
                        .filter((user) => {
                            return user.unit === 'Sales' && user.code === sid.toString()
                        })
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

                    salesMen[0]["photoBase64"] = await getPhotoById(sid);
                    resolve(salesMen[0]);
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

async function updateBonusGehalt(sid, newBonusGehalt) {
    const bonusData = {
        "fieldId": 9,
        "value": newBonusGehalt
    };

    const employeeId = await getOrangeEmployeeIdBySid(sid);
    const token = await createToken();

    return new Promise(function (resolve, reject) {
        const url = config.ORANGEHRM_BASE_PATH + `/api/v1/employee/${employeeId}/custom-field`;
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        xhr.send(toXWwwFormUrlencoded(bonusData));

        xhr.onload = function () {
            const res = JSON.parse(xhr.responseText);

            if (xhr.status === 200) {
                resolve(res);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
    });
}

async function getPhotoById(sid) {
    const employeeId = await getOrangeEmployeeIdBySid(sid);
    const token = await createToken();

    return new Promise(function (resolve, reject) {
        const url = config.ORANGEHRM_BASE_PATH + `/api/v1/employee/${employeeId}/photo`;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
        xhr.send();

        xhr.onload = function () {
            const res = JSON.parse(xhr.responseText);
            const photo = res.data.base64;
            if (xhr.status === 200) {
                resolve(photo);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        }
    })
}

async function getOrangeEmployeeIdBySid(sid) {
    return createToken().then(token => {
        return new Promise(function (resolve, reject) {
            const url = config.ORANGEHRM_BASE_PATH + "/api/v1/employee/search";
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
                            return user.unit === 'Sales' && user.code === sid.toString()
                        })
                        .map((user) => {
                            return {
                                "employeeId": user.employeeId,
                            }
                        });
                    resolve(salesMen[0].employeeId);
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

export {
    getAllSalesmen,
    getSalesmenById,
    updateBonusGehalt,
    createToken
}
