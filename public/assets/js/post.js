$(document).ready(function() {
    var submitted = false;
    var name = "";
    var firstName = localStorage.getItem("UserName");
    console.log(firstName)

    $("#newblogsubmitbtn").on("click", function(event) {
        event.preventDefault();
               
        if (submitted === false) {

            var thread = $("#arguments option:selected").val().trim();
            var topic = $("#title").val().trim();
            var post = $("#formbody").val().trim();
            var name = firstName;

             var derps = {
                 thread,
                 topic,
                 post,
                 name,   
             };
             
             $.post("api/derps", derps)
             .then(function(){   
             document.getElementById("blog").reset();
            })

        } else {
                
        var thread = $("#arguments option:selected").val().trim();
        var topic = $("#title").val().trim();
        var post = $("#formbody").val().trim();
        var name = firstName; 

             var derps = {
                 thread,
                 topic,
                 post, 
                 name,
             };
           
             $.post("api/derps", derps)
             .then(function(){
              createNewRow()   
              document.getElementById("blog").reset();
            })
        }
                   
    });

    function createNewRow() {
        $("#Masterrace").empty();
        $("#Xbo").empty();
        $("#Pstation").empty();
        $("#Ninpoke").empty();
        $("#Newing").empty();
        $("#Critics").empty();
        
   
        $.get("/api/derps", function(post) {

            for (i = 0; i < post.length; i++) {
                $(".named").empty();
                
               
                var newPostCard = $("<div>").data("id", post[i].id);
                var newPostCardHeading = $("<div>");
                var deleteBtn = $("<button class = 'delete btn btn-danger'>").text("x");
                //var editBtn = $("<button class = 'edit btn btn-default'>").text("Edit");
                var newPostTitle = $("<h4>").text(post[i].topic);
                var newPostDate = $("<div>");
                var newPostCategory = $("<h5>").data(post[i].category);
                var newPostCardBody = $("<div>");
                var newPostBody = $("<p class='forumtags'>").text(post[i].post);
                var formattedDate = new Date(post[i].createdAt);
                var newName = $("<h5> User: " + post[i].name + " posted this on " + formattedDate + "</h5>");
                

                formattedDate = moment(formattedDate).format("lll");
                newPostTitle.append(newPostDate);
                 newPostTitle.append(newPostDate);
                 newPostCardHeading.append(deleteBtn);
                 //newPostCardHeading.append(editBtn);
                 newPostCardHeading.append(newPostTitle);
                 newPostCardHeading.append(newPostCategory);
                 newPostCardBody.append(newPostDate);
                 newPostCardBody.append(newPostBody);
                 newPostCard.append(newPostCardHeading);
                 newPostCard.append(newPostCardBody);
                 newPostCard.prepend(newName);
                 
                 
                 
                 
                 switch(post[i].thread)
                 {
                     case "Indie Gaming on PC":
                     $("#Masterrace").prepend(newPostCard)
                     break;
                     case "Indie Gaming on Xbox":
                     $("#Xbo").prepend(newPostCard)
                     break;
                     case "Indie Gaming on Playstation":
                     $("#Pstation").prepend(newPostCard)
                     break;
                     case "Indie Gaming on Nintendo":
                     $("#Ninpoke").prepend(newPostCard)
                     break;
                     case "Indie Gaming Reviews":
                     $("#Critics").prepend(newPostCard)
                     break;
                     default:
                     $("#Newing").prepend(newPostCard);
                     break;
                 }
   
            }
                    
        });
            
    }

    

    $(document).on("click", "button.delete", handlePostDelete); 
    
    function handlePostDelete() {
        var currentPost = $(this)
          .parent()
          .parent()
          .data("id");
        deletePost(currentPost);
    };

    function deletePost(id) {
        $("#Derpa").empty();
        $.ajax({
          method: "DELETE",
          url: "/api/derps/" + id
        })
        .then(function(){
            createNewRow();
        })
            
        
    };

    $(".titlelinks").on("click", function() {
        console.log("I've been clicked!");
        if (submitted === false) {
        submitted = true;
        createNewRow()
        } else {
        submitted = false;
        $("#Masterrace").empty();
        $("#Xbo").empty();
        $("#Pstation").empty();
        $("#Ninpoke").empty();
        $("#Newing").empty();
        $("#Critics").empty();
        $(".named").empty();
        } 
    });


    //$(document).on("click", "button.edit", handlePostEdit);
    
})    