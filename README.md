<html>
<head>
<link rel="shortcut icon" type="image/png" href="favicon.png">
<style>
body {
margin-bottom: 200%;
}

input[type=number]{
    width: 70px;
} 

/* Box styles */
.creatureDisplay {
border: none;
padding: 5px;
font: 14 courier-new;
width: 750px;
height: 250px;
overflow: scroll;
}

/* Scrollbar styles */
::-webkit-scrollbar {
width: 5px;
height: 5px;
}

::-webkit-scrollbar-track {
border: 1px solid black;
border-radius: 5px;
}

::-webkit-scrollbar-thumb {
background: black;  
border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
background: #88ba1c;  
}
	
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
</head>
<body>
<header>
<h1>XP Budget Calculator</h1>
</header>
<form>
  <label for="numchar">Number Characters:</label>
  <input type="number" id="numchar" name="numchar" value="" min=1 max=99>
  <label for="level">Average Level:</label>
  <input type="number" id="level" name="level" value="" min=1 max=20>
  <label for="difficulty">Difficulty:</label>
  <select name="difficulty" id="difficulty">
  <option value="Easy">Easy</option>
  <option value="Medium">Medium</option>
  <option value="Hard">Hard</option>
  <option value="Deadly">Deadly</option>
  </select>
  <br>
  <button onclick="calculateXP()">Calculate</button>
  <p style="display:inline-block" id="xpbudget"></p>
</form>

<script>
function isEmpty(value){
  return (value == null || value.length === 0);
}

