
var defaultInput = [["Asparagus",   "asparagus-2039__180.jpg"],
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
                    ["Pepper",      "yellowpepper-22111__180.jpg"]];

function Picture(name,fileName) {
  this.name = name;
  this.fileName = fileName;
  this.vote = 0;
}

var VOTE_MODULE = (function() {

  var my = {};
  my.anchorNode = document.getElementById( "VoteAnchor" );
  my.pictures = [];

  /*  Public Module Methods */

  my.pictures.init = function(initData) {
    for ( var ii=0; ii < initData.length; ii++ ) {
      var picture = new Picture( initData[ii][0],
                                 initData[ii][1] );
      my.pictures.push( picture );
    }
  }

  /* Functions Called */

  my.pictures.init( defaultInput );

  return my;

} )();
