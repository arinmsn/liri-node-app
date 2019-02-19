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

console.log("       ┌──────────────────────────────────────────────────┐ ");
console.log("       │                     Welcome!                     │ ");
console.log("       │         LIRI is similiar to iPhone's SIRI.       │ ");
console.log("       │      It's a command-line node app that will      │ ");
console.log("       │ return data back at you. Follow the instructions │ ");
console.log("       │                and start searching.              │ ");
console.log("       └──────────────────────────────────────────────────┘ ");
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
        },

        {
            name: "song",
            type: "input",
            message: "Go ahead and search for a song: "
        },

        {
            name: "band",
            type: "input",
            message: "Search for a band: "
        }
        
        ]).then(function(response) {

            function begin(command, userInput) {
                switch (command) {
                    case ""
                        // Do something
                        break;

                    case ""
                        // Do something
                        break;

                    case ""
                        // Do something
                        break;

                    default:
                        // instructions? 
                        break;
                } // End of Switch
            }

    
            // if(response.movie.length > 0) {
            //     searchMovie(userInput);
            // } else {
            //     searchMovie("Mr. Nobody");
            //     console.log("Since you didn't enter anything,");
            //     console.log("here is Mr. Nobody's rating.")
            // }
        });

} // End of liri() 
// liri();




function searchMovie(error, userInput) {
        if (userInput == "" || userInput == undefined){
            userInput = "Mr. Nobody";
            // searchMovie("Mr. Nobody");
            console.log("Haven't watched it? Check it out here: <https://www.imdb.com/title/tt0485947/> It's on Netfix!");
        } else {

        }

        axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
        function(err, response, data) {
            if (err) {
                return console.log('Apologize for the inconvenience Error:  ' + err);
            // console.log("Title: " + data.Title);
            // console.log("The movie's rating is: " + response.data.imdbRating);
            } else {
                var movie = JSON.parse(data); // (data)
                console.log("Title of the movie: " + movie.Title);
                console.log("Year the movie came out: " + movie.Year);
                console.log("IMDB Rating of the movie: " + movie.imdbRating);
                console.log("Country where the movie was produced: " + movie.Country);
                console.log("Language of the movie: " + movie.Language);
                console.log("Plot of the movie: " + movie.Plot);
                console.log("Actors in the movie" + movie.Actors);
            }
        });
} 





