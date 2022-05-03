import {DataTypes, Model, Sequelize} from "sequelize";
import {UserRole, UserRoles} from "../../middleware/utilities/enums";
import {Models} from "../index";
import {PatientModel} from "./patient";

export class UserModel extends Model {
    id: number
    role: UserRole

    //foreign keys
    patientID: number
    patient: PatientModel
}

export default (sequelize: Sequelize, modelName: string) => {
    UserModel.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            role: {
                type: DataTypes.ENUM(...UserRoles),
                allowNull: false
            },
            patientID: {
                type: DataTypes.BIGINT,
                allowNull: false
            }
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'users'
        }
    );

    (UserModel as any).associate = (models: Models) => {
        UserModel.belongsTo(models.Patient, { foreignKey: 'patientID' })
    }

    return UserModel;
}