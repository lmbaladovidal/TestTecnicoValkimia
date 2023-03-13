const validarTamaño = (value, length) => {
  return value.trim().length > length ? true : false;
};
const validarTexto = (value) => {
  const regEx = new RegExp("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$");
  return regEx.test(value) ? true : false;
};
const validarNumero = (value) => {
  const regEx = new RegExp("\\d");
  return regEx.test(value) ? true : false;
};

const validarEmail = (value) => {
  const regEx = new RegExp(
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
  );
  return regEx.test(value) ? true : false;
};

const validarPassword = (value) => {
  const regEx = new RegExp(
    /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/
  );
  console.log("validation desde password", value, regEx.test(value));
  return regEx.test(value) ? true : false;
};

export const validations = {
  validarTamaño,
  validarTexto,
  validarNumero,
  validarEmail,
  validarPassword,
};
