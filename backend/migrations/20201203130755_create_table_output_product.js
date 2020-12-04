exports.up = function(knex) {
    return knex.schema.createTable('output_product', table =>{
        table.increments('saida_id').primary()
        table.string('data_saida').notNull()
        table.string('codigo_produto').notNull()
        table.string('nome_produto').notNull()
        table.float('preco_custo').notNull()
        table.float('preco_venda').notNull()
        table.integer('quantidade').notNull()
        table.float('total').notNull()
        table.integer('usuario_id').references('id').inTable('users').notNull()
    }) 
};

exports.down = function(knex) {
    return knex.schema.dropTable('output_product')
  
};