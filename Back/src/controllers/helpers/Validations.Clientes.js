import { validations } from "./validations";

const validar = (body) => {
  // Nombre
  // Apellido
  // Domicilio
  // Email
  // Password
  // IdCiudad
  let checksum = 0;
  if (!validations.validarTamaño(body.nombre, 2)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTexto(body.nombre)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.apellido, 3)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTexto(body.apellido)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.domicilio, 5)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.email, 7)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarEmail(body.email)) {
    return checksum;
  }
  checksum += 1;
  if (!validations.validarPassword(body.password)) {
    return checksum;
  }
  checksum += 1;
  return checksum;
};

export const validateCliente = { validar };
