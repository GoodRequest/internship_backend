import {Request, Response} from "express";
import {PatientModel} from "../../../db/models/patient";
import {findPatientByID} from "./get.patient";
import {findDiagnoseByID} from "./post.patient";
import Joi from "joi";
import {Genders} from "../../../middleware/utilities/enums";

export const reqSchema = Joi.object({
    params: Joi.object({patientID: Joi.number().integer().positive().required()}),
    query: Joi.object(),
    body: Joi.object({
        diagnoseID: Joi.number().integer().greater(0),
        height: Joi.number().greater(0).less(250),
        weight: Joi.number().greater(0).less(500),
        gender: Joi.string().trim().uppercase().valid(...Genders),
        identificationNumber: Joi.string().trim().pattern(/^([0-9a-zA-Z]){12}$/),
        lastName: Joi.string().trim().min(1).max(30),
        firstName: Joi.string().trim().min(1).max(30),
        birthdate: Joi.date().less('now')
    })
});

export const workflow = async (req: Request, res: Response) => {
    const {firstName, lastName, birthdate, weight, height, identificationNumber, gender, diagnoseID} = req.body;

    const patient: PatientModel = await findPatientByID(Number(req.params.patientID), res);
    if (!patient) {
        return;
    }

    if (identificationNumber) {
        const idNumberExists: boolean = !!(await PatientModel.findOne({
            where: {identificationNumber: identificationNumber},
            attributes: ['id']
            }
        ));

        if(idNumberExists) {
            res.status(409).json({'message': `Identification number (${identificationNumber}) is already in use!`});
            return;
        }
    }

    if (diagnoseID) {
        const diagnoseExists = await findDiagnoseByID(Number(diagnoseID), res);
        if (!diagnoseExists) {
            return;
        }
    }

    await patient.update({
        firstName: firstName,
        lastName: lastName,
        birthdate: birthdate,
        weight: weight,
        height: height,
        identificationNumber: identificationNumber,
        gender: gender,
        diagnoseID: diagnoseID
    })

    res.status(201).json({'message': 'Patient record was updated!'});
}