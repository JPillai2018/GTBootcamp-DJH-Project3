var Nightmare = require("nightmare");

new Nightmare({ show: true })
  // Visit login page
  .goto("https://localhost:8087/")
  // Enter user email.
  .type("#inlineFormInputGroupUsername2", "juhi@gmail.com")
  // Enter password.
  .type("#inlineFormInputGroupPassword2", "juhi@1919")
  // Click login button.
  .click("#btnLogin")
  
  // End test
  .end()
  // Execute commands
  .then(function() {
    console.log("Done Testing...!");
  })
  // Catch errors
  .catch(function(err) {
    console.log(err);
  });

