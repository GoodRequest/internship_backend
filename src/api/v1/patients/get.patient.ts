import {Request, Response} from "express";
import {PatientModel} from "../../../db/models/patient";
import Joi from "joi";
import {Genders} from "../../../middleware/utilities/enums";

export const reqSchema = Joi.object({
    params: Joi.object({
        patientID: Joi.number().integer().positive().required()
    }),
    query: Joi.object(),
    body: Joi.object()
});

export const onePatientFromDBSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    diagnoseID: Joi.number().integer().greater(0).required(),
    height: Joi.number().greater(0).less(250).required(),
    weight: Joi.number().greater(0).less(500).required(),
    gender: Joi.string().trim().uppercase().valid(...Genders).required(),
    identificationNumber: Joi.string().trim().pattern(/^([0-9a-zA-Z]){12}$/).required(),
    lastName: Joi.string().trim().min(1).max(30).required(),
    firstName: Joi.string().trim().min(1).max(30).required(),
    birthdate: Joi.date().less('now').required()
});

export const findPatientByID = async (id:number, res: Response) => {
    const patient: PatientModel = await PatientModel.findByPk(id);
    if (!patient) {
        res.status(404).json({'message': 'Patient not found in DB!'});
        return null;
    }
    return patient;
}

export const workflow = async (req: Request, res: Response) => {

    const patient: PatientModel = await findPatientByID(Number(req.params.patientID), res);

    if (!patient) {
        return;
    }
    res.status(200).json({patient});
}