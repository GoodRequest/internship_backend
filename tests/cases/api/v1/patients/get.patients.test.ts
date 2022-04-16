import supertest = require("supertest");
import { expect } from 'chai'
import app from '../../../../../src/app'
import {postPatientSchema} from '../../../../../src/middleware/schemesPatients'

const endpoint = (patientID: number | string) => `/api/v1/patients/${patientID}`

describe(`[GET] ${endpoint(':patientID')}`, () => {

    it('Response should return one patient', async () => {

        const response = await supertest(app)
            .get(endpoint(22))
            .set('Content-Type', 'application/json')

        console.log(response.body);
        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = postPatientSchema.validate(response.body.patient)
        console.log(validationResult.error)
        expect(validationResult.error).to.eq(undefined)
    })
})
