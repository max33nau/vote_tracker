
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

function Picture( name, fileName ) {
    this.name = name;
    this.fileName = fileName;
    // Begin with a random number of votes per homework requirement.
    // (Change to this.vote = 0; at some future date.)
    this.vote = Math.floor(Math.random() * 10 + 1);
}

function ImageElement( fileName, position ) {
    this.element = document.createElement( "img" );
    this.element.src = ( "img/" +  fileName );
    this.element.id = position;
    this.element.className = "contestants"
}

var VOTE_MODULE = (function() {

    var my = { };
    my.anchorNode = document.getElementById( "AnchorNode" );
    my.pictures = [ ];
    my.randomizedIndices = [ ];
    my.contestants = [ ];
    my.voteTotal = 0;
    my.chart = { };


    /* * * * * * * * * * * * * * * * * * *
     * * * * PUBLIC MODULE METHODS * * * *
     * * * * * * * * * * * * * * * * * * */

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

    my.generateRandomIndices = function( length ) {
  var tempIndexArray = [ ];
  for ( var ii = 0; ii < length; ii++ ) {
      tempIndexArray.push( ii );
  }

  // If there is an odd number of candidates we may have one index
  // left in our array, so we empty it.
  my.randomizedIndices = [ ];

  while ( tempIndexArray.length > 0 ) {
      var index = Math.floor( Math.random() * tempIndexArray.length );
      // Splice() deletes an element from an array and returns it as a single
      // element array. We dereference it and push onto our array of indices.
      my.randomizedIndices.push( tempIndexArray.splice( index , 1 ) );
  }
    }

    my.postNewPics = function() {
  // I'm gonna pop two indices so my array needs at least that many.
  // If there is 1 or 0, we start fresh with a new randomization.
  if ( my.randomizedIndices.length < 2 ) {
      my.generateRandomIndices( my.pictures.length );
  }

  // Store left and right index
  my.contestants = [ my.randomizedIndices.pop(), my.randomizedIndices.pop() ];

  // If the image tags exist, update their source tags. Otherwise, create them.
  if ( document.getElementById( "left" ) && document.getElementById( "right" ) ) {
      var leftImage  = document.getElementById( "left" );
      var rightImage = document.getElementById( "right" );
      leftImage.src  = ( "img/" +  my.pictures[ my.contestants[0] ].fileName );
      rightImage.src = ( "img/" +  my.pictures[ my.contestants[1] ].fileName );
  } else {
      var leftImage =  new ImageElement( my.pictures[ my.contestants[0] ].fileName,
                 "left");
      var rightImage = new ImageElement( my.pictures[ my.contestants[1] ].fileName,
                 "right");
      my.anchorNode.appendChild( leftImage.element );
      my.anchorNode.appendChild( rightImage.element );
  }
  // We also need to update the chart
  my.chartBuilder();
    }

    my.eventHandler = function() {
        $("#left").on("click",function() { my.click( "left" ) });
        $("#right").on("click",function() { my.click( "right" ) });
        //var leftPic = document.getElementById( "left" );
        //leftPic.addEventListener( "click",function() { my.click( "left" ) }, false);
        //var rightPic = document.getElementById("right");
        //rightPic.addEventListener( "click", function() { my.click( "right" ) }, false);
    }

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

    my.chartBuilder = function() {
  var canvasAnchor = document.getElementById( "myChart" ).getContext( "2d" );
  var leftContestant = my.pictures[ my.contestants[0] ];
  var rightContestant = my.pictures[ my.contestants[1] ];
  var contestantData = {
            labels: [ leftContestant.name, rightContestant.name ],
            datasets: [ { label: "Raw votes",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        // Bogus data -- use your vote counts instead
        data: [leftContestant.vote, rightContestant.vote]
      },

      { label: "Percentage split",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: [ leftContestant.vote/( leftContestant.vote + rightContestant.vote ),
          rightContestant.vote/( leftContestant.vote + rightContestant.vote ) ]
      }
          ]
  };
  my.chart = new Chart(canvasAnchor).Bar(contestantData);
    }
    my.pictures.init( defaultInput );
    my.postNewPics();
    my.eventHandler();
return my;

} )();
