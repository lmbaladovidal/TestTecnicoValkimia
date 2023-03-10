import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection"
import cliente from "./Cliente";

const alias = 'Ciudades';
const cols = {
    id:{ 
        type: DataTypes.UUID().UNSIGNED,
        primaryKey : true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4 
    },
    nombre:{type: DataTypes.TEXT(50),
            allowNull:false
    }
}
const  config = {
    timestamps: false,

};

const ciudad = sequelize.connection.define(alias,cols,config);
ciudad.hasMany(clientes)
export default ciudad
