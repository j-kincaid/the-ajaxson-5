// The AJAXson 5

// Jessica Kincaid
// January 12, 2019
// LC101 JavaScript


$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
    // $('#numData').keyup(function() {
    //     if ($(this).val() != 5) {
    //         $(document.body).append("No GIFs for you");
    //         $(this).val('5');
    //     }
    // });

    // $("button").keyup(function() {
    //     if ($(this).val() != 5) {
    //         document.write("No GIFs for you!");
    //         $(this).val('5');
    //     }
    // })
});


// jQuery functions to use:

// $(someSelector).attr() $("img").attr("width","500");
// $(someSelector).html() $("img").html("<p></p>");
// $(someSelector).val() use with input
// $(someSelector).find() returns descendant elements of selected element

/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    // set some variables to handle the data that you'll need to before the gif request is sent so that'd be the search query text and the "5"
    // make that bit that sends the request part of a else statement. Make the an if statement that checks that num-validate info

    // get the user's input text from the DOM
    var searchQuery = "dance"; // TODO should be e.g. "dance"
    var "#numData" = 5;

    // configure a few parameters to attach to our request
    var params = {
        api_key: "6WqJOT4ORaSbgX4NQX7k7VwwmT0ub3LL",
        tag: "jackson 5", // DONE should be e.g. "jackson 5 dance"

    };

    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent? (DONE)
        data: params, // attach those extra parameters onto the request

        $("#numData").keyup(function() {
                if ($(this).val() != 5) {

                    setGifLoadedStatus(false);
                    // $(document.body).append("No GIFs for you");
                    $("#response").text("No GIFs for you");

                    $(this).val('5');
                }

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
                        // $("#feedback").text("Sorry, could not load GIF. Try again!");


                        // $("#feedback").text("No GIFs for you.");

                        // setGifLoadedStatus(false);
                    })
        }
    });
}
// TODO 
// give the user a "Loading..." message while they wait
$("#response").text("Loading...");
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