import {Request, Response, NextFunction} from "express";
import Joi from "joi";
import {patientIDSchema, postPatientSchema, patchPatientSchema, getPatientsListSchema} from "./schemesPatients";

export function validatePatientsList() {
    return (req: Request, res: Response, next: NextFunction) => {

        // vo value bude uložené body
        const {error, value} = getPatientsListSchema.validate(req.body);
        if(error) {

            //ak si chcem poslať celý chybový json:
            //return res.status(400).json(error);
            return res.status(400).send(error.message);
        }

        req.body = value;
        return next();
    }
}

export function validatePatientID() {
    return (req: Request, res: Response, next: NextFunction) => {

        const result = patientIDSchema.validate(req.params);

        if (result.error) {
            return res.status(400).send(result.error.message);
        }

        return next();
    }
}

export function validatePatient() {
    return (req: Request, res: Response, next: NextFunction) => {

        let schema: Joi.Schema;
        if (req.method === 'POST') {
            schema = postPatientSchema;
        } else {
            schema = patchPatientSchema;
        }

        const {error, value} = schema.validate(req.body)

        if (error) {
            return res.status(400).send(error.message);
        }

        req.body = value;
        return next();
    }
}