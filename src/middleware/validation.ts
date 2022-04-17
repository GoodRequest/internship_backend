import {Request, Response, NextFunction} from "express";
import {Schema} from "joi";

export function validate(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const {params, query, body} = req;

        const result = schema.validate({params, query, body});
        if(result.error) {
            return res.status(400).json({error: result.error.message});
        }

        req.params = result.value.params;
        req.query = result.value.query;
        req.body = result.value.body;
        return next();
    }
}