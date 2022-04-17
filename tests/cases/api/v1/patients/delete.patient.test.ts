import supertest = require("supertest");
import { expect } from 'chai';
import app from '../../../../../src/app';

const endpoint = '/api/v1/patients/';

describe(`[DELETE]  ${endpoint}:patientID`, () => {

    it('Validation should not pass: Error 400 - Bad Request', async () => {

        const response = await supertest(app)
            .delete(endpoint + '7abla')
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(400);
    });

    it('Patient should be not found in DB: Error 404', async () => {

        const response = await supertest(app)
            .delete(endpoint + 123456)
            .set('Content-Type', 'application/json')

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(404);
    });

    it('Response should delete one patient: Status 200', async () => {

        const response = await supertest(app)
            .delete(endpoint + 123)
            .set('Content-Type', 'application/json')

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(200);
    });
});