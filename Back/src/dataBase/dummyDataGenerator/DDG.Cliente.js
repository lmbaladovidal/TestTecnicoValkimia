import { faker } from '@faker-js/faker';
faker.locale = 'es'

let ClientesArr = [];
for (let i = 0; i < 100; i++) {

    ClientesArr.push({    
        nombre : faker.name.firstName(),    
        apellido : faker.name.lastName(),    
        domicilio : faker.address.streetAddress(),
        email:faker.internet.email(),
        password:faker.internet.password(),
        idCiudad:"completar",
        habilitado:faker.datatype.boolean()
    })   
}


export default ClientesArr;