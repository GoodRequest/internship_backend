import supertest = require("supertest");
import { expect } from 'chai';
import app from '../../../../../src/app';
import {resSchema} from "../../../../../src/api/v1/patients/get.patientsList";

const endpoint = '/api/v1/patients/';

describe(`[GET]  ${endpoint}`, () => {

    it('Validation should not pass: Error 400 - Bad Request', async () => {

        const response = await supertest(app)
            .get(endpoint)
            .query({offset: 14})
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(400);
    });

    it('Validation should not pass: Error 400 - Bad Request', async () => {

        const response = await supertest(app)
            .get(endpoint)
            .query({gender: 'all'})
            .set('Content-Type', 'application/json');

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(400);
    });

    it('Response should return empty list: Status 200', async () => {

        const response = await supertest(app)
            .get(endpoint)
            .query({gender: 'FEMALE', page: 100, limit: 25})
            .set('Content-Type', 'application/json')

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(200);
        expect(response.body.list.length).to.eq(0);
    });

    it('Response should return list of patients: Status 200', async () => {

        const response = await supertest(app)
            .get(endpoint)
            .query({page: 5, limit: 10, gender: 'male', order: 'lastName'})
            .set('Content-Type', 'application/json')

        expect(response.type).to.eq('application/json');
        expect(response.status).to.eq(200);
        const validationResult = resSchema.validate(response.body);
        expect(validationResult.error).to.eq(undefined);
        expect(response.body.list[0].id).to.eq(363);
    });
});
