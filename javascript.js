$(document).ready(function () {
    let topics = ["Michael Jordan", "Lebron James", "Tom Brady", "Aaron Donald", "Julio Jones", "Ed Reed", "Ray Lewis", "Dan Marino", "Peyton Manning"]


    // A function to create the celebrity buttons
    function createButtons() {
        $("#buttons-spot").empty();


        for (let i = 0; i < topics.length; i++) {

            let btns = $("<button>");

            btns.addClass("game");

            btns.attr("data-name", topics[i]);

            btns.text(topics[i]);

            $("#buttons-spot").append(btns);
        }
    }

    createButtons();

    $("button").on("click", function () {
        let player = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            player + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                let results = response.data;
                for (let i = 0; i < results.length; i++) {

                    let gifyDiv = $("<div>");
                    let rating = results[i].rating;

                    let p = $("<p>").text("Rating: " + rating);


                    let animated = results[i].images.fixed_height.url;
                    let still = results[i].images.fixed_height_still.url;

                    let playerImage = $("<img>");
                    playerImage.attr("src", still);
                    playerImage.attr("data-still", still);
                    playerImage.attr("data-animate", animated);
                    playerImage.attr("data-state", "still");
                    playerImage.addClass("player-image");



                    gifyDiv.prepend(p);
                    gifyDiv.prepend(playerImage);

                    $("#gifs-appear-here").prepend(gifyDiv);
                    console.log(results);
                }

            });
    })
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
    $("#ath-add").on("click", function (event) {
        event.preventDefault();

        let athName = $("#name-input").val().trim();

        topics.push(athName);

        createButtons();
    })
})