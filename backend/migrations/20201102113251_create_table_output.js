exports.up = function(knex) {
    return knex.schema.createTable('output', table =>{
        table.increments('saida_id').primary()
        table.string('data_saida').notNull()
        table.string('produto_codigo').notNull()
        table.string('produto_nome').notNull()
        table.float('preco_custo').notNull()
        table.float('preco_venda').notNull()
        table.integer('quantidade').notNull()
        table.float('total').notNull()
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('output')
  
};