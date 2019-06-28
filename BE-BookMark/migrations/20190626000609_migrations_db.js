
exports.up = function(knex, Promise) {
    return knex.schema
    
    .createTable('users', users => {
        users.increments()
  
  
        users.string('username', 255)
        .notNullable()
  
        users.string('email', 255)
        .notNullable()
        .unique()
  
        users.string('password',255).notNullable()
    })
  
    .createTable('financial', (tbl) => {
        tbl.increments()
        tbl.string('FinancialName').notNullable()
        tbl.string('FinancialSite').notNullable()
        tbl.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE').notNullable()
 
    })
    .createTable('shopping', (tbl) => {
        tbl.increments()
        tbl.string('storeName').notNullable()
        tbl.string('storeSite').notNullable()
    })
    .createTable('personal', (tbl) => {
        tbl.increments()
        tbl.string('personalName').notNullable()
        tbl.string('personalSite').notNullable()
    })
    .createTable('usersDB', (tbl) => {
        tbl.increments()
        tbl.integer('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE').notNullable()
        tbl.integer('financial_id').references('id').inTable('financial').onDelete('CASCADE').onUpdate('CASCADE').notNullable()
        tbl.integer('shopping_id').references('id').inTable('shopping').onDelete('CASCADE').onUpdate('CASCADE').notNullable()
        tbl.integer('personal_id').references('id').inTable('personal').onDelete('CASCADE').onUpdate('CASCADE').notNullable()
    })
  
  };
  
  exports.down = async function (knex, Promise) {
      await knex.schema.dropTableIfExists('users')
      await knex.schema.dropTableIfExists('financial')
      await knex.schema.dropTableIfExists('shopping')
      await knex.schema.dropTableIfExists('personal')
      await knex.schema.dropTableIfExists('usersDB')
  };