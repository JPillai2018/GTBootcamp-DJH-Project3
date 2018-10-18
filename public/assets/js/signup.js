$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var fnameInput = $("input#sfname");
  var lnameInput = $("input#slname");
  var emailInput = $("input#semail");
  var passwordInput = $("input#spassword");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    fnameInput = $("input#sfname");
    lnameInput = $("input#slname");
    emailInput = $("input#semail");
    passwordInput = $("input#spassword");
    console.log("F=" + fnameInput.val() + " L=" +  lnameInput.val() + " E=" + emailInput.val() + " P=" + passwordInput.val());
    var userData = {
      fname: fnameInput.val(),
      lname: lnameInput.val(),
      email: emailInput.val(),
      password: passwordInput.val()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.fname, userData.lname, userData.email, userData.password);
    fnameInput.val("");
    lnameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(fname, lname, email, password) {
    $.post("/api/signup", {
      fname: fname,
      lname: lname,
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
