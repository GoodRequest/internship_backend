import {Request, Response} from "express";

export const postPatient = (req: Request, res: Response) => {
    const {firstName, lastName, birthdate, weight, height, identificationNumber, gender, diagnoseID} = req.body;

    res.json({
        "messages": [
            {
                "message": `New patient with name ${firstName} and id ${identificationNumber} was created.`,
                "type": "SUCCESS"
            }
        ],
        "patient": {
            "id": 0
        }
    });
}