
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('financial').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('financial').insert([
        { 
          FinancialName: "Wells Fargo", 
          FinancialSite: "https://www.wellsfargo.com/" 
        },
        {
          FinancialName: "Bank of America",
          FinancialSite: "https://www.bankofamerica.com/"
        },
        {
          FinancialName: "Chase",
          FinancialSite: "https://secure01a.chase.com/web/auth/dashboard"
        },
        {
          FinancialName: "Citi Bank",
          FinancialSite: "https://online.citi.com/US/login.do?locale=en_US"
        },
        {
          FinancialName: "Capital One",
          FinancialSite: "https://www.capitalone.com/"
        },
        {
          FinancialName: "American Express",
          FinancialSite: "https://www.americanexpress.com/"
        }
      ]);
    });
};
