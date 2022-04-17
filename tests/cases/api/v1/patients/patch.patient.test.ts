import supertest = require("supertest");
import { expect } from 'chai';
import app from '../../../../../src/app';

const endpoint = '/api/v1/patients/';

describe(`[PATCH]  ${endpoint}:patientID`, () => {

    it('Validation should not pass: Error 400 - Bad Request', async () => {
        const response = await supertest(app)
            .patch(endpoint + 'n22')
            .send({
                weight: 99,
                height: 170
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(400);
    });

    it('Patient should be not found in DB: Error 404', async () => {
        const response = await supertest(app)
            .patch(endpoint + 123456)
            .send({
                weight: 99,
                height: 170
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(404);
    });

    it('Patient with the same idNumber should be found in DB: Error 409', async () => {
        const response = await supertest(app)
            .patch(endpoint + 22)
            .send({
                weight: 99,
                height: 170,
                identificationNumber: "160920l30f2b"
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(409);
    });

    it('Diagnose should be not found in DB: Error 404', async () => {
        const response = await supertest(app)
            .patch(endpoint + 22)
            .send({
                weight: 99,
                height: 170,
                diagnoseID: 1565700
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(404);
    });

    it('Patient should be updated: Status 201', async () => {
        const response = await supertest(app)
            .patch(endpoint + 22)
            .send({
                weight: 99,
                height: 170,
                diagnoseID: 96
            })
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(201);
    });
});