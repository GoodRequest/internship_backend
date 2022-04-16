import express from 'express'
import v1 from './api/v1'
import sequelize from "./db";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/v1', v1());

sequelize.sync();
export default app;