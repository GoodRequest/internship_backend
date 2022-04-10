import {Request, Response} from "express";

export const getPatientByID = (req: Request, res: Response) => {

    res.json({
        "patient": {
            "id": req.params.patientID,
            "firstName": "string",
            "lastName": "string",
            "birthdate": "2022-03-28T07:46:25.728Z",
            "weight": 0,
            "height": 0,
            "identificationNumber": "string",
            "gender": "MALE",
            "age": 0,
            "personType": "ADULT",
            "substanceAmount": 0,
            "diagnose": {
                "id": 0,
                "name": "string",
                "description": "string",
                "substance": {
                    "id": 0,
                    "name": "string",
                    "timeUnit": "SECOND",
                    "halfLife": 0
                }
            }
        }
    });
}

export const getPatientsList = function(req: Request, res: Response) {
    const {page, limit, order, gender} = req.body;

    res.json({
        "patients": [
            {
                "id": 0,
                "firstName": "string",
                "lastName": "string",
                "birthdate": "2022-03-30T17:39:31.686Z",
                "weight": 0,
                "height": 0,
                "identificationNumber": "string",
                "gender": `${req.body.gender}`,
                "age": 0,
                "personType": "ADULT",
                "substanceAmount": 0,
                "diagnose": {
                    "id": 0,
                    "name": "string",
                    "description": "string",
                    "substance": {
                        "id": 0,
                        "name": "string",
                        "timeUnit": "SECOND",
                        "halfLife": 0
                    }
                }
            }
        ],
        "pagination": {
            "limit": req.body.limit,
            "page": page,
            "totalPages": 0,
            "totalCount": 0
        }
    });
}