function calculateXP() {
  var level = document.getElementById("level").value;
  var numchar = document.getElementById("numchar").value;
  var difficulty = document.getElementById("difficulty").value;
  var xp = "";
  
  function easyXP(){
	switch(level) {
		case "1":
			return (25 * numchar);
			break;
		case "2":
			return (50 * numchar);
			break;
		case "3":
			return (75 * numchar);
			break;
		case "4":
			return (125 * numchar);
			break;
		case "5":
			return (250 * numchar);
			break;
		case "6":
			return (300 * numchar);
			break;
		case "7":
			return (350 * numchar);
			break;
		case "8":
			return (450 * numchar);
			break;
		case "9":
			return (550 * numchar);
			break;
		case "10":
			return (600 * numchar);
			break;
		case "11":
			return (800 * numchar);
			break;
		case "12":
			return (1000 * numchar);
			break;
		case "13":
			return (1100 * numchar);
			break;
		case "14":
			return (1250 * numchar);
			break;
		case "15":
			return (1400 * numchar);
			break;
		case "16":
			return (1600 * numchar);
			break;
		case "17":
			return (2000 * numchar);
			break;
		case "18":
			return (2100 * numchar);
			break;
		case "19":
			return (2400 * numchar);
			break;
		case "20":
			return (2800 * numchar);
			break;
		default: 
			return 0;
	 }
	}
	
	function mediumXP(){
	switch(level) {
		case "1":
			return (50 * numchar);
			break;
		case "2":
			return (100 * numchar);
			break;
		case "3":
			return (150 * numchar);
			break;
		case "4":
			return (250 * numchar);
			break;
		case "5":
			return (500 * numchar);
			break;
		case "6":
			return (600 * numchar);
			break;
		case "7":
			return (750 * numchar);
			break;
		case "8":
			return (900 * numchar);
			break;
		case "9":
			return (1100 * numchar);
			break;
		case "10":
			return (1200 * numchar);
			break;
		case "11":
			return (1600 * numchar);
			break;
		case "12":
			return (2000 * numchar);
			break;
		case "13":
			return (2200 * numchar);
			break;
		case "14":
			return (2500 * numchar);
			break;
		case "15":
			return (2800 * numchar);
			break;
		case "16":
			return (3200 * numchar);
			break;
		case "17":
			return (3900 * numchar);
			break;
		case "18":
			return (4200 * numchar);
			break;
		case "19":
			return (4900 * numchar);
			break;
		case "20":
			return (5700 * numchar);
			break;
		default: 
			return 0;
	 }
	}
	
	function hardXP(){
	switch(level) {
		case "1":
			return (75 * numchar);
			break;
		case "2":
			return (150 * numchar);
			break;
		case "3":
			return (225 * numchar);
			break;
		case "4":
			return (375 * numchar);
			break;
		case "5":
			return (750 * numchar);
			break;
		case "6":
			return (900 * numchar);
			break;
		case "7":
			return (1100 * numchar);
			break;
		case "8":
			return (1400 * numchar);
			break;
		case "9":
			return (1600 * numchar);
			break;
		case "10":
			return (1900 * numchar);
			break;
		case "11":
			return (2400 * numchar);
			break;
		case "12":
			return (3000 * numchar);
			break;
		case "13":
			return (3400 * numchar);
			break;
		case "14":
			return (3800 * numchar);
			break;
		case "15":
			return (4300 * numchar);
			break;
		case "16":
			return (4800 * numchar);
			break;
		case "17":
			return (5900 * numchar);
			break;
		case "18":
			return (6300 * numchar);
			break;
		case "19":
			return (7300 * numchar);
			break;
		case "20":
			return (8500 * numchar);
			break;
		default: 
			return 0;
	 }
	}
	
	function deadlyXP(){
	switch(level) {
		case "1":
			return (100 * numchar);
			break;
		case "2":
			return (200 * numchar);
			break;
		case "3":
			return (400 * numchar);
			break;
		case "4":
			return (500 * numchar);
			break;
		case "5":
			return (1100 * numchar);
			break;
		case "6":
			return (1400 * numchar);
			break;
		case "7":
			return (1700 * numchar);
			break;
		case "8":
			return (2100 * numchar);
			break;
		case "9":
			return (2400 * numchar);
			break;
		case "10":
			return (2800 * numchar);
			break;
		case "11":
			return (3600 * numchar);
			break;
		case "12":
			return (4500 * numchar);
			break;
		case "13":
			return (5100 * numchar);
			break;
		case "14":
			return (5700 * numchar);
			break;
		case "15":
			return (6400 * numchar);
			break;
		case "16":
			return (7200 * numchar);
			break;
		case "17":
			return (8800 * numchar);
			break;
		case "18":
			return (9500 * numchar);
			break;
		case "19":
			return (10900 * numchar);
			break;
		case "20":
			return (12700 * numchar);
			break;
		default: 
			return 0;
	 }
	}
  
  switch(difficulty){
     case "Easy":
        xp = easyXP();
        break;
     case "Medium":
        xp = mediumXP();
        break;
     case "Hard":
     	xp = hardXP();
        break;
     case "Deadly":
     	xp = deadlyXP();
        break;
     default: 
     	xp = 0;
  };
  document.getElementById("xpbudget").innerHTML = xp + " XP";
  document.getElementById("encounterxp").value = xp;
}

function loadFile(filePath){
	  var result = null;
	  var xmlhttp = new XMLHttpRequest();
	  xmlhttp.open("GET", filePath, false);
	  xmlhttp.send();
	  if (xmlhttp.status==200) {
		result = xmlhttp.responseText;
	  }
	  result = result.split("/");
	  var output = "";
	  var i;
	  for (i = 0; i < result.length; i++) {
	    output += result[i] + "<br>";
	  }
	  return output.replaceAll("|", " | ");
}

function creatureSearch(){
	var output = "";
    
    var selectElement = document.getElementById('environment');
	var environments = Array.from(selectElement.selectedOptions).map(option => option.value);
    
    if(environments.length == 0){
    	environments = [
		"Aquatic",
		"Arctic",
		"Cave",
		"Coast",
		"Desert",
		"Dungeon",
		"Forest",
		"Grassland",
		"Mountain",
		"Planar",
		"Ruins",
		"Swamp",
		"Underground",
		"Urban"
		]
   	 }
    
	for (var i = 0; i < environments.length; i++) {
    		var filename = "FILES\\CREATURES\\" + environments[i].toUpperCase() + ".txt";
		output += loadFile(filename);
	}
	
	var deduped = output.split("<br>");
	output = deduped.filter(function(value, index, self) { 
	    return self.indexOf(value) === index;
	});
    
    var tofilter = Array.from(output);
	var filtered = new Array();
    
    for (var j = 0; j < tofilter.length; j++) {
    	var creature = tofilter[j].split(" | ");
        var name = String(creature[0]);
        var size = String(creature[1]);
        var type = String(creature[2]);
        var alignment = String(creature[3]);
        var xp = String(creature[4]);
        var book = String(creature[5]);
        
        var xpint = parseInt(xp.replaceAll(",", ""));
        var bookwithoutpage = String(book.split("p.")[0]);
        
        if(
        	filterName(name.toLowerCase()) ||
            filterXP(xpint) ||
            filterType(type.slice().trim()) ||
            filterBook(bookwithoutpage.slice().trim()) ||
            filterAlignment(alignment.slice().trim()) ||
            filterSize(size.slice().trim()) ||
            isEmpty(name)
        ){
        	continue;
        }
        
        var newcreature = [name, size, type, alignment, xp, book];
        filtered.push(newcreature.join(" | "));
    }
    
    output = filtered;
	document.getElementById("creatures").innerHTML = output.join("<br>");
}

