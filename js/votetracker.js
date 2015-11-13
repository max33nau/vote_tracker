/* * * * * * * * * * * * * * * *
 * VOTE TRACKER                *
 * Created by   John Hearn     *
 *              Doug Popadince *
 *              Max Jacobson   *
 * CF201        Fall 2015      *
 * * * * * * * * * * * * * * * */
​
var defaultInput = [ [ "Asparagus",   "asparagus-2039__180.jpg" ],
                     [ "Avocado",     "avocado-161822__180.png" ],
                     [ "Cherries",    "bing-cherries-805416__180.jpg" ],
                     [ "Turkey",      "blueMarinatedTurkey.jpg" ],
                     [ "Condiments",  "condimentSprays.jpg" ],
                     [ "CornDogs",    "cornDogs.jpg" ],
                     [ "Candles",     "cranberryCandles.jpg" ],
                     [ "CreamPuffs",  "cream-puffs-427181__180.jpg" ],
                     [ "Egg",         "egg-157224__180.png" ],
                     [ "Shrimp",      "frozenShrimp.jpg" ],
                     [ "Casserole",   "frozenWhatAreThese.jpg" ],
                     [ "Garlic",      "garlic-84691__180.jpg" ],
                     [ "Soda",        "heatedSoda.jpg" ],
                     [ "Jello",       "jelloMayoTurkey.jpg" ],
                     [ "Fruit",       "kiwifruit-400143__180.jpg" ],
                     [ "Mushrooms",   "mushrooms-756406__180.jpg" ],
                     [ "Pasta",       "pasta-503952__180.jpg" ],
                     [ "Tomato",      "tomatoes-320860__180.jpg" ],
                     [ "Soup",        "whipcreamSoup.jpg" ],
                     [ "Pepper",      "yellowpepper-22111__180.jpg" ] ];
​
​
    /* * * * * * * * * * * * * * * * * * *
     * * * * * * CONSTRUCTORS  * * * * * *
     * * * * * * * * * * * * * * * * * * */
