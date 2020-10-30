exports.up = function(knex) {
    return knex.schema.createTable('output', table =>{
        table.increments('saidaId').primary()
        table.string('dataSaida').notNull()
        table.string('produtoCodigo').notNull()
        table.string('produtoNome').notNull()
        table.float('precoCusto').notNull()
        table.float('precoVenda').notNull()
        table.integer('quantidade').notNull()
        table.float('total').notNull()
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('output')
  
};