//if filter returns true, we do filter the row
function filterName(name){
	var namefilter = String(document.getElementById("crname").value).slice(0).toLowerCase();
    if (isEmpty(name) || 
    	isEmpty(namefilter) ||
		name.includes(namefilter)        
        ){
    	return false;
    } else {
    	return true;
    }
}

//filter row if minxp is not null && less than xp
//same in reverse for maxxp
function filterXP(xp){
	var minxp = document.getElementById("minxp").value;
    var maxxp = document.getElementById("maxxp").value;
    
    if(!isEmpty(minxp) && minxp > xp) {
    	return true;
    }
    
    if(!isEmpty(maxxp) && maxxp < xp) {
    	return true;
    }
    
	return false;
}

//filter if the typefilters are not null, and the type is not included
function filterType(type){
	var typefilters = Array.from(document.getElementById('creaturetype').selectedOptions).map(({ value }) => value).join(",");
    
    if(!isEmpty(typefilters) && !(typefilters.includes(type))) {
    	return true;
    }
    
    return false;
}

function filterBook(book){
	var bookfilters = Array.from(document.getElementById('book').selectedOptions).map(({ value }) => value).join(",").trim();
    
    if(!isEmpty(bookfilters) && !(bookfilters.includes(book))) {
    	return true;
    }
    
    return false;
}

function filterAlignment(alignment){
	var alignmentfilters = Array.from(document.getElementById('alignment').selectedOptions).map(({ value }) => value).join(",").trim();
    
    if(!isEmpty(alignmentfilters) && !(alignmentfilters.includes(alignment))) {
    	return true;
    }
    
    return false;
}

function filterSize(size){
	var sizefilters = Array.from(document.getElementById('size').selectedOptions).map(({ value }) => value).join(",").trim();
    
    if(!isEmpty(sizefilters) && !(sizefilters.includes(size))) {
    	return true;
    }
    
    return false;
}

function sortAlphabeticallyAscending(){
	var output = document.getElementById("creatures").innerHTML.split("<br>");
    
    output = output.sort();
    
    document.getElementById("creatures").innerHTML = output.join("<br>");
}

function sortAlphabeticallyDescending(){
	var output = document.getElementById("creatures").innerHTML.split("<br>");
    
    output = output.sort().reverse();
    
    document.getElementById("creatures").innerHTML = output.join("<br>");
}

function sortXP(ascending){
	var creatures = document.getElementById("creatures").innerHTML.split("<br>");
    
    var splitapart = [];
    for (var j = 0; j < creatures.length; j++) {
    	var creature = creatures[j].split(" | ");
        splitapart.push(creature);
    }
    
    splitapart = splitapart.sort(function(a, b) {
      return parseInt(a[4].replace(",", "")) - parseInt(b[4].replace(",", ""));
    })
    
    if(!ascending){
    	splitapart = splitapart.reverse();
    }
    
    var output = [];
    for (var j = 0; j < splitapart.length; j++) {
    	var creature = splitapart[j];
        output.push(creature.join(" | "));
    }
        
    document.getElementById("creatures").innerHTML = output.join("<br>");
}

