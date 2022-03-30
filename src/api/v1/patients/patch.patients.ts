import {Request, Response} from "express";

export const patchPatientWithID = (req: Request, res: Response) => {

    const {firstName, lastName, birthdate, weight, height, identificationNumber, gender, diagnoseID} = req.body;

    res.json({
        "messages": [
            {
                "message": `So, record of patient ${firstName} ${lastName} was modify.`,
                "type": "SUCCESS"
            }
        ]
    });
}