const validarTamaño = (value, length) => {
  return value.trim().length > length ? true : false;
};
const validarTexto = (value) => {
  const regEx = new RegExp(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/);
  return regEx.test(value) ? true : false;
};
const validarNumero = (value) => {
  const regEx = new RegExp(/^\d*\.\d+$/);
  console.log(value,regEx.test(value));
  return regEx.test(value) ? true : false;
};

const validarFecha = (value)=>{
  const regEx = new RegExp(/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/)
  return regEx.test(value)?true:false;
}

const validarEmail = (value) => {
  const regEx = new RegExp(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  );
  return regEx.test(value) ? true : false;
};

const validarPassword = (value) => {
  const regEx = new RegExp(
    /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,}/
  );
  
  return regEx.test(value) ? true : false;
};

export const validations = {
  validarTamaño,
  validarTexto,
  validarNumero,
  validarFecha,
  validarEmail,
  validarPassword,
};
