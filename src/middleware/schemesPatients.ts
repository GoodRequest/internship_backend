import Joi from "joi";
import {Gender, Order} from "./utilities/enums";

export const patientIDSchema = Joi.object({
    patientID: Joi.number().integer().positive().required()
});

export const postPatientSchema = Joi.object({
    diagnoseID: Joi.number().integer().greater(0).required(),
    height: Joi.number().greater(0).less(250).required(),
    weight: Joi.number().greater(0).less(500).required(),
    gender: Joi.string().trim().lowercase().valid(Gender.MALE, Gender.FEMALE).required(),
    identificationNumber: Joi.string().trim().pattern(/^([0-9a-zA-Z]){12}$/).required(),
    lastName: Joi.string().trim().min(1).max(30).required(),
    firstName: Joi.string().trim().min(1).max(30).required(),
    birthdate: Joi.date().less('now').required()
});

export const patchPatientSchema = Joi.object({
    diagnoseID: Joi.number().integer().greater(0),
    height: Joi.number().greater(0).less(250),
    weight: Joi.number().greater(0).less(500),
    gender: Joi.string().trim().lowercase().valid(Gender.MALE, Gender.FEMALE),
    identificationNumber: Joi.string().trim().pattern(/^([0-9a-zA-Z]){12}$/),
    lastName: Joi.string().trim().min(1).max(30),
    firstName: Joi.string().trim().min(1).max(30),
    birthdate: Joi.date().less('now')
});

export const getPatientsListSchema = Joi.object({
    page: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
    order: Joi.string().trim().lowercase().valid(Order.ASC, Order.DESC),
    gender: Joi.string().trim().lowercase().valid(Gender.MALE, Gender.FEMALE)
});