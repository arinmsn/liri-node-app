// Load fs so we can read/write
var fs = require("fs");
require("dotenv").config();

// Load the NPM Package inquirer
var inquirer = require("inquirer");
var axios = require("axios");       // This will help us request data from APIs

var request = require("request");
var moment = require('moment');
moment().format();

// Spotify-related
const env = process.env;
        
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var bit = keys.bit; 


var command = process.argv[2];
// var userInput = process.argv[3];   //   .slice(3).join(" ")
var userInput = process.argv.slice(3).join("+");
str = userInput.split("+").join(" ")

//  ^---- If we omit this line, user will see "artist+name" vs. "artist name"

/*  **********
var command = process.argv[2];
// var userInput = process.argv[3];   //   .slice(3).join(" ")
var userInput = process.argv.slice(3).join("+");
str = userInput.split("+").join(" ")            
//  ^---- If we omit this line, user will see "artist+name" vs. "artist name"
                                                                                                */ 

function welcome() {

    console.log("   ┌─────────────────────────────────────────────────────────────────────────────────────────┐ ");
    console.log("   │                                         Welcome!                                        │ ");
    console.log("   ╞═════════════════════════════════════════════════════════════════════════════════════════╡ ");
    console.log("   │                                                                                         │ ");
    console.log("   │       LIRI is a similar to iPhone's SIRI. LIRI is a  Language Interpretation and        │ ");
    console.log("   │       Recognition Interface. LIRI will be a command line node app that takes in         │ ");
    console.log("   │                            parameters and gives you back data.                          │ ");
    console.log("   │                                                                                         │ ");
    console.log("   ├─────────────────────────────────────────────────────────────────────────────────────────┤ ");
    console.log("   │                                         Instructions                                    │ ");
    console.log("   ╞═════════════════════════════════════════════════════════════════════════════════════════╡ ");
    console.log("   │                                                                                         │ ");
    console.log("   |  No need to use ' ' and < >                                                             │ ");
    console.log("   │  To get concert information:  node liri.js 'concert-this` <'artist/band name'>          │ ");
    console.log("   │  To get info. about a song :  node liri.js 'spotify-this-song` <'song' 'artist/band'>   │ ");
    console.log("   │  To get a movie's info:       node liri.js 'movie-this` <'movie title'>                 │ ");
    console.log("   │  To let app randomly run:     node liri.js 'do-what-it-says'                            │ ");
    console.log("   │                                                                                         │ ");
    console.log("   └─────────────────────────────────────────────────────────────────────────────────────────┘ ");
    if (command === "" || command === undefined) {
        command = "User entered empty or undefined command."
        logData(`\n\nCommand: ${command}`);
    } else{ 
        logData(`\n\nCommand: ${command}`);
    }
} 

// init(command, userInput);

function init(command, userInput) {
    switch(command) {
        case "concert-this":
            concertIt(userInput);
            break;

        case "spotify-this-song":
            spotifyIt(userInput);
            // console.log("spotify!");
            break;
        
        case "movie-this":
            movieIt(userInput);
            // console.log("movies!");
            break;

        case "do-what-it-says":
            doIt(userInput);
            break;

        default:
        case "help":
            welcome();
            break;
    } // End of swtich
}
init(command, userInput);

function concertIt(userInput) {
    if (!userInput) {
        userInput = "Yanni";
        str = "Yanni";
    } 
    var queryURL = `https://rest.bandsintown.com/artists/${userInput}/events?app_id=`+bit;
    request(queryURL, function(error, response, body) {
        if (error) {
            return console.log("Error (Concert-this): " + error);
        }

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            if (data.length > 0) {
            
                for (i=0; i<1; i++){
                    console.log("   Band/artist       : " + str); // userInput.split("+").join(" ")
                    var venueName = data[i].venue.name;
                    var venueLocation = data[i].venue.city;
                    console.log("   Name of venue     : " + data[i].venue.name);
                    console.log("   Venue location    : " + data[i].venue.city);
                    var date = moment(data[i].datetime).format("MM/DD/YYYY");
                    console.log("   Date of the Event : " + date); 
                };

                // Output data for logging 'log.txt'
                var outputData = `\n  ----- Concert Info. -----\nCommand: node liri.js ${command}\nSearched for: ${str}\n` +
                `Name of venue: ${venueName}\nVenue Location: ${venueLocation}\nDate of the event: ${date}\n`
                logData(outputData);
            }
        }
    });
};      // End of concertIt()

