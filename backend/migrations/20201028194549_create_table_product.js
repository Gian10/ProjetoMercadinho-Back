
exports.up = function(knex) {
    return knex.schema.createTable('product' ,table =>{
        table.increments('id').primary()
        table.string('nomeProduto').notNull()
        table.string('codigo').notNull()
        table.float('precoCusto').notNull()
        table.float('precoVenda').notNull()
        table.integer('estoque').notNull()
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('product')
  
};
