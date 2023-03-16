import ClientesArr from "../dataBase/dummyDataGenerator/DDG.Cliente";
import db from "../database/models";
import Clientes from "../dataBase/models/Clientes";
import Cliente from "../dataBase/models/Clientes";
import { validateCliente } from "./helpers/Validations.Clientes";

const sequelize = db.sequelize;

const createDummyCliente = async (req, res) => {
  try {
    console.log(ClientesArr);
    ClientesArr.map((cliente) => {
      Cliente.create({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        domicilio: cliente.domicilio,
        email: cliente.email,
        password: cliente.password,
        idCiudad: cliente.idCiudad,
        habilitado: cliente.habilitado,
      });
      res.json({
        data: "ok",
        status: 200,
      });
    });
  } catch (error) {
    res.json(error);
  }
};
//INICIO ABM CLIENTES
const createCliente = (req, res) => {
  console.log(req.body);
  const checksum = validateCliente.validar(req.body);
  console.log("Check sum",checksum);
  if (checksum !== 8) {
    res.json({
      data: {
        msj: "Error en los campos proporcionados",
        checksum,
      },
      status: 500,
    });
    return;
  }
  Cliente.create({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    domicilio: req.body.domicilio,
    email: req.body.email,
    password: req.body.password,
    idCiudad: req.body.idCiudad,
    habilitado: 1,
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

const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({
      where: { id: req.params.id },
    });
    if (cliente) {
      await cliente.destroy();
      res.json({
        data: "ok",
        status: 200,
      });
    } else {
      res.json({
        data: { msj: "No existe ningún cliente con esa ID", status: 500 },
      });
    }
  } catch (error) {
    res.json({ error });
  }
};

const updateCliente = async (req, res) => {
  try {
    const checksum = validateCliente.validar(req.body);
    console.log("Actualizar Clientes",req.body,checksum);
    if (checksum !== 8) {
      res.json({
        data: {
          msj: "Error en los campos proporcionados",
          checksum,
        },
        status: 500,
      });
      return;
    }
    const cliente = await Cliente.findOne({
      where: { id: req.params.id },
    });
    console.log(cliente);
    if (cliente) {
      console.log(cliente);
      cliente.set({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        domicilio: req.body.domicilio,
        email: req.body.email,
        password: req.body.password,
        idCiudad: req.body.idCiudad,
        habilitado: req.body.habilitado,
      });
      console.log(cliente);
      await cliente.save();
      res.json({
        response: { status: 200, data: cliente },
      });
    } else {
      res.json({
        data: { msj: "No existe ningún cliente con esa ID", status: 500 },
      });
    }
  } catch (error) {
    res.json({ data:{error} });
  }
};

//FIN ABM CLIENTES

const listClientes = async (req, res) => {
  try {
    console.log("Listar Clientes");
    const amount = await Clientes.count();
    const clientes = await Clientes.findAll({
      offset: 10 * req.params.page,
      limit: 10,
    });
    res.json({
      result: { status: 200, clientes, page: req.params.page, amount },
    });
  } catch (error) {
    res.json({ error });
  }
};

const listAllClientes = async (req, res) => {
  try {
    console.log("Listar Clientes");
    const amount = await Clientes.count();
    const clientes = await Clientes.findAll({});
    res.json({
      result: { status: 200, clientes, page: req.params.page, amount },
    });
  } catch (error) {
    res.json({ error });
  }
};



const listCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findOne({
      attributes: [
        "id",
        "nombre",
        "apellido",
        "domicilio",
        "email",
        "password",
        "idCiudad",
        "habilitado",
      ],
      where: { id: req.params.id },
    });
    res.json({ result: { status: 200, cliente } });
  } catch (error) {
    res.json({ error });
  }
};

export const methods = {
  createDummyCliente,
  createCliente,
  deleteCliente,
  updateCliente,
  listAllClientes,
  listClientes,
  listCliente,
};
