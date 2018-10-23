var Nightmare = require("nightmare");

new Nightmare({ show: true })
  // Visit login page
  .goto("https://mighty-hamlet-89198.herokuapp.com/")
  // Enter user email.
  .type("#inlineFormInputGroupUsername2", "juhi@gmail.com")
  // Enter password.
  .type("#inlineFormInputGroupPassword2", "juhi@1919")
  // Click login button.
  .click("#btnLogin")
  //go to member page
  //.goto("https://mighty-hamlet-89198.herokuapp.com/members")
  //add post
  .type("#title","Favourite Game")
  .type("#formbody","Favourite Game is Mario")
  // submit post
  .click("#newblogsubmitbtn")
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

