/* * * * * * * * * * * * * * * *
 * VOTE TRACKER                *
 * Created by   John Hearn     *
 *              Doug Popadince *
 *              Max Jacobson   *
 * CF201       Fall 2015       *
 * * * * * * * * * * * * * * * */

var defaultInput = [ ["Asparagus",   "asparagus-2039__180.jpg"],
                     ["Avocado",     "avocado-161822__180.png"],
                     ["Cherries",    "bing-cherries-805416__180.jpg"],
                     ["Turkey",      "blueMarinatedTurkey.jpg"],
                     ["Condiments",  "condimentSprays.jpg"],
                     ["CornDogs",    "cornDogs.jpg"],
                     ["Candles",     "cranberryCandles.jpg"],
                     ["CreamPuffs",  "cream-puffs-427181__180.jpg"],
                     ["Egg",         "egg-157224__180.png"],
                     ["Shrimp",      "frozenShrimp.jpg"],
                     ["Casserole",   "frozenWhatAreThese.jpg"],
                     ["Garlic",      "garlic-84691__180.jpg"],
                     ["Soda",        "heatedSoda.jpg"],
                     ["Jello",       "jelloMayoTurkey.jpg"],
                     ["Fruit",       "kiwifruit-400143__180.jpg"],
                     ["Mushrooms",   "mushrooms-756406__180.jpg"],
                     ["Pasta",       "pasta-503952__180.jpg"],
                     ["Tomato",      "tomatoes-320860__180.jpg"],
                     ["Soup",        "whipcreamSoup.jpg"],
                     ["Pepper",      "yellowpepper-22111__180.jpg"] ];



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
    this.element.className = position;
}

var VOTE_MODULE = (function() {
    
    var my = {};
    my.anchorNode = document.getElementById( "AnchorNode" );
    my.pictures = [];
    my.randomizedIndices = [];
    
    
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

	while ( tempIndexArray.length > 0 ) {
	    var index = Math.floor( Math.random() * tempIndexArray.length );
	    // Splice() deletes an element from an array and returns it as a single
	    // element array. We dereference it and push onto our array of indices.
	    my.randomizedIndices.push( tempIndexArray.splice( index , 1 )[0] );
	}
    }

    my.postNewPics = function() {
	// I'm gonna pop two indices so my array needs at least that many.
	if ( my.randomizedIndices.length < 2 ) {
	    my.generateRandomIndices( my.pictures.length );
	}
	var leftImage =  new ImageElement(my.pictures[ my.randomizedIndices.pop() ].fileName,
					  "left");
	var rightImage = new ImageElement(my.pictures[ my.randomizedIndices.pop() ].fileName,
					  "right");
	my.anchorNode.appendChild( leftImage.element );
	my.anchorNode.appendChild( rightImage.element );
    }

    
    /*********************************** 
     ***** Stuff Actually Happens ******
     ***********************************/
    
    my.pictures.init( defaultInput );
    my.postNewPics();

    return my;
    
} )();
