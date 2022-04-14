import {DataTypes, DateDataType, Model, Sequelize} from "sequelize";
import {Gender} from "../../middleware/utilities/enums";
import {DiagnoseModel} from "./diagnose";
import {Models} from "../index";

export class PatientModel extends Model {
    id: number
    firsName: string
    lastName: string
    birthdate: DateDataType
    weight: number
    height: number
    identificationNumber: string
    gender: Gender

    //foreign keys
    diagnoseID: number
    diagnoses: DiagnoseModel
}

export default (sequelize: Sequelize, modelName: string) => {
    PatientModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            firstName: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            lastName: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            birthdate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            weight: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            height: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            identificationNumber: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            gender: {
                type: DataTypes.ENUM(Gender.MALE, Gender.FEMALE),
                allowNull: false
            },
            diagnoseID: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'patients'
        }
    );

    (PatientModel as any).associate = (models: Models) => {
        PatientModel.belongsTo(models.Diagnose, { foreignKey: 'diagnoseID' })
    }

    return PatientModel;
}