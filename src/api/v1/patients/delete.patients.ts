import {Request, Response} from "express";
import {PatientModel} from "../../../db/models/patient";

export const workflow = async (req: Request, res: Response) => {
    const reqID = req.params.patientID;
    const rowsDeleted: number = await PatientModel.destroy({where: {id: reqID}});

    if(!rowsDeleted) {
        res.status(404).json({'message': `Patient with id ${reqID} was not deleted from DB, probably doesn't exist!`})
        return
    }

    res.status(200).json({'message': `Number of rows deleted: ${rowsDeleted}. Patient with id ${reqID} was successfully deleted from DB!`});
}