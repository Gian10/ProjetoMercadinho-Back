
// TEST UNIT USING JASMINE IN API REST FOR KNOW RETUNING STATUS CODE HTTP

const request = require('request');

const endpoint = 'http://localhost:3000';

let token

describe('login', function () {
    it('deve retornar 200 código de resposta', function(done){
        request.post(`${endpoint}/login`, {json: true, body: {'nome' :'GIAN', 'senha' : '123456' }, 
        headers: '',}, function (error, response) {
            token = response.body.token
            expect(response.statusCode).toEqual(200);
            done();
        })
    })
});

describe('users', ()=>{
    it('deve retornar 200 código de resposta', function (done) {
        request.get(`${endpoint}/users`, {headers: {Authorization :`Bearer ${token}`}}, function (error, response) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('deve retorna 200 código da resposta', (done)=>{
        request.post(`${endpoint}/users`, 
        {json: true, body: {'nome': 'SOUSA', 'senha': '123456'}, headers: {Authorization: `Bearer ${token}`}}, (error, response)=>{
            expect(response.statusCode).toEqual(201);
            done();
        })
    })
})