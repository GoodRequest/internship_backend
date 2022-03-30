import {Request, Response, NextFunction} from "express"

export function validatePatient() {
    return (req: Request, res: Response, next: NextFunction) => {

        const positiveIntRegExp = /^([1-9]\d*)$/;
        const onlyLettersExp = /^([a-zA-Z]){1,30}$/;
        const lettersAndDigitsExp = /^([0-9a-zA-Z]){1,30}$/;

        //https://stackoverflow.com/questions/20690499/concrete-javascript-regular-expression-for-accented-characters-diacritics
        const onlyLettersDiacriticsExp = /^([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]){1,30}$/;  //SK a CZ tuším funguje ok

        if (!positiveIntRegExp.test(req.body.diagnoseID)) {
            return res.status(400).send("Invalid diagnose ID! ID has to be a positive integer (without sign '+')");
        }

        if (!positiveIntRegExp.test(req.body.height)) {
            return res.status(400).send("Invalid height! Height has to be a positive integer (without sign '+')");
        }

        if (!positiveIntRegExp.test(req.body.weight)) {
            return res.status(400).send("Invalid weight! Weight has to be a positive integer (without sign '+')");
        }

        if (!onlyLettersExp.test(req.body.gender.trim())) {
            return res.status(400).send("Invalid gender! It has to be a string that consists only of letters a-z and A-Z (max. length 30 chars)");
        }

        if (!lettersAndDigitsExp.test(req.body.identificationNumber.trim())) {
            return res.status(400).send("Why should be identificationNumber a string? I also have no idea.");
        }

        if (!onlyLettersDiacriticsExp.test(req.body.lastName.trim())) {
            return res.status(400).send("Invalid last name! It has to be a string that consists only of letters (max. length 30 chars)");
        }

        if (!onlyLettersDiacriticsExp.test(req.body.firstName.trim())) {
            return res.status(400).send("Invalid first name! It has to be a string that consists only of letters (max. length 30 chars)");
        }

        //todo birthday later

        return next();
    }
}


export function validateList() {
    return (req: Request, res: Response, next: NextFunction) => {

        const positiveIntRegExp = /^([1-9]\d*)$/;
        const onlyLettersExp = /^([a-zA-Z]){1,30}$/;

        if (!positiveIntRegExp.test(req.body.page)) {
            return res.status(400).send("Invalid number of page! It has to be a positive integer (without sign '+')");
        }

        if (!positiveIntRegExp.test(req.body.limit)) {
            return res.status(400).send("Invalid size of limit per page! It has to be a positive integer (without sign '+')");
        }

        if (!onlyLettersExp.test(req.body.order.trim())) {
            return res.status(400).send("Invalid order! It has to be a string that consists only of letters a-z and A-Z (max. length 30 chars)");
        }

        if (!onlyLettersExp.test(req.body.gender.trim())) {
            return res.status(400).send("Invalid gender! It has to be a string that consists only of letters a-z and A-Z (max. length 30 chars)");
        }

        return next();
    }
}