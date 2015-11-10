/* * * * * * * * * * * * * * * *
 * VOTE TRACKER                *
 * Created by   John Hearn     *
 *              Doug Popadince *
 *              Max Jacobson   *
 * CF201        Fall 2015      *
 * * * * * * * * * * * * * * * */

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


    /* * * * * * * * * * * * * * * * * * *
     * * * * * * CONSTRUCTORS  * * * * * *
     * * * * * * * * * * * * * * * * * * */

function Picture( name, fileName ) {
    this.name = name;
    this.fileName = fileName;
    this.vote = 0;
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

      console.log("temp before: " + my.randomizedIndices);


      /*  YOU PUSHED A
      CODE WITH A BUG IN IT... DONUTS FOR EVERYONE!!!!!*/

	    var index = Math.floor( Math.random() * tempIndexArray.length );
	    // Splice() deletes an element from an array and returns it as a single
	    // element array. We dereference it and push onto our array of indices.
	    my.randomizedIndices.push( tempIndexArray.splice( index , 1 ) );

    console.log("temp after: " + my.randomizedIndices);
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
  console.log(my.contestants);

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
    }

    my.eventHandler = function() {
        var leftPic = document.getElementById( "left" );
        leftPic.addEventListener( "click",function() { my.click( "left" ) }, false);
        var rightPic = document.getElementById("right");
        rightPic.addEventListener( "click", function() { my.click( "right" ) }, false);
        return true;
    }

    my.click = function( position ) {
        if( position == "left" ) {
            my.pictures[ my.contestants[0] ].vote++;

        } else if( position == "right" ) {
            my.pictures[my.contestants[1]].vote++;

        } else {
            console.log( " MODULE method my.click() was passes an invalid parameter" );
            return false;
        }
	// Update the page with new pics
        my.postNewPics();
    }

    /*
    // I don't think there is actually any need to call this.
    // If we update the src tag instead, we never need a new event handler.
    my.removePics = function() {
        my.anchorNode.removeChild(document.getElementById("left"));
        my.anchorNode.removeChild(document.getElementById("right"));
    }
    */


    /***********************************
     ***** Stuff Gets Called Here ******
     ***********************************/

    my.pictures.init( defaultInput );
    my.postNewPics();
    my.eventHandler();

    return my;

} )();
