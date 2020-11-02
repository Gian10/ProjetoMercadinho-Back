exports.up = function(knex) {
    return knex.schema.createTable('product' ,table =>{
        table.increments('produto_id').primary()
        table.string('nome_produto').notNull()
        table.string('codigo').notNull()
        table.float('preco_custo').notNull()
        table.float('preco_venda').notNull()
        table.integer('estoque').notNull()
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('product')
  
};