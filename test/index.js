import regeneratorRuntime from "regenerator-runtime";

import { expect } from 'chai';
import { describe } from "mocha";
import sinon from "sinon";

import { getAllSalesmen } from "../src/server/adapters/OrangeHRMAdapter";

describe('HR service', function () {
    const openHrmBasePath = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';

    describe('HR service', function () {
        beforeEach(() => {
            this.server = sinon.createFakeServer();
        });

        afterEach(() => {
            this.server.restore();
        });

        it('should return all salesmen', async () => {
            this.server.respondWith("GET", openHrmBasePath + "/api/v1/employee/search",
                [200, { "Content-Type": "application/json" },
                '{"data":[{"firstName":"Mary-Ann","middleName":"","lastName":"Sallinger","code":"91337","employeeId":"30","fullName":"Mary-Ann Sallinger","status":null,"dob":"1989-01-07","driversLicenseNumber":"K1452","licenseExpiryDate":null,"maritalStatus":"Single","gender":"Female","otherId":"","nationality":"British","unit":"Sales","jobTitle":"Senior Salesman","supervisor":[{"name":"Michael Moore","id":"8"}]},{"firstName":"John","middleName":"Steven","lastName":"Smith","code":"90123","employeeId":"7","fullName":"John Steven Smith","status":null,"dob":"1981-05-06","driversLicenseNumber":"K2333","licenseExpiryDate":null,"maritalStatus":"Single","gender":"Male","otherId":"","nationality":"British","unit":"Sales","jobTitle":"Senior Salesman","supervisor":[{"name":"Michael Moore","id":"8"}]}],"rels":[]}']);

            const salesmen = await getAllSalesmen();

            expect(salesmen).to.have.same.deep.members([
                {
                    sid: '91337',
                    employeeId: '30',
                    unit: 'Sales',
                    jobTitle: 'Senior Salesman',
                    firstName: 'Mary-Ann',
                    middleName: '',
                    lastName: 'Sallinger',
                    fullName: 'Mary-Ann Sallinger'
                },
                {
                    sid: '90123',
                    employeeId: '7',
                    unit: 'Sales',
                    jobTitle: 'Senior Salesman',
                    firstName: 'John',
                    middleName: 'Steven',
                    lastName: 'Smith',
                    fullName: 'John Steven Smith'
                }
            ]);
        });

        it('should only return salesmen', async () => {
            this.server.respondWith("GET", openHrmBasePath + "/api/v1/employee/search",
                [200, { "Content-Type": "application/json" },
                '{"data":[{"firstName":"Michael","middleName":"","lastName":"Moore","code":"90001","employeeId":"8","fullName":"Michael Moore","status":null,"dob":null,"driversLicenseNumber":"","licenseExpiryDate":null,"maritalStatus":null,"gender":null,"otherId":"","nationality":null,"unit":"Board","jobTitle":"CEO","supervisor":null},{"firstName":"Mary-Ann","middleName":"","lastName":"Sallinger","code":"91337","employeeId":"30","fullName":"Mary-Ann Sallinger","status":null,"dob":"1989-01-07","driversLicenseNumber":"K1452","licenseExpiryDate":null,"maritalStatus":"Single","gender":"Female","otherId":"","nationality":"British","unit":"Sales","jobTitle":"Senior Salesman","supervisor":[{"name":"Michael Moore","id":"8"}]},{"firstName":"John","middleName":"Steven","lastName":"Smith","code":"90123","employeeId":"7","fullName":"John Steven Smith","status":null,"dob":"1981-05-06","driversLicenseNumber":"K2333","licenseExpiryDate":null,"maritalStatus":"Single","gender":"Male","otherId":"","nationality":"British","unit":"Sales","jobTitle":"Senior Salesman","supervisor":[{"name":"Michael Moore","id":"8"}]}],"rels":[]}']);

            const salesmen = await getAllSalesmen();

            expect(salesmen).to.have.same.deep.members([
                {
                    sid: '91337',
                    employeeId: '30',
                    unit: 'Sales',
                    jobTitle: 'Senior Salesman',
                    firstName: 'Mary-Ann',
                    middleName: '',
                    lastName: 'Sallinger',
                    fullName: 'Mary-Ann Sallinger'
                },
                {
                    sid: '90123',
                    employeeId: '7',
                    unit: 'Sales',
                    jobTitle: 'Senior Salesman',
                    firstName: 'John',
                    middleName: 'Steven',
                    lastName: 'Smith',
                    fullName: 'John Steven Smith'
                }
            ]);
        });
    });
});
