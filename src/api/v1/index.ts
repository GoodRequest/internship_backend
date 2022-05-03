import {Router} from 'express';
import PatientsRouter from './patients';
import UsersRouter from './users';
import passport from "passport";

const router = Router();

export default () => {
    router.use('/patients', PatientsRouter());
    router.use('/users', passport.authenticate('jwt-api'), UsersRouter());
    return router;
}