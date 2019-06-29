
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('personal').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('personal').insert([
        {
          personalName: "Reddit",
          personalSite: "https://www.reddit.com/"
        },
        {
          personalName: "LinkedIn",
          personalSite: "https://www.linkedin.com/uas/login"
        },
        {
          personalName: "Youtube",
          personalSite: "https://www.youtube.com/"
        }
      ]);
    });
};
