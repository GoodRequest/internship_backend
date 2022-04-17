import supertest = require("supertest");
import { expect } from 'chai';
import app from '../../../../../src/app';
import {onePatientFromDBSchema} from "../../../../../src/api/v1/patients/get.patient";

const endpoint = '/api/v1/patients/';

describe(`[GET]  ${endpoint}:patientID`, () => {

    it('Validation should not pass: Error 400 - Bad Request', async () => {

        const response = await supertest(app)
            .get(endpoint + '78a')
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(400);
    });

    it('Patient should be not found in DB: Error 404', async () => {

        const response = await supertest(app)
            .get(endpoint + 123456)
            .set('Content-Type', 'application/json')

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(404);
    });

    it('Response should return one patient: Status 200', async () => {

        const response = await supertest(app)
            .get(endpoint + 22)
            .set('Content-Type', 'application/json')

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(200);

        const validationResult = onePatientFromDBSchema.validate(response.body.patient);
        expect(validationResult.error).to.eq(undefined);
    });
});
