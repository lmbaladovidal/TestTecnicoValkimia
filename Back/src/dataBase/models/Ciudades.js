import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection"

const alias = 'Ciudades';
const cols = {
    id:{ 
        type: DataTypes.UUID,
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

const Ciudades = sequelize.connection.define(alias,cols,config);
Ciudades.associate = function (models) {
    Ciudades.hasMany(models.Clientes, { // models.Movie -> Movies es el valor de alias en movie.js
        as: "Clientes",
        foreignKey: 'idCiudad',
    })
}
export default Ciudades