function generateEncounter(){
	var creatures = document.getElementById("creatures").innerHTML.split("<br>");
    
    var splitapart = [];
    for (var j = 0; j < creatures.length; j++) {
    	var creature = creatures[j].split(" | ");
        splitapart.push(creature);
    }
    
    var output = [];
    for (var j = 0; j < splitapart.length; j++) {
    	var creature = splitapart[j];
        output.push(creature.join(" | "));
    }
        
    document.getElementById("creatures").innerHTML = output.join("<br>");
}

</script>
<header>
<h1>Creature Searcher</h1>
</header>
<form>
	<label for="crname">Creature Name:</label>
	<input type="text" id="crname" name="crname" value="" size="12">
    <label for="minxp">Minimum XP:</label>
	<input type="number" id="minxp" name="minxp" min="0" size="4">
    <label for="maxxp">Maximum XP:</label>
	<input type="number" id="maxxp" name="maxxp" size="4">
	<br><br>
	<select name="environment" id="environment" multiple>
	<option value="">Any</option>
    <option value="Aquatic">Aquatic</option>
	<option value="Arctic">Arctic</option>
	<option value="Cave">Cave</option>
	<option value="Coast">Coast</option>
	<option value="Desert">Desert</option>
	<option value="Forest">Forest</option>
	<option value="Grassland">Grassland</option>
	<option value="Mountain">Mountain</option>
	<option value="Planar">Planar</option>
	<option value="Ruins">Ruins</option>
	<option value="Swamp">Swamp</option>
	<option value="Underground">Underground</option>
	<option value="Urban">Urban</option>
	</select>
	<select name="creaturetype" id="creaturetype" multiple>
	<option value="">Any</option>
    <option value="Aberration">Aberration</option>
	<option value="Beast">Beast</option>
	<option value="Celestial">Celestial</option>
	<option value="Construct">Construct</option>
	<option value="Dragon">Dragon</option>
	<option value="Elemental">Elemental</option>
	<option value="Fey">Fey</option>
	<option value="Fiend">Fiend</option>
	<option value="Giant">Giant</option>
	<option value="Humanoid">Humanoid</option>
	<option value="Monstrosity">Monstrosity</option>
	<option value="Ooze">Ooze</option>
	<option value="Plant">Plant</option>
	<option value="Undead">Undead</option>
	</select>
	<select name="book" id="book" multiple>
	<option value="">Any</option>
    <option value="Tome of Beasts">Tome of Beasts</option>
	<option value="Monster Manual">Monster Manual</option>
	<option value="Volo's Guide to Monsters">Volo's Guide to Monsters</option>
	<option value="Mordenkainen's Tome of Foes">Mordenkainen's Tome of Foes</option>
	</select>
    <select name="Alignment" id="alignment" multiple>
	<option value="">Any</option>
    <option value="lawful good">Lawful Good</option>
    <option value="neutral good">Neutral Good</option>
    <option value="chaotic good">Chaotic Good</option>
    <option value="lawful neutral">Lawful Neutral</option>
    <option value="neutral">Neutral</option>
    <option value="chaotic neutral">Chaotic Neutral</option>
    <option value="lawful evil">Lawful Evil</option>
    <option value="neutral evil">Neutral Evil</option>
    <option value="chaotic evil">Chaotic Evil</option>
    <option value="unaligned">Unaligned</option>
	</select>
    <select name="Size" id="size" multiple>
    <option value="">Any</option>
	<option value="Tiny">Tiny</option>
    <option value="Small">Small</option>
    <option value="Medium">Medium</option>
    <option value="Large">Large</option>
    <option value="Huge">Huge</option>
	<option value="Gargantuan">Gargantuan</option>
	</select>
</form>
<button onclick="creatureSearch()">Search</button>
<button onclick="sortAlphabeticallyAscending()">Sort A-Z</button>
<button onclick="sortAlphabeticallyDescending()">Z-A</button>
<button onclick="sortXP(false)">XP Highest</button>
<button onclick="sortXP(true)">XP Lowest</button>
<button onclick="generateEncounter()">Create Encounter</button>
<label for="encounterxp">XP:</label>
<input type="number" id="encounterxp" name="encounterxp" min="0" size="2">
<br><br>
<p class="creatureDisplay" id="creatures"></p>
</body>
</html>
