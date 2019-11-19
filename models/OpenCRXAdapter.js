function getSalesmenIdentityById(sid) {
    // https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account?queryType=org:opencrx:kernel:account1:Contact&query=thereExistsGovernmentId().equalTo("90123")
    return "xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL";
}

function getOrdersBySalesmen(sid) {
    // https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder?query=thereExistsSalesRep().equalTo("xri://@openmdx*org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/9ENFSDRCBESBTH2MA4T2TYJFL")
    // order[i].customer[j].@href => get customer
    // order[i].@href + "/position/" => get positions
    //      - position[k].product.@href => get product
    return [
        {
            "clients": [
                {
                    "fullName": "Germania GmbH",
                    "accountRating": 3
                }
            ],
            "positions": [
                {
                    "quantity": "20.000000000",
                    "product": {
                        "description": "Hoover for big companies",
                        "productNumber": 1001,
                        "name": "HooverGo"
                    }
                }
            ]
        }
    ]
}

export {
    getOrdersBySalesmen
}