function spotifyIt(userInput) {
    
    if (!userInput) {
        userInput = "the sign, the ace of base"; 
    }

    spotify
    .search({
        type: 'track', 
        query: userInput
    }, 
    function(err, data) {
        if (err) {
            return console.log('Error has occured: ' + err);
        }
        
        
        var song = data.tracks.items[0];
        console.log("");
        var artistName = song.album.artists[0].name;
        var songName   = song.name;
        var preview    = song.external_urls.spotify;
        var album      = song.album.name;
        console.log("    Artist(s) :  " + song.album.artists[0].name);
        console.log("    Song :  " + song.name);
        console.log("    Preview link of song from Spotify :  " + song.external_urls.spotify); 
        console.log("    Album the song is from :  " + song.album.name);

        // Output data for logging 'log.txt'
        var outputData = `\n  ----- Song Info. -----\nCommand: node liri.js ${command}\nSearched for: ${userInput}\n` +
        `Artist: ${artistName}\nSong: ${songName}\nPreview link of song from Spotify: ${preview}\n\n`
    })

    

}       // End of spotifyIt()

function movieIt() {
    // if (userInput == "" || !value){
    //     userInput = "Mr. Nobody";
        // movieIt("Mr. Nobody");
    if (userInput === "" || userInput === undefined){
        userInput = "Mr. Nobody";
        // movieIt("Mr. Nobody");
        console.log("   Haven't watched it?");
        console.log("   Check it out here: <https://www.imdb.com/title/tt0485947/> It's on Netfix!")
    }
    
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&page=3&apikey=trilogy")
        .then(function (response) { 
        console.log("   ──────────────────────────────────────────────────────");
        console.log("   Title of the movie: " + response.data.Title);
        console.log("   Year the movie came out: " + response.data.Year);
        console.log("   IMDB Rating of the movie: " + response.data.imdbRating);
        console.log("   Country where the movie was produced: " + response.data.Country);
        console.log("   Language of the movie: " + response.data.Language);
        console.log("   Plot of the movie: " + response.data.Plot);
        console.log("   Actors in the movie: " + response.data.Actors);
            // Format the short play (split @ ".") and join "./n"
        //   console.log(response);
        // Output data for logging 'log.txt'
        var movieName = response.data.Title;
        var movieData = `\nTitle of the movie: ${movieName}`+
        `\nYear the movie came out: ${response.data.Year}` +
        `\nIMDB Rating of the movie: ${response.data.imdbRating}` +
        `\nCountry where the movie was produced: ${response.data.Country}`+
        `\nLanguage of the movie: ${response.data.Language}`+
        `\nPlot of the movie: ${response.data.Plot}`+
        `\nActors in the movie: ${response.data.Actors}`

        var outputData = `\n\n  ----- Movie Info. -----\nCommand: node liri.js ${command}\nSearched for: ${movieName}\n` + movieData
        logData(outputData);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
}       // End of movieIt()

function doIt() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err){
            return console.log(err);
        } 
        var dataArray = data.split(",");
        // console.log(dataArray);
        command = (dataArray[0]);
        userInput = (dataArray[1]);
        // console.log("command: "+command + " ..... " +userInput);
        // spotifyIt(userInput);
    
        switch (command) {
            case "concert-this":
                concertIt(userInput);
                break;
            
            case "spotify-this-song":
                spotifyIt(userInput);
                break;

            case "movie-this":
                movieIt(userInput);
                break;
        }
        // Output data for logging 'log.txt'
        var outputData = `\n  ----- Do What It Says -----\nCommand: node liri.js ${command}\n`
        logData(outputData);
    })
} // End of doIt()

function logData(outputData) {
    fs.appendFile("log.txt", outputData, err => {
        if (err) throw err;
        
        console.log("---Log is saved!");
    })
} // End of logData()