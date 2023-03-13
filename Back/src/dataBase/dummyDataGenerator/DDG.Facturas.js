import { faker } from '@faker-js/faker';
faker.locale = 'es'


const detalleGenerator = ()=>{
    const limit = faker.datatype.number({ max: 10 })
    let detalle = ""
    for (let i = 0;i< limit; i++){
        detalle += `${faker.commerce.productName()};`
    }
    return detalle;
}

let FacturasArr = [];
for (let i = 0; i < 150; i++) {

    FacturasArr.push({       
        fecha : faker.date.recent(faker.datatype.number({ max: 200 })),
        idCliente: "completar",
        detalle:detalleGenerator(),    
        importe:faker.commerce.price(100, 1000)
    })   
}


export default FacturasArr;