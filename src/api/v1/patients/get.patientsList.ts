import {Request, Response} from "express";
import {PatientModel} from "../../../db/models/patient";
import {Genders, PatientOrder, PatientOrders} from "../../../middleware/utilities/enums";
import Joi from "joi";
import {onePatientFromDBSchema} from "./get.patient";

export const reqSchema = Joi.object({
    params: Joi.object(),
    query: Joi.object({
        page: Joi.number().integer().positive(),
        limit: Joi.number().integer().positive(),
        order: Joi.string().trim().valid(...PatientOrders),
        gender: Joi.string().trim().uppercase().valid(...Genders)
    }),
    body: Joi.object()
});

export const resSchema = Joi.object({
    list: Joi.array().items(onePatientFromDBSchema)
});

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