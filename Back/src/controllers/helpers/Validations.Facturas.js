import { validations } from "./validations";

const validar = (body) => {
  //idCliente
  // fecha
  // detalle
  // importe
  let checksum = 0;
  if (!validations.validarTamaño(body.idCliente, 35)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.fecha, 2)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.detalle, 4)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.importe, 1)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarNumero(body.importe)) {
    return checksum;
  }
  checksum += 1;
  return checksum;
};

export const validateFacturas = { validar };
