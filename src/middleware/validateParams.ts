import {Request, Response, NextFunction} from "express";

export default function validatePatientID() {
    return (req: Request, res: Response, next: NextFunction) => {

        const positiveIntRegExp = /^([1-9]\d*)$/;   //0 nemôže byť id, ak áno, potom by bol regexp /^(0|[1-9]\d*)$/

        if (!positiveIntRegExp.test(req.params.patientID)) {
            return res.status(400).send("Invalid Patient ID! ID has to be a positive integer (without sign '+')");
        }
        return next();
    }
}