
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shopping').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('shopping').insert([
        {
          storeName: "Amazon",
          storeSite: "https://www.amazon.com/"
        },
        {
          storeName: "Best Buy",
          storeSite: "https://www.bestbuy.com/"
        }
      ]);
    });
};
