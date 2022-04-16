import {Request, Response} from "express";
import {PatientModel} from "../../../db/models/patient";

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