​
function Picture( name, fileName ) {
    this.name = name;
    this.fileName = fileName;
    // Begin with a random number of votes per homework requirement.
    // (Change to this.vote = 0; at some future date.)
    this.vote = 0; //Math.floor(Math.random() * 10 + 1);
}
​
function JQImage( fileName, position ) {
    this.$element = $('<img></img>')
    .attr( { 'src': "img/" + fileName,
         'id':  position } )
    .addClass( 'contestants' );
}
​
/*
// This object has been obviated by the above JQImage
function Image( fileName, position ) {
    this.element = document.createElement( "img" );
    this.element.src = ( "img/" + fileName );
    this.element.id = position;
    this.element.className = "contestants"
}
*/
​
var VOTE_MODULE = (function() {
​
    var my = { };
    my.pictures = [ ];
    my.randomizedIndices = [ ];
    my.contestants = [ ];
    my.voteTotal = 0;
    my.chart = { };
    my.dailyForecasts = [ ];
​
​
    /* * * * * * * * * * * * * * * * * * *
     * * * * PUBLIC MODULE METHODS * * * *
     * * * * * * * * * * * * * * * * * * */
​
    my.pictures.init = function( initData ) {
        for ( var ii=0; ii < initData.length; ii++ ) {
            var picture = new Picture( initData[ii][0],
                                       initData[ii][1] );
            my.pictures.push( picture );
        // Add random votes to test per HW12
            my.voteTotal += picture.vote;
            // console.log("show vote total: " + my.voteTotal);
        }
    }
​
    my.generateRandomIndices = function( length ) {
    var tempIndexArray = [ ];
    for ( var ii = 0; ii < length; ii++ ) {
        tempIndexArray.push( ii );
    }
​
    // If there is an odd number of candidates we may have one index
    // left in our array, so we empty it.
    my.randomizedIndices = [ ];
​
    while ( tempIndexArray.length > 0 ) {
        var index = Math.floor( Math.random() * tempIndexArray.length );
        // Splice() deletes an element from an array and returns it as a single
        // element array. We dereference it and push onto our array of indices.
        my.randomizedIndices.push( tempIndexArray.splice( index , 1 ) );
    }
    }
​
    my.postNewPics = function() {
    // I'm gonna pop two indices so my array needs at least that many.
    // If there is 1 or 0, we start fresh with a new randomization.
    if ( my.randomizedIndices.length < 2 ) {
        my.generateRandomIndices( my.pictures.length );
    }
​
    // Store left and right index
    my.contestants = [ my.randomizedIndices.pop(), my.randomizedIndices.pop() ];
​
    // If the image tags exist, update their source tags. Otherwise, create them.
    if ( $( '#left' )[0] && $( '#right' )[0] ) {
        $( '#left' ).attr( 'src', "img/" +  my.pictures[ my.contestants[0] ].fileName );
        $( '#right' ).attr( 'src', "img/" +  my.pictures[ my.contestants[1] ].fileName );
        // var leftImage  = document.getElementById( "left" );
        // var rightImage = document.getElementById( "right" );
        // leftImage.src  = ( "img/" +  my.pictures[ my.contestants[0] ].fileName );
        // rightImage.src = ( "img/" +  my.pictures[ my.contestants[1] ].fileName );
    } else {
        // var leftImage =  new ImageElement( my.pictures[ my.contestants[0] ].fileName,
        //                        "left");
        // var rightImage = new ImageElement( my.pictures[ my.contestants[1] ].fileName,
        //                        "right");
        var $anchorNode = $( "#AnchorNode" );
        var leftImage = new JQImage( my.pictures[ my.contestants[0] ].fileName, 'left' );
        var rightImage = new JQImage( my.pictures[ my.contestants[1] ].fileName, 'right' );
        $anchorNode.after( leftImage.$element );
        $anchorNode.after( rightImage.$element );
    }
    // We also need to update the chart
    my.chartBuilder();
    }
​
    my.eventHandler = function() {
    // JQuery replacement of JavaScript code
        $("#left").on("click",function() { my.click( "left" ) });
        $("#right").on("click",function() { my.click( "right" ) } );
        $("#submitButton").on("click", function() { my.weather() } );
        //var leftPic = document.getElementById( "left" );
        //leftPic.addEventListener( "click",function() { my.click( "left" ) }, false);
​
    }
​
    my.click = function( position ) {
        if( position == "left" ) {
            my.pictures[ my.contestants[0] ].vote++;
            my.voteTotal++;
        } else if( position == "right" ) {
            my.pictures[my.contestants[1]].vote++;
            my.voteTotal++;
        } else {
            console.log( " MODULE method my.click() was passes an invalid parameter" );
            return false;
        }
    // Destroy chart and update the page with new set of pics and chart
        if ( my.chart ) {
        my.chart.destroy()
    }
        my.postNewPics();
    }
​
    my.chartBuilder = function() {
    // var canvasAnchor = document.getElementById( "myChart" ).getContext( "2d" );
    var $canvasAnchor = $( "#myChart" ).get( 0 ).getContext( "2d" );
    var leftContestant = my.pictures[ my.contestants[0] ];
    var rightContestant = my.pictures[ my.contestants[1] ];
    var contestantData = {
            labels: [ leftContestant.name, rightContestant.name ],
            datasets: [ { label:           "Raw votes",
              fillColor:       "rgba(220,220,220,0.5)",
              strokeColor:     "rgba(220,220,220,0.8)",
              highlightFill:   "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              // Bogus data -- use your vote counts instead
              data: [ leftContestant.vote, rightContestant.vote ]
            },

            { label:           "Percentage split",
              fillColor:       "rgba(151,187,205,0.5)",
              strokeColor:     "rgba(151,187,205,0.8)",
              highlightFill:   "rgba(151,187,205,0.75)",
              highlightStroke: "rgba(151,187,205,1)",
              data: [ leftContestant.vote/( leftContestant.vote + rightContestant.vote ),
                  rightContestant.vote/( leftContestant.vote + rightContestant.vote ) ]
            }
              ]
    };

    my.chart = new Chart($canvasAnchor).Bar(contestantData);
    }
​
    my.weatherChartBuilder = function() {
    var $weatherChartAnchor = $( "#weatherChart" ).get( 0 ).getContext( "2d" );
    var dailyLabels = [ ];
    var dailyTemps = [ ];
    console.log(my.dailyForecasts[0]);
    for (var ii = 0; ii < 7; ii++ ) {
        dailyLabels.push( my.dailyForecasts[ii].date );
        dailyTemps.push( my.dailyForecasts[ii].temp );
    };
    var weatherChartData = {
            labels: dailyLabels,
            datasets: [ { label:           "Temperature",
              fillColor:       "rgba(220,220,220,0.5)",
              strokeColor:     "rgba(220,220,220,0.8)",
              highlightFill:   "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              // Bogus data -- use your vote counts instead
              data: dailyTemps
            } ]
    };

    my.chart = new Chart( $weatherChartAnchor ).Bar( weatherChartData );
    }

    my.weather = function() {
​
    var cityName = $("#cityInput").val();
    var daysCount = 7;
    var weatherURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q="
                     + cityName + "&cnt=" + daysCount
                     + "&units=imperial&APPID=ee8ca027aca5a5ddd4994e6a9dcca05c";
    //console.log("this is the api url: " + weatherURL);

    $.ajax( { url: weatherURL } )
        .done( function( weatherData ){
        var city = weatherData.city.name;
        var country = weatherData.city.country;
        var description = weatherData.list[0].weather[0].description;
        var latitude = weatherData.city.coord.lat;
        var longitude = weatherData.city.coord.lon;
        //console.log("lat is: " + latitude);
        //console.log("long for portland" + longitude);
        for ( var ii = 0; ii < daysCount; ii++ ) {
            var temp = weatherData.list[ii].temp.day;
            var description = weatherData.list[ii].weather[0].description;
            var dateAndTime =  weatherData.list[ii].dt;
            //console.log(dateAndTime);
            var date = new Date( dateAndTime * 1000 );
            //console.log(date.toDateString());
            my.dailyForecasts.push(
            { temp: temp,
              description: description,
              date: date.toDateString() } );
            //console.log(my.dailyForecasts[ii]);
        }
        console.log(my.dailyForecasts);
        my.weatherChartBuilder();
        })
​
​
    }




    /***********************************
     ***** Stuff Gets Called Here ******
     ***********************************/

    my.pictures.init( defaultInput );
    my.postNewPics();
    my.eventHandler();
​
    return my;
​
} )();
