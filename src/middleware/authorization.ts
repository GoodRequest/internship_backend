import {NextFunction, Request, Response} from "express";
import {UserRole} from "./utilities/enums";

export function authorize(permission: UserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user:any = req.user;

        if (permission.indexOf(user.role) <= -1) {
            return res.status(403).json({error: 'Unauthorized access!'});
        }

        if (user.role === UserRole.USER) {
            if (user.patientID != req.params.patientID) {
                return res.status(403).json({error: 'Unauthorized access!'});
            }
        }
        return next();
    }
}