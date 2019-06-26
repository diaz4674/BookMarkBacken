
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('personal').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('personal').insert([
        {
          name: "Reddit",
          site: "https://www.reddit.com/"
        },
        {
          name: "LinedIn",
          site: "https://www.linkedin.com/uas/login"
        },
        {
          name: "Youtube",
          site: "https://www.youtube.com/"
        }
      ]);
    });
};
