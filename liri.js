// // Load fs so we can read/write
var fs = require("fs");

require("dotenv").config();

// Load the NPM Package inquirer
var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./keys.js");
var request = require("request");
var moment = require('moment');

// Spotify-related
const env = process.env;
var spotify = new Spotify({
    id: env.SPOTIFY_ID,
    secret: env.SPOTIFY_SECRET
});
// Spotify-related

var command = process.argv[2];
var userInput = process.argv[3];


inquirer.prompt([

    {
      type: "input",
      movie: "movie",
      message: "Please, enter a movie title: "
    }

]).then(function(user) {

// Do something

// If the user doesn't guess the movie title...
else {
    //Do something
}
});


// Spotify song search function

// OMDB Movie Search function

// Band/concert search function

function movieSearch() {

    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
    if (!userInput) {
        userInput = "Mr. Nobody";
    }

    if (!error && response.statusCode === 200) {
        function(response) {
            console.log("The movie's rating is: " + response.data.imdbRating);
        });
    }
    
} 



moment().format();

