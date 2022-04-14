import {DataTypes, Model, Sequelize} from "sequelize";
import {TimeUnit} from "../../middleware/utilities/enums";
import {DiagnoseModel} from "./diagnose";
import {Models} from "../index";

export class SubstanceModel extends Model {
    id: number
    name: string
    timeUnit: TimeUnit
    halfLife: number

    diagnose: DiagnoseModel[]
}

export default (sequelize: Sequelize, modelName: string) => {
    SubstanceModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                unique: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            timeUnit: {
                type: DataTypes.ENUM(TimeUnit.SECOND, TimeUnit.MINUTE, TimeUnit.HOUR, TimeUnit.DAY),
                allowNull: false
            },
            halfLife: {
                type: DataTypes.DOUBLE,
                allowNull: false
            }
        },
        {
            paranoid: false,
            timestamps: false,
            sequelize,
            modelName,
            tableName: 'substances'
        }
    );

    (SubstanceModel as any).associate = (models: Models) => {
        SubstanceModel.hasMany(models.Diagnose, { foreignKey: 'substanceID' })
    }

    return SubstanceModel;
}