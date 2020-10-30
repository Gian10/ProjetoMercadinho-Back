exports.up = function(knex) {
    return knex.schema.createTable('input', table =>{
        table.increments('entradaId').primary()
        table.string('dataEntrada').notNull()
        table.string('produtoCodigo').notNull()
        table.string('produtoNome').notNull()
        table.float('precoCusto').notNull()
        table.float('precoVenda').notNull()
        table.integer('quantidade').notNull()
        table.float('total').notNull()
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('input')
  
};