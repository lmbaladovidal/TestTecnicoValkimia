import { faker } from '@faker-js/faker';
faker.locale = 'es'

let CiudadesArr = [];
for (let i = 0; i < 50; i++) {

    CiudadesArr.push({    
        nombre : faker.address.city(),    
    })   
}


export default CiudadesArr;