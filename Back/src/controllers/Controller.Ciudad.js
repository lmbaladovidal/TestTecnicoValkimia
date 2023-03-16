import CiudadesArr from "../dataBase/dummyDataGenerator/DDG.Ciudad";
import db from "../database/models";
import Ciudades from "../dataBase/models/Ciudades";
const sequelize = db.sequelize;

const createDummyCiudad = (req, res) => {
  try {
    CiudadesArr.map((Ciudad) => {
      Ciudades.create({
        nombre: Ciudad.nombre,
      }).then((result) => {
        console.log(result);
      });
    });
    res.json({
      data: "ok",
      status: 200,
    });
  } catch (error) {
    res.json({
      data: error,
      status: 500,
    });
  }
};

const getCiudades = async (req,res)=>{
  try {
    const ciudades = await Ciudades.findAll({});
    res.json({
      result: { status: 200, ciudades},
    });
  } catch (error) {
    res.json({
      data: error,
      status: 500,
    });
  }  
}

export const methods = { createDummyCiudad,getCiudades };
