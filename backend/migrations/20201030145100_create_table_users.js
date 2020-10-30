exports.up = function(knex) {
    return knex.schema.createTable('users', table =>{
        table.increments('userId').primary()
        table.string('nome').notNull()
        table.string('senha').notNull()
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};