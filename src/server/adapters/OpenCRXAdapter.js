import fetch from "node-fetch"
import { Base64 } from 'js-base64';
import { calculateOrderBonus } from '../controller/BonusCalculator';

const CREDENTIALS = {
    "username": "guest",
    "password": "guest"
}

async function getJsonAuthorised(url) {
    const response = await fetch(url, {
        "method": "GET",
        "mode": "cors",
        "credentials": "include",
        "headers": {
            "Authorization": "Basic " + Base64.encode(CREDENTIALS.username + ":" + CREDENTIALS.password),
            "Accept": "application/json"
        },
        "redirect": "follow"
    });

    return await response.json();
}

async function getSalesmenIdentityById(sid) {
    const accountSearchUrl = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account?queryType=org:opencrx:kernel:account1:Contact&query=thereExistsGovernmentId().equalTo(\"" + sid + "\")";

    const accountResponse = await getJsonAuthorised(accountSearchUrl);

    if (accountResponse["@total"] < 1) {
        throw new Error("could not get identity for salesman(" + sid + ")");
    }
    else {
        return accountResponse.objects[0].identity;
    }
}

async function getOrdersBySalesmenAndYear(sid, year) {
    let resultObject = [];

    const salesmanIdentity = await getSalesmenIdentityById(sid);
    const salesOrdersUrl = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder?query=thereExistsSalesRep().equalTo(\"" + salesmanIdentity + "\")"

    const salesOrdersResponse = await getJsonAuthorised(salesOrdersUrl);

    for (const salesOrder of salesOrdersResponse.objects) {
        if (salesOrder.contractState != 1410
            || salesOrder.disabled
            || new Date(salesOrder.activeOn).getFullYear() != year) {

            continue;
        }

        const customerResponse = await getJsonAuthorised(salesOrder.customer["@href"]);

        let salesOrderResult = {
            "activeOn": salesOrder.activeOn,
            "customer": {
                "fullName": customerResponse.fullName,
                "accountRating": customerResponse.accountRating
            },
            "positions": []
        };

        const salesOrderPositionResponse = await getJsonAuthorised(salesOrder["@href"] + "/position");

        for (const position of salesOrderPositionResponse.objects) {
            const salesOrderPositionProductResponse = await getJsonAuthorised(position.product["@href"]);

            salesOrderResult.positions.push({
                "quantity": position.quantity,
                "product": {
                    "description": salesOrderPositionProductResponse.description,
                    "productNumber": salesOrderPositionProductResponse.productNumber,
                    "name": salesOrderPositionProductResponse.name
                }
            });
        }

        salesOrderResult.bonus = calculateOrderBonus(salesOrderResult);

        resultObject.push(salesOrderResult);
    }

    return resultObject;
}

export {
    getOrdersBySalesmenAndYear
}
