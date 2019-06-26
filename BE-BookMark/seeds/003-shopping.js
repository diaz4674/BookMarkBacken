
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('financial').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('financial').insert([
        {
          name: "Amazon",
          site: "https://www.amazon.com/"
        },
        {
          name: "Best Buy",
          site: "https://www.bestbuy.com/"
        }
      ]);
    });
};
