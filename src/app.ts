import express from 'express'
import {Request} from "express";
import v1 from './api/v1'
import sequelize from "./db";
import passport from "passport";
import {ExtractJwt, Strategy as JwtStrategy, VerifiedCallback} from "passport-jwt";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

passport.use('jwt-api', new JwtStrategy({
    audience: 'jwt-api',
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('token')]),
    passReqToCallback: true,
    secretOrKey: process.env.JWT_SECRET
}, (req: Request, payload: any, done: VerifiedCallback) => {

    let user = {};
    try {
        //TODO load UserModel.findByPk(payload.id) from DB instead of this
        if (payload.id === 1) {
            user = {id: payload.id, role: "USER", patientID: 23}
        } else if (payload.id === 2) {
            user = {id: payload.id, role: "ADMIN", patientID: 24}
        } else if (payload.id === 3) {
            user = {id: payload.id, role: "SUPER_ADMIN", patientID: 22}
        } else {
            throw new Error('Unauthorized');
        }
    }
    catch (error) {
        done(error.message, null);
    }
    done(null, user);
}))

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.use(passport.initialize());
app.use('/api/v1', v1());

sequelize.sync();
export default app;