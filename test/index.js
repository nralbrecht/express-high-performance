import regeneratorRuntime from "regenerator-runtime";

import { should, expect, assert } from 'chai';
import {describe} from "mocha";
const sinon = require('sinon');

import {request} from 'request';

import { readAll, Report } from "../src/server/models/ReportSchema";

import { getAllSalesmen } from "../src/server/adapters/OrangeHRMAdapter";
import { XMLHttpRequest } from "xmlhttprequest";

const base = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
/*
describe('HR service', function () {
    describe('HR service', function () {
        beforeEach(() => {
            console.log("Before each was called");
            this.xhr = sinon.useFakeXMLHttpRequest();
            console.log(xhr);
            console.log("******************");
            var requests = this.requests = [];

            this.xhr.onCreate = function (xhr) {
                //console.log("***ONCRESTR WSAS CALLED");
                //console.log(xhr);
                requests.push(xhr);
            };
        });

        it('should return all employees', async (done) => {
            var callback = sinon.spy();
            const salesmen = await getAllSalesmen();
            console.log(salesmen);
            assert.equal(1, this.requests.length);

            this.requests[0].respond(200, { "Content-Type": "application/json" },
                '[\n' +
                '                {\n' +
                '                    "sid": "913u37",\n' +
                '                    "employeeId": "30",\n' +
                '                    "unit": "Sales",\n' +
                '                    "jobTitle": "Senior Salesman",\n' +
                '                    "firstName": "Mary-Ann",\n' +
                '                    "middleName": "",\n' +
                '                    "lastName": "Sallinger",\n' +
                '                    "fullName": "Mary-Ann Sallinger"\n' +
                '                },\n' +
                '        {\n' +
                '            "sid": "90123",\n' +
                '            "employeeId": "7",\n' +
                '            "unit": "Sales",\n' +
                '            "jobTitle": "Senior Salesman",\n' +
                '            "firstName": "John",\n' +
                '            "middleName": "Steven",\n' +
                '            "lastName": "Smith",\n' +
                '            "fullName": "John Steven Smith"\n' +
                '        }\n' +
                '    ]');
            assert(callback.calledWith([
                {
                    "sid": "91337",
                    "employeeId": "30",
                    "unit": "Sales",
                    "jobTitle": "Senior Salesman",
                    "firstName": "Mary-Ann",
                    "middleName": "",
                    "lastName": "Sallinger",
                    "fullName": "Mary-Ann Sallinger"
                },
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
            ]));

        })


        afterEach(() => {
            this.xhr.restore();
        })
        // test cases

    });
});
*/
    /*
    describe('GET /api/v1/employees', function () {
        it('should return all employees', (done) => {
            var callback = sinon.spy();
            getAllSalesmen(callback);
            assert.equal(1, this.requests.length);

            this.requests[0].respond(200, { "Content-Type": "application/json" },
                '[\n' +
                '                {\n' +
                '                    "sid": "91337",\n' +
                '                    "employeeId": "30",\n' +
                '                    "unit": "Sales",\n' +
                '                    "jobTitle": "Senior Salesman",\n' +
                '                    "firstName": "Mary-Ann",\n' +
                '                    "middleName": "",\n' +
                '                    "lastName": "Sallinger",\n' +
                '                    "fullName": "Mary-Ann Sallinger"\n' +
                '                },\n' +
                '        {\n' +
                '            "sid": "90123",\n' +
                '            "employeeId": "7",\n' +
                '            "unit": "Sales",\n' +
                '            "jobTitle": "Senior Salesman",\n' +
                '            "firstName": "John",\n' +
                '            "middleName": "Steven",\n' +
                '            "lastName": "Smith",\n' +
                '            "fullName": "John Steven Smith"\n' +
                '        }\n' +
                '    ]');
            assert(callback.calledWith([
                {
                    "sid": "91337",
                    "employeeId": "30",
                    "unit": "Sales",
                    "jobTitle": "Senior Salesman",
                    "firstName": "Mary-Ann",
                    "middleName": "",
                    "lastName": "Sallinger",
                    "fullName": "Mary-Ann Sallinger"
                },
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
            ]));

        })
    });
});

*/


describe('HR service', function () {
    describe('HR service', function () {
        beforeEach(() => {
            this.get = sinon.stub(request, 'get');
            this.opeun = sinon.stub(XMLHttpRequest, 'opean');
        });
        afterEach(() => {
            XMLHttpRequest.restore();
        })
        // test cases
    });
    describe('when stubbed', function () {
        beforeEach(() => {
            const responseObject = {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json'
                }
            };
        });
        const responseBody =
            [
                {
                    "sid": "91337",
                    "employeeId": "30",
                    "unit": "Sales",
                    "jobTitle": "Senior Salesman",
                    "firstName": "Mary-Ann",
                    "middleName": "",
                    "lastName": "Sallinger",
                    "fullName": "Mary-Ann Sallinger"
                },
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
    ];

        this.open = sinon.stub(XMLHttpRequest, 'open');

    });

    describe('GET /api/v1/employees', function () {
        it('should return all employees', (done) => {
            this.open.yields(null, responseObject, JSON.stringify(responseBody));
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${base}/api/v1/employee/search`, true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
            xhr.onload = function () {
                xhr.status.should.eql(200);
                done();
            };

        })

    });
});


/*

describe("getUser", function () {
    it('should return a list of reports', function () {
        console.log("hi from rip");
        console.log(sinon);
       let myStub = sinon.stub(Report, 'find');
       myStub.yields();

      let realAllSpy = sinon.spy('readAll');
      readAll();
      console.log(realAllSpy.callCount());

      realAllSpy.restore();
    })
});


describe("getSalesmen", function () {
    it("should send list of salesmen", function () {
        let req = {};
        let res = {
            // replace empty function "send" with a spy
            send: sinon.spy()
        };
        // call the function
        SalesMenRouter.router.get('/90123', req, res);
        console.log(res.send);

        expect(res.send.calledOnce).to.be.true;
    })
});

 */

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });

});
