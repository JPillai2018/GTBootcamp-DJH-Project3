$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.form-inline");


  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var lemailInput = $("input#inlineFormInputGroupUsername2");
    var lpasswordInput = $("input#inlineFormInputGroupPassword2");
    var userData = {
      email: lemailInput.val(),
      password: lpasswordInput.val()
    };
    localStorage.removeItem("CometSession");
    localStorage.setItem("CometSession", lemailInput.val());
    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    lemailInput.val("");
    lpasswordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    console.log("EL=" + email + " PL=" + password);
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace(data);
    }).catch(function(err) {
      console.log(err);
    });
  }

});
