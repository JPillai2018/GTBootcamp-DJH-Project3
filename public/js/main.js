// Javascript file to handle Blog related logic. 
// Main operations include Add blog, Update blog, Delete blog
// We have section in this file
// Members Page- Create new Blog

$(document).ready(function() {
//*****************************************************Login Submission***************************************************************/
// Getting references to our form and input
  var loginForm = $("form.form-inline"); 
  var signUpForm = $("form.signup");
  console.log("loginForm=" + loginForm);
  console.log("signUpForm=" + signUpForm);
  //var fName = $("input#fname");
  //var lName = $("input#lname");
  //var emailInput = $("input#semail");
  //var passwordInput = $("input#spassword");
  
  //var username = usersname.substring(0, usersname.indexOf('@'));
  // When the signup button is clicked, validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    var fName = $("input#fname");
    var lName = $("input#lname");
    var emailInput = $("input#semail");
    var passwordInput = $("input#spassword");
    console.log("DDDDDDDDDDDDD");

    var fname = fName.val();
    var lname = lName.val();
    var usersname = emailInput.val();
    username = usersname.substring(0, usersname.indexOf('@'));
    console.log("F=" + fname + " L="+ lname + " E=" + usersname + " P=" + passwordInput.val()); 
    var userData = {
        fname: fname,
        lname: lname,
        email: emailInput.val(),
        password: passwordInput.val()
    };

    //if email or password not submitted jump out of the function
    if (!userData.email || !userData.password) {
        console.log("Invalid Input...");
        var modal = $(this);
        modal.find('#signupmessage').value('Incorrect Sign Up Entry!!!');
         $("#registerModal").modal("show");
        return;
    }
    else{
        console.log("Good Input...");
        var modal = $(this);
        modal.find('#signupmessage').text('');
         $("#registerModal").modal("hide");     
         console.log("CCCCCCCCCCCCC0");      
    }
    console.log("CCCCCCCCCCCCC1");
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    console.log("CCCCCCCCCCCCC2");
    fname.val("");
    lname.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    console.log("CCCCCCCCCCCCC");
    console.log("FFFF=" + userData.fname);
    localStorage.setItem("CometData", userData);
    $.post("/api/signup", {
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        password: userData.password
    }).then(userdata =>  {
      window.location.replace("/");
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(3500);
  }

//***************************************************Register Submission**************************************************************/
    // Button click logic
    // $("#btnLogin").on("click", loginUser);


    // function loginUser(){
    //   event.preventDefault();
    //   console.log("Aha Aha Aha Aha");
    //   var email = $("#inlineFormInputGroupUsername2").val();
    //   var password = $("#inlineFormInputGroupPassword2").val();
    //   console.log("UserName=" + email + "  " + "Password" + password);
    //   return;
    // Getting references to our form and inputs for user login password and email
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
    // this.showModal = false;
    //var loginForm = $("form.login");
    // console.log("Email=" + emailInput);
    // console.log("Password=" + passwordInput);
    //  var lsmsg = localStorage.getItem("lsmsg");
    //  console.log("Login Message =" + lsmsg);
    //FunctionloginForm passes in the email and password and creates a local storage
    //for user email, updates the logged state to true, and passes the email and
    //password to validate user login.
    loginForm.on("submit", function(event) {
        //this.showModal = false;
        //$('#loginModal').modal('toggle');  
        //return false;
        loginForm = $("form.form-inline"); ;
        var emailInput = $("input#inlineFormInputGroupUsername2");
        var passwordInput = $("input#inlineFormInputGroupPassword2");
        console.log("Email=" + emailInput.val());
        console.log("Password=" + passwordInput.val());
        var lsmsg = localStorage.getItem("CometSession");
        console.log("Login Message =" + lsmsg);
        event.preventDefault();
        return;
        var userData = 
        {
            email: emailInput.val(),
            password: passwordInput.val()
        };
       localStorage.removeItem("CometSession");
       localStorage.setItem("CometSession", email);
       //if email or password not submitted jump out of the function
       if (!userData.email || !userData.password) {
           console.log("Invalid Input...");
            //var modal = $(this);
            //modal.find('#loginmessage').text('Incorrect Login Entry!!!');
            //$("#loginModal").modal("show");            
         return;
       }
       else{
        var modal = $(this);
        //modal.find('#loginmessage').text('');
        //$("#loginModal").modal("show");    
        //    $("#loginModal").modal("hide");           
       }
       //call login function and put email in local storage
       login();
       //update the login state to true
       updateLogState(userData.email);
       //if valid email and password go ahead and pass to loginUser function
       //console.log("Email4=" + userData.email + " Password4=" + userData.password);
       loginUser(userData.email, userData.password);
       //clear out the values after logged in
       console.log("AAAAAAAAA After login");
       emailInput.val("");
       passwordInput.val("");
     });
    
     // loginUser does a post to our "api/login" route to determine users that are current logged in
     function loginUser(email, password) {
         console.log("Email-1=" + email);
         console.log("Password-1=" + password);
       $.post("/api/login", 
       {
         email: email,
         password: password
       })
       .then(function(data) {
         window.location.replace(data);
       }).catch(handleLoginErr);
       
     }
   
     // Update the database to indicate the user is currently logged in.
     function updateLogState(email) 
     {
       var loginData=
       {
         email:email,
         logged:true
       }
       //calling ajax call to update the login state of the user then get the updated data from api call
     $.ajax({
       method : "PUT",
       url : "/api/login",
       data: loginData
     })
     // .then(getUpdate);
     }
   
     // Saving Email/User Id in local storage
     function login() 
     {
       //console.log("Saving email in to local storage");
       //Clear current local storage before adding fresh entry
       localStorage.removeItem("CometSession");
       //get the user email, store in local storage
       var email = $("#email").val().trim();
       localStorage.setItem("CometSession", email);
       //clear the email value
       $('#email').val(''); 
     }
   
   
     function handleLoginErr(err) {
   
       $(".alert").show();
       $(".alert").fade(5000);
   
     }
   
   //});
//**********************************************************************************************************************/   
   


//*********************************************************************************************************************/
// $(document).ready(function() {
    // Add Blog Button click control logic
    var newPostYes = "No";
    var firstTime = "Yes";
    var editPost = "No";
    var newBlogStatus = "";

    // Getting the initial list of posts
    getAllPosts();
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var postId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?post_id=") !== -1) {
      postId = url.split("=")[1];
      getPostData(postId);
    }
  
    // Getting jQuery references to the post body, title, form, and category select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var blogForm = $("#blog");

    //var postCategorySelect = $("#category");
    // Submits a new post and brings user to blog page upon completion
    function submitPost(Post) {
      $.post("/api/posts/", Post, function() {
        newPostYes = "No";
        showhideblogwindow();
        window.location.href = "/blog";
      });
    }
  
    // Gets post data for a post if we're editing
    function getPostData(id) {
      $.get("/api/posts/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
          console.log("BlogStatus11" + newBlogStatus);
          showhideblogwindow();
        }
      });
    }
  
    // General functions
    // Members Page- Blog Management
    // blogContainer holds all of our posts
    var blogContainer = $(".blog-container");
    //var postCategorySelect = $("#category");
    var posts;
    // This function grabs posts from the database and updates the view
    function getAllPosts(category) {
        var categoryString = category || "";
        if (categoryString) {
        categoryString = "/category/" + categoryString;
        }
        $.get("/api/posts", function(data) {
        //console.log("Posts", data);
        //console.log("Category=" + categoryString);
        posts = data;
        if (!posts || !posts.length) {
            displayEmpty();
        }
        else {
            initializeRows();
        }
        });
    }

    // InitializeRows handles appending all of our constructed post HTML inside
    // blogContainer
    function initializeRows() {
        blogContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
        postsToAdd.push(createNewRow(posts[i]));
        }
        blogContainer.append(postsToAdd);
        blogContainer.append("<div><br></br></div>");
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
        var newPostCard = $("<div>");
        newPostCard.addClass("card mx-auto");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var newPostTitle = $("<h5>");
        var newPostDate = $("<small>");
        var newPostCategory = $("<h6>");
        //newPostCategory.text(post.category);
        // newPostCategory.css({
        // float: "right",
        // "font-weight": "700",
        // "margin-top":
        // "-15px"
        // });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        var formattedDate = new Date(post.createdAt);
        //formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        formattedDate = moment(formattedDate).format("lll");
        formattedDate = formattedDate + ".       Posted by " + post.email;
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostCategory);
        newPostCardBody.append(newPostDate);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.append("<br>");
        newPostCard.data("post", post);
        return newPostCard;
    }

    // This function displays a message when there are no posts
    function displayEmpty() {
        blogContainer.empty();
        var messageH2 = $("<h6>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No posts yet for this category.Please create a new post.");
        blogContainer.append(messageH2);
    }



});