$(document).ready(function() {
    var submitted = false;
    
    $("#newblogsubmitbtn").on("click", function(event) {
        event.preventDefault();

        if (submitted === false) {

            var thread = $("#arguments option:selected").val().trim();
            var topic = $("#title").val().trim();
            var post = $("#formbody").val().trim();
        

             var derps = {
                 thread,
                 topic,
                 post,   
             };
             console.log("clicked");
             console.log(derps)
             $.post("api/derps", derps)
             .then(function(){   
             document.getElementById("blog").reset();
            })

        } else {
                
        var thread = $("#arguments option:selected").val().trim();
        var topic = $("#title").val().trim();
        var post = $("#formbody").val().trim();
        

             var derps = {
                 thread,
                 topic,
                 post,   
             };
             console.log("clicked");
             console.log(derps)
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
        $(".named").empty();

        $.get("/api/derps", function(post) {
            for (i = 0; i < post.length; i++) {
                console.log(post);
                var newPostCard = $("<div>").data("id", post[i].id);
                var newPostCardHeading = $("<div>");
                var newName = $("<div class= 'named'>");
                var deleteBtn = $("<button class = 'delete btn btn-danger'>").text("x");
                //var editBtn = $("<button class = 'edit btn btn-default'>").text("Edit");
                var newPostTitle = $("<h4>").text(post[i].topic);
                var newPostDate = $("<div>");
                var newPostCategory = $("<h5>").data(post[i].category);
                var newPostCardBody = $("<div>");
                var newPostBody = $("<p class='forumtags'>").text(post[i].post);
                var formattedDate = new Date(post[i].createdAt);
                //formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
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
                     default:
                     $("#Newing").prepend(newPostCard);
                     break;
                 }

                 
               
                
            }
            $.get("/api/user_data").then(function(data) {
                mName = $("<h5> User: " + data.fname + " posted this on " + formattedDate + "</h5>");
                $(".named").prepend(mName);
            });
            
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
        console.log(this.value);
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
        $(".named").empty();
        } 
        if (this.value === 1) {
            console.log("Nuuuu!")
            this.value === 0;
            createNewRow();
        } else {
            this.value === 1;
            $("#Masterrace").empty();
            $("#Xbo").empty();
            $("#Pstation").empty();
            $("#Ninpoke").empty();
            $("#Newing").empty();
        }
    });


    //$(document).on("click", "button.edit", handlePostEdit);
    
})    