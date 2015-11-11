/* * * * * * * * * * * * * * * *
 * VOTE TRACKER                *
 * Created by   John Hearn     *
 *              Doug Popadince *
 *              Max Jacobson   *
 * CF201        Fall 2015      *
 * * * * * * * * * * * * * * * */
//$(document).ready(function() {
                

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

//----adding global var to store total votes for all items to be used for charting percents--//
var total =0;
var myChartObj = {};
    /* * * * * * * * * * * * * * * * * * *
     * * * * * * CONSTRUCTORS  * * * * * *
     * * * * * * * * * * * * * * * * * * */

function Picture( name, fileName ) {
    this.name = name;
    this.fileName = fileName;
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


    /* * * * * * * * * * * * * * * * * * *
     * * * * PUBLIC MODULE METHODS * * * *
     * * * * * * * * * * * * * * * * * * */

    my.pictures.init = function( initData ) {
    	for ( var ii=0; ii < initData.length; ii++ ) {
    	    var picture = new Picture( initData[ii][0],
                                       initData[ii][1] );
    	    my.pictures.push( picture );
            total += picture.vote;//adding random votes to test per HW12
            console.log("show total: " + total); 
    	}
    }

    my.generateRandomIndices = function( length ) {
	var tempIndexArray = [ ];
	for ( var ii = 0; ii < length; ii++ ) {
	    tempIndexArray.push( ii );
	}

  my.randomizedIndices = [ ];

	while ( tempIndexArray.length > 0 ) {
	    // If there is an odd number of candidates we may have one index
	    // left in our array, so we empty it.

      /*my.randomizedIndices = [ ]; I moved this out of the while loop because
      everytime you run through the loop it sets the array back to zero so our
      randomizedIndices array never gets generated. 
       YOU PUSHED A CODE WITH A BUG IN IT... DONUTS FOR EVERYONE!!!!!*/

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
        buildChart();
	} else {

	    var leftImage =  new ImageElement( my.pictures[ my.contestants[0] ].fileName,
					       "left");
	    var rightImage = new ImageElement( my.pictures[ my.contestants[1] ].fileName,
					       "right");
	    my.anchorNode.appendChild( leftImage.element );
	    my.anchorNode.appendChild( rightImage.element );
        buildChart();
	}
    }

    my.eventHandler = function() {
        $("#left").on("click",function() { my.click( "left" ) });
        $("#right").on("click",function() { my.click( "right" ) });
        //var leftPic = document.getElementById( "left" );
        //leftPic.addEventListener( "click",function() { my.click( "left" ) }, false);
        //var rightPic = document.getElementById("right");
        //rightPic.addEventListener( "click", function() { my.click( "right" ) }, false);
        
        return true;
       
}
    my.click = function( position ) {
        if( position == "left" ) {
            my.pictures[ my.contestants[0] ].vote++;
            total++;

        } else if( position == "right" ) {
            my.pictures[my.contestants[1]].vote++;
            total++;
        } else {
            console.log( " MODULE method my.click() was passes an invalid parameter" );
            return false;
        }
	// Update the page with new pics
        if (myChartObj) { myChartObj.destroy()};
        my.postNewPics();
    }

//----------------charting section------------------------------//
function buildChart (){
    var ctx = document.getElementById("myChart").getContext("2d");
    var leftContestant = my.pictures[ my.contestants[0]];
    var rightContestant = my.pictures[ my.contestants[1]];
    var data = {
        labels: [leftContestant.name, rightContestant.name],
        datasets: [
          { label: "Raw votes",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [leftContestant.vote, rightContestant.vote] // Bogus data -- use your vote counts instead
          },
          { label: "Percentage split",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [ leftContestant.vote/(leftContestant.vote + rightContestant.vote), 
            rightContestant.vote/(leftContestant.vote + rightContestant.vote)]
          }
        ]
      };
  myChartObj = new Chart(ctx).Bar(data);
}



    /***********************************
     ***** Stuff Gets Called Here ******
     ***********************************/

    my.pictures.init( defaultInput );
    my.postNewPics();
    my.eventHandler();

    return my;

} )();

 //});//closing $document ready
