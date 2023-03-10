import { faker } from '@faker-js/faker';
faker.locale = 'es'


const detalleGenerator = ()=>{
    const limit = faker.datatype.number({ max: 100 })
    let detalle = ""
    for (let i = 0;i< limit; i++){
        detalle += `${faker.commerce.productName()};`
    }
    return detalle;
}



let facturasArr = [];
for (let i = 0; i < 10000; i++) {

    facturasArr.push({       
        fecha : faker.date.recent(),
        detalle:detalleGenerator(),    
        importe:faker.commerce.price(100, 200)
    })   
}


export default facturasArr;