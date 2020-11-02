exports.up = function(knex) {
    return knex.schema.createTable('input', table =>{
        table.increments('entrada_id').primary()
        table.string('data_entrada').notNull()
        table.string('produto_codigo').notNull()
        table.string('produto_nome').notNull()
        table.float('preco_custo').notNull()
        table.float('preco_venda').notNull()
        table.integer('quantidade').notNull()
        table.float('total').notNull()
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('input')
  
};