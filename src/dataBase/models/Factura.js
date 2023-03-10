import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection"
const alias = 'Facturas';
const cols = {
    id:{ 
        type: DataTypes.UUID(11).UNSIGNED,
        primaryKey : true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4 
    },
    idCliente:{type: DataTypes.UUID(11),
        allowNull:false
    },
    fecha:{type: DataTypes.DATE(50),
            allowNull:false
    },
    detalle:{type: DataTypes.TEXT(200),
        allowNull:false
    },
    importe:{type: DataTypes.DECIMAL(10, 2),
        allowNull:false
    },
}
const  config = {
    timestamps: false,

};

const cliente = sequelize.connection.define(alias,cols,config);

export default ciudacliente