import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection"
import Ciudades from "./Ciudades";
const alias = 'Clientes';
const cols = {
    id:{ 
        type: DataTypes.UUID,
        primaryKey : true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4 
    },
    nombre:{type: DataTypes.TEXT(50),
            allowNull:false
    },
    apellido:{type: DataTypes.TEXT(50),
        allowNull:false
    },
    domicilio:{type: DataTypes.TEXT(50),
        allowNull:false
    },
    email:{type: DataTypes.TEXT(100),
        allowNull:false
    },
    password:{type: DataTypes.TEXT(100),
        allowNull:false
    },
    idCiudad:{type: DataTypes.UUID(11),
        allowNull:false
    },
    habilitado:{type: DataTypes.BOOLEAN(11),
        allowNull:false
},
}
const  config = {
    timestamps: false,

};

const Clientes = sequelize.connection.define(alias,cols,config);
Clientes.associate = function (models) {
    Clientes.belongsTo(models.Ciudades, {
        as: "Clientes",
        foreignKey: 'idCiudad',
    })
}
export default Clientes