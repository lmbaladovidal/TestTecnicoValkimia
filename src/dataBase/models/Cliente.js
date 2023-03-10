import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection"
import ciudad from "./Ciudad";
const alias = 'Clientes';
const cols = {
    id:{ 
        type: DataTypes.UUID(11).UNSIGNED,
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

const cliente = sequelize.connection.define(alias,cols,config);
cliente.belongsto(ciudades)
export default cliente