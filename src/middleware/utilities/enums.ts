export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export enum PatientOrder {
    ID = 'id',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    BIRTHDATE = 'birthdate',
    WEIGHT = 'weight',
    HEIGHT = 'height',
    IDENTIFICATION_NUMBER = 'identificationNumber',
    GENDER = 'gender',
    DIAGNOSE_ID = 'diagnoseID'
}

export enum TimeUnit {
    SECOND = 'second',
    MINUTE = 'minute',
    HOUR = 'hour',
    DAY = 'day'
}

export const Genders = Object.values(Gender)
export const PatientOrders = Object.values(PatientOrder)
export const TimeUnits = Object.values((TimeUnit))