
exports.up = function(knex, Promise) {
    return knex.schema
    
    .createTable('users', users => {
        users.increments()
        users.string('username', 255).notNullable()
        users.string('email', 255).notNullable().unique()
        users.string('password',255).notNullable()
    })
  
    .createTable('financial', (tbl) => {
        tbl.increments()
        tbl.string('FinancialName').notNullable()
        tbl.string('FinancialSite').notNullable()
        tbl.integer('financial_user_id').notNullable()
    })
    .createTable('shopping', (tbl) => {
        tbl.increments()
        tbl.string('storeName').notNullable()
        tbl.string('storeSite').notNullable()
        tbl.integer('shopping_user_id').notNullable()
    })
    .createTable('personal', (tbl) => {
        tbl.increments()
        tbl.string('personalName').notNullable()
        tbl.string('personalSite').notNullable()
        tbl.integer('personal_user_id').notNullable()

    })
  
  };
  
  exports.down = async function (knex, Promise) {
      await knex.schema.dropTableIfExists('users')
      await knex.schema.dropTableIfExists('financial')
      await knex.schema.dropTableIfExists('shopping')
      await knex.schema.dropTableIfExists('personal')
  };