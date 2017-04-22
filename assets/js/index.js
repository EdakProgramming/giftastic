// Create an array that contains super heroes
var superHeroes = ["Deadpool", "Batman", "Iron-Man", "Superman", "Hellboy"];

// Create buttons for each index in the array
function heroButton() {
    for (var i = 0; i < superHeroes.length; i++) {
        $("#super-buttons").append("<button class='super-hero'id='" + superHeroes[i] + "'>" + superHeroes[i] + "</button>")
    } //End of For Loop

    // Clicking each button will display 10 gifs that correspond to a certain super hero
    $("button").click(function() {
        var buttonClicked = this.id;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonClicked + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            $("#super-display").html('');
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var superDiv = $("<div>");
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                // Creating and storing an image tag
                var superImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                // and adding the "gif" class to the element for later manipulation
                superImage.attr({src: results[i].images.fixed_height.url, class:"gif" });
                // Appending the paragraph and image tag to the superDiv
                superDiv.append(p);
                superDiv.append(superImage);
                $("#super-display").prepend(superDiv);
            }
        }); //End of .done
    });

// 1 click on the giph will make the gif animated. A second click will make it stop
// Could not get it to work :-(
}

//function to add a button 
// The user can input a super hero's name
function getInput() {

    $('#addSuper').on('click', function() {
    	event.preventDefault();
    	var buttonInput = $('#userInput').val().toLowerCase();   
        superHeroes.push(buttonInput);
        $("#super-buttons").html('');
        heroButton();
        $('#userInput').val('');

        // On submit, another index in the array will be added, which has the same behavior

    });
}
// Function Call backs
heroButton();
getInput();
 //Fuck these change