//Assigning the initial array of players
let topics = ["Michael Jordan", "Lebron James", "Tom Brady", "Aaron Donald", "Julio Jones", "Ed Reed", "Ray Lewis", "Dan Marino", "Peyton Manning"]


function getAthleteName() {
    let athleteName = $(this).attr("data-name");
    console.log(athleteName);

}

// A function to create the player buttons
function createButtons() {
    $("#buttons-spot").empty();

    // Loops through the array of players
    for (let i = 0; i < topics.length; i++) {

        // Makes buttons for every player in the array with JQuery
        let btns = $("<button>");

        // Adds a class of "player" to the buttons that are created
        btns.addClass("player");

        // Adds an attribute of "data-name to each button"
        btns.attr("data-name", topics[i]);

        // Adds the text to the buttons
        btns.text(topics[i]);

        // Adds the buttons to the HTML
        $("#buttons-spot").append(btns);
    }
}

// This handles any event in which a button is clicked
$("#ath-add").on("click", function (event) {
    event.preventDefault();
    // This takes the text entered into the text area and makes a button
    let athName = $("#name-input").val().trim();

    // This pushes the button to the topics array
    topics.push(athName);

    createButtons();
})

//Ajax call for the giphy API
$("button").on("click", function () {
    let player = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        player + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // Loops through the 
            let results = response.data;
            for (let i = 0; i < results.length; i++) {

                let gifyDiv = $("<div>");
                let rating = results[i].rating;

                let p = $("<p>").text("Rating: " + rating);

                let playerImage = $("<img>");
                playerImage.attr("src", results[i].images.fixed_height.url);

                gifyDiv.prepend(p);
                gifyDiv.prepend(playerImage);

                $("#gifs-appear-here").prepend(gifyDiv);
                console.log(results);

            }
            $(".gif").on("click", function () {

                let state = $(this).attr("data-state");
                let animateUrl = $(this).attr("data-animate");
                let pauseUrl = $(this).attr("data-still");
                console.log(state);



                if (state === "still") {
                    $(this).attr("src", animateUrl);
                    $(this).attr("data-state", "animate");

                } else {
                    $(this).attr("src", pauseUrl);
                    $(this).attr("data-state", "still");
                }


            })


        });
})
