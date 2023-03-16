import db from "../database/models";
import FacturasArr from "../dataBase/dummyDataGenerator/DDG.Facturas";
import Facturas from "../dataBase/models/Facturas";
import { validateFacturas } from "./helpers/Validations.Facturas";
const sequelize = db.sequelize;

const createDummyFactura = (req, res) => {
  try {
    FacturasArr.map((factura) => {
      Facturas.create({
        idCliente: "completar",
        fecha: factura.fecha,
        detalle: factura.detalle,
        importe: factura.importe,
      }).then((result) => {
        console.log(result.dataValues);
      });
    });
    res.json({
      data: "ok",
      status: 200,
    });
  } catch (error) {
    res.json(error);
  }
};

const createFactura = (req, res) => {
  const checksum = validateFacturas.validar(req.body);
  if (checksum !== 5) {
    res.json({
      data: {
        msj: "Error en los campos proporcionados",
        checksum,
      },
      status: 500,
    });
    return;
  }
  Facturas.create({
    idCliente: req.body.idCliente,
    fecha: req.body.fecha,
    detalle: req.body.detalle,
    importe: req.body.importe,
  })
    .then((result) => {
      res.json({
        data: result,
        status: 201,
      });
    })
    .catch((error) => {
      res.json({
        data: error,
        status: 500,
      });
    });
};

const listFacturasxCliente = async (req,res)=>{
  const amount = await Facturas.count({
    order: [['fecha', 'DESC']],
    where: {
      idCliente: req.params.idCliente
    }
  });
  const facturas = await Facturas.findAll({
      where: {
        idCliente: req.params.idCliente
      }
    })
    res.json({
      data:{amount,facturas},
      status:200
    })
}

export const methods = { createDummyFactura, createFactura,listFacturasxCliente };
