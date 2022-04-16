import {Request, Response} from "express";
import {PatientModel} from "../../../db/models/patient";
import {PatientOrder} from "../../../middleware/utilities/enums";

export const workflow = async (req: Request, res: Response) => {
    let {page = 1, limit = 10, order = PatientOrder.ID, gender} = req.query;

    limit = Number(limit);
    const offset = (Number(page) - 1) * limit;

    let list: PatientModel[];
    if (gender) {
        list = await PatientModel.findAll({
            where: {gender: gender},
            order: ['"' + order + '"'],
            limit: limit,
            offset: offset});
    } else {
        list = await PatientModel.findAll({
            order: ['"' + order + '"'],
            limit: limit,
            offset: offset});
    }

    if (!list) {
        res.status(404).json({'message': 'Nothing found in DB!'});
    }

    res.status(200).json({
        list
    });
}