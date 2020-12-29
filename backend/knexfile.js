// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      host: 'mercadinho-araujo.c1itw3qweo6h.us-east-2.rds.amazonaws.com',
      port: '5432',
      database: 'mercadinho_araujo',
      user:     'postgres',
      password: 'espanha1994'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
