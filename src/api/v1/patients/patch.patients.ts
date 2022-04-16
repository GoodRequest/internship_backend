import {Request, Response} from "express";
import {PatientModel} from "../../../db/models/patient";
import {findPatientByID} from "./get.patient";
import {findDiagnoseByID} from "./post.patients";

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