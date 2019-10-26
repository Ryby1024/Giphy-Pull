$(document).ready(function () {
    let topics = ["Michael Jordan", "Lebron James", "Tom Brady", "Aaron Donald", "Julio Jones", "Ed Reed", "Ray Lewis", "Dan Marino", "Peyton Manning"]


    // A function to create the celebrity buttons
    function createButtons() {
        $("#buttons-spot").empty();


        for (let i = 0; i < topics.length; i++) {

            let btns = $("<button>");

            btns.addClass("ath");

            btns.attr("data-name", topics[i]);

            btns.text(topics[i]);

            $("#buttons-spot").append(btns);
        }
    }
    // Pushes the player typed into the textarea to the array and makes a button.
    $("#ath-add").on("click", function (event) {
        event.preventDefault();

        var athName = $("#name-input").val().trim();
        if (athName == "") {
            confirm("Must enter a name");
            $(athName).empty();
            
        } else {
            topics.push(athName);

            createButtons();
        }
        
        
        

        $("#giphy-form input[type='text']").val("");

    })
    



    // Retrieves the API data from Giphy.

    function getGif() {
        let player = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            player + "&api_key=oF3l3xuw1hG8JwWxkayloYDLTn0XsBRJ&limit=10";
        $("#gifs-appear-here").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                let results = response.data;
                for (let i = 0; i < results.length; i++) {

                    let gifyDiv = $("<div>");
                    let rating = results[i].rating;
                    let title = results[i].title;
                    let t = $("<p>").text("Title: " + title);

                    let p = $("<p>").text("Rating: " + rating);

                    // Set attributes for the still and animate options.
                    let animated = results[i].images.fixed_height.url;
                    let still = results[i].images.fixed_height_still.url;

                    let playerImage = $("<img>");
                    playerImage.attr("src", still);
                    playerImage.attr("data-still", still);
                    playerImage.attr("data-animate", animated);
                    playerImage.attr("data-state", "still");
                    playerImage.addClass("player-image");


                    // Add the data retrieved from Giphy to the HTML.
                    gifyDiv.prepend(p);
                    gifyDiv.prepend(t);
                    gifyDiv.prepend(playerImage);

                    $("#gifs-appear-here").prepend(gifyDiv);
                    console.log(results);
                }

            });
    }

    // Function that allows you to click on a gif to animate it or pause it.
    $(document).on("click", ".player-image", function () {
        let state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    })
    createButtons();
    $(document).on("click", ".ath", getGif)

})