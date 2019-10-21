let topics = ["Michael Jordan", "Lebron James", "Tom Brady", "Aaron Donald", "Julio Jones", "Ed Reed", "Ray Lewis", "Dan Marino", "Peyton Manning"]


function getAthleteName() {
    let athleteName = $(this).attr("data-name");
    console.log(athleteName);

}

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
$("#ath-add").on("click", function (event) {
    event.preventDefault();

    let athName = $("#name-input").val().trim();

    topics.push(athName);

    createButtons();
})


$(document).on("click", ".player", getAthleteName);


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

                let playerImage = $("<img>");
                playerImage.attr("src", results[i].images.fixed_height.url);

                gifyDiv.prepend(p);
                gifyDiv.prepend(playerImage);

                $("#gifs-appear-here").prepend(gifyDiv);
                console.log(results);

            }
            


        });
})