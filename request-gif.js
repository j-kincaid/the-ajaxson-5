// The AJAXson 5

// Jessica Kincaid
// January 12, 2019
// LC101 JavaScript


$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed

});


function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    // set some variables to handle the data that you'll need to before the gif request is sent so that'd be the search query text and the "5"
    // make that bit that sends the request part of a else statement. Make the an if statement that checks that num-validate info

    // get the user's input text from the DOM
    var searchQuery = "dance"; // TODO should be e.g. "dance"
    var numberCheck = $('#numData').val();

    if (numberCheck != 5) {
        $("#feedback").text("No GIFs for you.");
    }


    // configure a few parameters to attach to our request
    var params = {
        api_key: "6WqJOT4ORaSbgX4NQX7k7VwwmT0ub3LL",
        tag: "jackson 5", // DONE should be e.g. "jackson 5 dance"
    };

    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent? (DONE)
        data: params, // attach those extra parameters onto the request



        success: function(response) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);

            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            $("#gif").attr("src", response.data.image_url);
            // 2. hide the feedback message and display the image

            $("#feedback p").empty();

            setGifLoadedStatus(true);
        },

        error: function() {
            // if something went wrong, the code in here will execute instead of the success function

            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");

            setGifLoadedStatus(false);
        }

    });
}

// TODO 
// give the user a "Loading..." message while they wait
$("#response").html("<p>Loading...</p>");
setGifLoadedStatus(false);



/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */

function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}