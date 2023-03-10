import { faker } from '@faker-js/faker';
faker.locale = 'es'

let ciudadesArr = [];
for (let i = 0; i < 10000; i++) {

    ciudadesArr.push({    
        nombre : faker.address.city(),    
    })   
}


export default ciudadesArr;