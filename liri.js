// Load fs so we can read/write
var fs = require("fs");
require("dotenv").config();

// Load the NPM Package inquirer
var inquirer = require("inquirer");
var axios = require("axios");       // This will help us request data from APIs
var keys = require("./keys.js");
var request = require("request");
var moment = require('moment');
moment().format();

// // Spotify-related
// const env = process.env;

// var spotify = new spotify({
//     id: env.SPOTIFY_ID,
//     secret: env.SPOTIFY_SECRET
// });
// // Spotify-related

var command = process.argv[2];
var userInput = process.argv[3];

// Welcome page

console.log("┌──────────────────────────────────────────────────┐ ");
console.log("│                     Welcome!                     │ ");
console.log("│         LIRI is similiar to iPhone's SIRI.       │ ");
console.log("│      It's a command-line node app that will      │ ");
console.log("│ return data back at you. Follow the instructions │ ");
console.log("│                and start searching.              │ ");
console.log("└──────────────────────────────────────────────────┘ ");
console.log("");
console.log("");


function liri() {

    inquirer.prompt([

        // {
        //     name: "spotify",
        //     type: "input",
        //     messasge: "Enter a name of a song to search for: "
        // },

        {
            name: "movie",
            type: "input",
            message: "Enter title of a name to search for: "
        }
    
        ]).then(function(response) {
                if(response.movie.length > 0) {
                    searchMovie(userInput);
                } else {
                    searchMovie("Mr. Nobody");
                    console.log("Since you didn't enter anything,");
                    console.log("here is Mr. Nobody's rating.")
                }
        });

} // End of liri() 
liri();

function searchMovie(error, userInput) {
        axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function(response) {
            if (!error && response.statsCode === 200) {
            console.log("Title: " + data.Title);
            console.log("The movie's rating is: " + response.data.imdbRating);
            }
        });
} 





