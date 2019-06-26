
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
      users.increments()

      users.string('email', 255)
      .notNullable()
      .unique()

      users.string('password',255).notNullable()
  })

  .createTable('financial', (tbl) => {
      tbl.increments()
      tbl.string('FinancialName').notNullable()
      tbl.string('FinancialSite').notNullable()
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

  
};

exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('users')
};
