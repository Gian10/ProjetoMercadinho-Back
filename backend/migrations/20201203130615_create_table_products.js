exports.up = function(knex) {
    return knex.schema.createTable('products' ,table =>{
        table.increments('produto_id').primary()
        table.string('nome_produto').notNull()
        table.string('codigo_produto').notNull()
        table.float('preco_custo').notNull()
        table.float('preco_venda').notNull()
        table.integer('estoque').notNull()
        table.integer('usuario_id').references('id').inTable('users').notNull()
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
  
};