// Requiring our sequelize models and passport
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware. We are using local strategy for authentication.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  // app.post("/api/login", passport.authenticate("local", {successRedirect: "/members" , failureRedirect: "/login"}));
  // Uses local strategy with email as user id and password
  console.log("BBBBBBBBBBBBBBBBBB");
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    alert("successfully logged in");
    console.log("Login Response=" + res.body );
    res.json("/");
  });
  //
  
  //Route to login page if user failed to login. I created this to allow flash messages and not interfere with regular login route
  app.get("/loginfailed", function(req, res){
    if (!req.user){
      alert("success", "Username or password is incorrect.");
      res.redirect("/login");
    }
  });
  //
  // Route for signing up a user/Creating a new User credential. 
  // The user's password is hashed and stored securely.
  // If the user is created successfully, proceed to log the user in page for logging in.
  // If the use is not able to be signed up, then send an error back.
  app.post("/api/signup", function(req, res) {
    

    db.User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      logged: true
    }).then(function() {
      console.log("ErrorMsg1=" + err.responseJSON);
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log("ErrorMsg2=" + err);
      res.json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res)
  {
    req.logout();
    res.redirect("/allvisitors");
  });

//update logged off on the database by setting state to false
app.get("/api/leave/", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({}).then(function(dbTodo) {
      res.json(dbTodo);
    });
    res.redirect("/logout");
  });

//once logout update the logged state
app.put("/logout", function (req, res)
{
  db.User.update(
  { logged: false},
  {
    where: {  email: req.body.email}
  }).then(function (getUpdate) {
    res.json(getUpdate);
  });
});
//end of logout area

//update login state
app.put("/api/login", function (req, res)
{
  db.User.update(
  { logged: true},
  {
    where: { email: req.body.email}
  }).then(function (getUpdate) {
    res.json(getUpdate);
  });
});

// Routes for Posts/Blogs
// GET route for getting all of the posts
}
