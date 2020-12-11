// TEST UNIT USING JASMINE IN API REST FOR KNOW RETUNING STATUS CODE HTTP

const request = require('request')

const endpoint = 'http://localhost:3000'

let token

describe('login', function () {
    it('deve retornar 200 código de resposta', function(done){
        request.post(`${endpoint}/login`, {json: true, body: {'nome' :'GIAN', 'senha' : '123456' }, 
        headers: '',}, function (error, response) {
            token = response.body.token
            expect(response.statusCode).toEqual(200);
            done();
            console.log(" - LOGIN FOR INPUT PRODUCT")
        })
    })
});


describe('input product', ()=>{
    it('deve retornar 200 código de resposta', function (done) {
        request.get(`${endpoint}/input?page=1&usuario_id=1`, {headers: {Authorization :`Bearer ${token}`}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
            console.log(" - GET INPUT PRODUCT WITH TOKEN")
        });
    });

    it('deve retorna 201 código da resposta', (done)=>{
        request.post(`${endpoint}/input`, 
        {json: true, body: {'data_entrada' : '03/12/2020 21:20', 'codigo_produto': '123456','nome_produto': 'GUARANA', 'preco_custo' : 10,
        'preco_venda' : 10, 'quantidade' : 20,'total' : 20 , 'usuario_id' : 1}, 
        headers: {Authorization: `Bearer ${token}`}}, (error, response)=>{
            expect(response.statusCode).toEqual(201);
            done();
            console.log(" - POST INPUT PRODUCT WITH TOKEN")
        })
    })
})