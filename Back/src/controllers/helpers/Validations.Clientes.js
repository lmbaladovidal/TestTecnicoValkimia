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
    console.log("NameError");
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTexto(body.nombre)) {
    console.log("SizeNameError");
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.apellido, 3)) {
    console.log("SizeLastnameError");
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTexto(body.apellido)) {
    console.log("LastNameError");
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.domicilio, 5)) {
    console.log("SizeAdressError");
    return checksum;
  }
  checksum += 1;
  if (!validations.validarTamaño(body.email, 7)) {
    console.log("SizeEmailerror");
    return checksum;
  }
  checksum += 1;
  if (!validations.validarEmail(body.email)) {
    console.log("emailError");
    return checksum;
  }
  checksum += 1;
  if (!validations.validarPassword(body.password)) {
    console.log("PassError");
    return checksum;
  }
  checksum += 1;
  return checksum;
};

export const validateCliente = { validar };