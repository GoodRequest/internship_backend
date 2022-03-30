import {Request, Response} from "express";

export const deletePatientByID = (req: Request, res: Response) => {
    
    res.json({
        "messages": [
            {
                "message": `Patient with id ${req.params.patientID} was deleted.`,
                "type": "SUCCESS"
            }
        ]
    });
}