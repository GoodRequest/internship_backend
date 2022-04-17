import supertest = require("supertest");
import { expect } from 'chai';
import app from '../../../../../src/app';

const endpoint = '/api/v1/patients/';

describe(`[POST]  ${endpoint}`, () => {

    it('Validation should not pass: Error 400 - Bad Request', async () => {
        const response = await supertest(app)
            .post(endpoint)
            .send({
                firstName: "Hector",
                lastName: "Berlioz",    //birthdate missing
                weight: 80,
                height: 170,
                identificationNumber: "abcd123456ef",
                gender: "male",
                diagnoseID: 96
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(400);
    });

    it('Diagnose should be not found in DB: Error 404', async () => {
        const response = await supertest(app)
            .post(endpoint)
            .send({
                firstName: "Hector",
                lastName: "Berlioz",
                birthdate: "11 December 1803",
                weight: 80,
                height: 170,
                identificationNumber: "abcd123456ef",
                gender: "male",
                diagnoseID: 96000   //bad ID
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(404);
    });

    it('Patient with the same idNumber should be found in DB: Error 409', async () => {
        const response = await supertest(app)
            .post(endpoint)
            .send({
                firstName: "Hector",
                lastName: "Berlioz",
                birthdate: "11 December 1803",
                weight: 80,
                height: 170,
                identificationNumber: "160920l30f2b",
                gender: "male",
                diagnoseID: 96
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(409);
    });

    it('New patient should be created: Status 201', async () => {

        const response = await supertest(app)
            .post(endpoint)
            .send({
                firstName: "Hector",
                lastName: "Berlioz",
                birthdate: "11 December 1803",
                weight: 80,
                height: 170,
                identificationNumber: "abcd123456ef",
                gender: "male",
                diagnoseID: 96
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(201);
        expect(response.body.id).to.eq(1024);
    });
});