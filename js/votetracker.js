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
    this.element.id = position;
    this.element.className = "candidates"
}

var VOTE_MODULE = (function() {
    
    var my = {};
    my.anchorNode = document.getElementById( "AnchorNode" );
    my.pictures = [];
    my.randomizedIndices = [];
    my.candidates = [];
    
    
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
    var leftIndex = my.randomizedIndices.pop();
    var rightIndex = my.randomizedIndices.pop();
    my.candidates = [leftIndex, rightIndex];
	var leftImage =  new ImageElement(my.pictures[leftIndex].fileName,
					  "left");
	var rightImage = new ImageElement(my.pictures[rightIndex].fileName,
					  "right");
	my.anchorNode.appendChild( leftImage.element );
	my.anchorNode.appendChild( rightImage.element );
    }

    my.removePics = function() {
        my.anchorNode.removeChild(document.getElementById("left"));
        my.anchorNode.removeChild(document.getElementById("right"));
    }

    
    /*********************************** 
     ***** Stuff Actually Happens ******
     ***********************************/
    
    my.eventHandler = function() {
        var leftPic = document.getElementById("left");
        leftPic.addEventListener("click",function() {my.click("left")}, false);
        var rightPic = document.getElementById("right");
        rightPic.addEventListener("click", function() {my.click("right")}, false);
        return true;
    }
    my.click = function (position) {
        //var element = document.getElementsById(position);
        if(position == "left"){
            my.pictures[my.candidates[0]].vote++;
            
        } else if (position == "right") {
            my.pictures[my.candidates[1]].vote++;

        } else {
            console.log("We have error in myclick function");
            return false;
        }
        my.removePics();
        my.postNewPics();
    }
    
    my.pictures.init( defaultInput );
    my.postNewPics();
    my.eventHandler();
   
    /*while (my.eventHandler()) {
        my.postNewPics();
    }*/

    return my;
    
} )();
