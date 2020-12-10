const request = require('request')

const endpoint = 'http://localhost:3000';

let token

describe('login', function () {
    it('deve retornar 200 código de resposta', function(done){
        request.post(`${endpoint}/login`, {json: true, body: {'nome' :'GIAN', 'senha' : '123456' }, 
        headers: '',}, function (error, response) {
            token = response.body.token
            expect(response.statusCode).toEqual(200);
            done();
            console.log(" - LOGIN FOR PRODUCTS")
        })
    })
});

describe('products', ()=>{
    it('deve retornar 200 código de resposta', function (done) {
        request.get(`${endpoint}/products?usuario_id=1`, {headers: {Authorization :`Bearer ${token}`}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
            console.log(" - GET PRODUCTS WITH TOKEN")
        });
    });

    it('deve retorna 200 código da resposta', (done)=>{
        request.post(`${endpoint}/products`, 
        {json: true, body: {'nome_produto': 'GUARANA', 'codigo_produto': '123456', 'preco_custo' : 10,
        'preco_venda' : 10, 'estoque' : 20, 'usuario_id' : 1}, 
        headers: {Authorization: `Bearer ${token}`}}, (error, response)=>{
            expect(response.statusCode).toEqual(201);
            done();
            console.log(" - POST PRODUCTS WITH TOKEN")
        })
    })
})