<!-- Created by Nicole Walter -->
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

.npcDisplay {
border: none;
padding: 5px;
font: 14 courier-new;
width: 500px;
height: 300px;
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
<h1>Non-Player Characters</h1>
</header>

<form>

</form>
  <button onclick="newNPC()">Create NPC</button>
  <button onclick="resetNPCs()">Reset</button>
  <p class="npcDisplay" id="npcs"></p>
<script>

//credit https://github.com/rigoneri/indefinite-article.js
/*
 * indefinite-article.js v1.0.0, 12-18-2011
 * 
 * @author: Rodrigo Neri (@rigoneri)
 * 
 * (The MIT License)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE. 
 */ 
 function determineArticle(phrase) {
        
    // Getting the first word 
    var match = /\w+/.exec(phrase);
    if (match)
        var word = match[0];
    else
        return "an";
    
    var l_word = word.toLowerCase();
    // Specific start of words that should be preceeded by 'an'
    var alt_cases = ["honest", "hour", "hono"];
    for (var i in alt_cases) {
        if (l_word.indexOf(alt_cases[i]) == 0)
            return "an";
    }
    
    // Single letter word which should be preceeded by 'an'
    if (l_word.length == 1) {
        if ("aedhilmnorsx".indexOf(l_word) >= 0)
            return "an";
        else
            return "a";
    }
    
    // Capital words which should likely be preceeded by 'an'
    if (word.match(/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/)) {
        return "an";
    }
    
    // Special cases where a word that begins with a vowel should be preceeded by 'a'
    regexes = [/^e[uw]/, /^onc?e\b/, /^uni([^nmd]|mo)/, /^u[bcfhjkqrst][aeiou]/]
    for (var i in regexes) {
        if (l_word.match(regexes[i]))
            return "a"
    }
    
    // Special capital words (UK, UN)
    if (word.match(/^U[NK][AIEO]/)) {
        return "a";
    }
    else if (word == word.toUpperCase()) {
        if ("aedhilmnorsx".indexOf(l_word[0]) >= 0)
            return "an";
        else 
            return "a";
    }
    
    // Basic method of words that begin with a vowel being preceeded by 'an'
    if ("aeiou".indexOf(l_word[0]) >= 0)
        return "an";
    
    // Instances where y follwed by specific letters is preceeded by 'an'
    if (l_word.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/))
        return "an";
    
    return "a";
}

//credit https://github.com/Edwin-Pratt/js-markov
/*
MIT License

Copyright (c) 2019 Edwin Pratt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
class Markov {
  constructor (type = 'text') {
    // The type of values
    if (type === 'text') {
      this.type = type
    } else if (type === 'numeric') {
      this.type = type
    } else {
      throw new Error(
        'The Markov Chain can only accept the following types: numeric or text'
      )
    }

    // This is an array that will hold all of our states
    this.states = []

    // This is an object which will contain a list of each possible outcome
    this.possibilities = {}

    // This variable holds the order
    this.order = 3

    if (this.type === 'text') {
      // This array will keep track of all the possible ways to start a sentence
      this.start = []
    }
  }

  // Add a single state or states
  addStates (state) {
    if (Array.isArray(state)) {
      this.states = Array.from(state)
    } else {
      this.states.push(state)
    }
  }

  // Clear the Markov Chain completely
  clearChain () {
    this.states = []

    if (this.type === 'text') {
      this.start = []
    }

    this.possibilities = {}
    this.order = 3
  }

  // Clear the states
  clearState () {
    this.states = []

    if (this.type === 'text') {
      this.start = []
    }
  }

  // Clear the possibilities
  clearPossibilities () {
    this.possibilities = {}
  }

  // Get the states
  getStates () {
    return this.states
  }

  // Set the order
  setOrder (order = 3) {
    if (typeof order !== 'number') {
      console.error('Markov.setOrder: Order is not a number. Defaulting to 3.')
      order = 3
    }

    if (order <= 0) {
      console.error(
        'Markov.setOrder: Order is not a positive number. Defaulting to 3.'
      )
    }

    if (this.type === 'numeric') {
      console.warn(
        'The Markov Chain only accepts numerical data. Therefore, the order does not get used.\nThe order may be used by you to simulate an ID for the Markov Chain if required'
      )
    }

    this.order = order
  }

  // Get the order
  getOrder () {
    if (this.type === 'numeric') {
      console.warn(
        'The Markov Chain only accepts numerical data. Therefore, the order does not get used.\nThe order may be used by you to simulate an ID for the Markov Chain if required'
      )
    }

    return this.order
  }

  // Get the whole list of possibilities or a single possibility
  getPossibilities (possibility) {
    if (possibility) {
      if (this.possibilities[possibility] !== undefined) {
        return this.possibilities[possibility]
      } else {
        throw new Error('There is no such possibility called ' + possibility)
      }
    } else {
      return this.possibilities
    }
  }

  // Train the markov chain
  train (order) {
    this.clearPossibilities()

    if (order) {
      this.order = order
    }

    if (this.type === 'text') {
      for (let i = 0; i < this.states.length; i++) {
        this.start.push(this.states[i].substring(0, this.order))

        for (let j = 0; j <= this.states[i].length - this.order; j++) {
          const gram = this.states[i].substring(j, j + this.order)

          if (!this.possibilities[gram]) {
            this.possibilities[gram] = []
          }

          this.possibilities[gram].push(this.states[i].charAt(j + this.order))
        }
      }
    } else if (this.type === 'numeric') {
      for (let i = 0; i < this.states.length; i++) {
        const { state, predictions } = this.states[i]

        if (!this.possibilities[state]) {
          this.possibilities[state] = []
        }

        this.possibilities[state].push(...predictions)
      }
    }
  }

  // Generate output
  generateRandom (chars = 15) {
    if (this.type === 'text') {
      const startingState = this.random(this.start, 'array')
      let result = startingState
      let current = startingState
      let next = ''

      for (let i = 0; i < chars - this.order; i++) {
        next = this.random(this.possibilities[current], 'array')

        if (!next) {
          break
        }

        result += next
        current = result.substring(result.length - this.order, result.length)
      }

      return result
    } else if (this.type === 'numeric') {
      const possibilities = []

      for (let i = 0; i < chars; ++i) {
        const key = this.random(this.possibilities, 'object')

        if (Math.random() < 0.5) {
          possibilities.push(parseInt(key))
        } else {
          possibilities.push(parseInt(this.predict(key)))
        }
      }

      return possibilities
    }
  }

  // Generate a random value
  random (obj, type) {
    if (Array.isArray(obj) && type === 'array') {
      const index = Math.floor(Math.random() * obj.length)

      return obj[index]
    }

    if (typeof obj === 'object' && type === 'object') {
      const keys = Object.keys(obj)
      const index = Math.floor(Math.random() * keys.length)

      return keys[index]
    }
  }

  // Predict outcome - numeric only (might be a TODO)
  predict (value) {
    if (this.type === 'numeric') {
      if (this.possibilities[value]) {
        return this.random(this.possibilities[value], 'array')
      } else {
        console.error('The markov chain could not find a possibility')
      }
    } else {
      throw new Error(
        'The predict function only works with numerical values - for now'
      )
    }
  }

  getType () {
    return this.type
  }

  setType (type = 'text') {
    if (type === 'text' || type === 'numeric') {
      this.clearChain()
      this.type = type
    } else {
      throw new Error('Invalid type: ' + type)
    }
  }
}

function trainMarkovChain(strings){
    
    var splitstrings = [];
    
    for(var i = 0;i < strings.length;i++){
    	splitstrings.push(String(strings[i].split("").join(" ")));
    }
        
    var markov = new Markov();

    // Add some states
    markov.addStates(splitstrings);

    // Train the Markov Chain
    markov.train();

	return markov;    
}

function generateWord(markov, numberwords, proper, maxlen){

	function generateWord(){
    	var word = markov.generateRandom(maxlen).replaceAll(",", "").replaceAll(" ", ""); 
    	if(proper){
        	return capitalize(word);
        } else{
        	return word;
        }
    }
    
	var output = [];

	if(numberwords == 1){
    	output.push(generateWord());
    } else {
    	for(var j=0;j<numberwords;j++){
        	output.push(generateWord());
        }
    }
    
    return output;
}

var stats = [
	"STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA",
    "BEA"
];

function generateStats(){
	var numberstats = returnRandom([1, 2, 3]);
    
    var mystats = Array.from(stats);
    
    var chosenstats = [];
    for(var x=0;x<numberstats;x++){
		var chosenstat = returnRandom(mystats);
        mystats = removeValue(mystats, chosenstat);
        chosenstats.push(chosenstat);
    }
    
    for(var y=0;y<chosenstats.length;y++){
    	var modifier = returnRandom(["+4", "+3", "+2", "+1", "-1", "-2", "-3", "-4"]);
        chosenstats[y] += " " + modifier;
    }
    
    function statOrdinal(stat){
    	if(stat.includes("STR")){
        	return 1;
        }else if(stat.includes("DEX")){
        	return 2;
        }else if(stat.includes("CON")){
        	return 3;
        }else if(stat.includes("INT")){
        	return 4;
        }else if(stat.includes("WIS")){
        	return 5;
        }else if(stat.includes("CHA")){
        	return 6;
        }else if(stat.includes("BEA")){
        	return 7;
        }else{
        	return 0;
        }
    }
    
    var output = chosenstats.sort(function(a, b){return statOrdinal(a) - statOrdinal(b)});
    
    return output.join(" / ");
}

//all global npc variables (global so they are only loaded once) go here
var sexualities = ["Ace", "Heterosexual", "Bicurious", "Bisexual", "Pansexual", "Androphilic", "Gynephillic", "Homosexual", "Demisexual", "Queer", "Questioning", "Sapiosexual", "Manasexual", "Chaser", "Graysexual"];
var genders = ["Male", "Female", "Genderqueer"];
var ages = ["Young","Middle-Aged","Old"];
var traits = loadFile("FILES\\NPC\\" + "TRAITS" + ".txt").split("<br>");
var ideals = loadFile("FILES\\NPC\\" + "IDEALS" + ".txt").split("<br>");
var emotions = loadFile("FILES\\NPC\\" + "EMOTIONS" + ".txt").split("<br>");
var locales = loadFile("FILES\\NPC\\" + "LOCALES" + ".txt").split("<br>");
var activities = loadFile("FILES\\NPC\\" + "ACTIVITIES" + ".txt").split("<br>");
var trades = loadFile("FILES\\NPC\\" + "TRADES" + ".txt").split("<br>");
var races = loadFile("FILES\\NPC\\" + "RACES" + ".txt").split("<br>");

//load languages
var lang_human_raw = loadFile("FILES\\NPC\\LANGUAGES\\" + "HUMAN" + ".txt").split("<br>");

//generate language changes
var lang_human = trainMarkovChain(lang_human_raw);

function determineName(primaryrace){
	switch(primaryrace){
    	case "Human":
        	return generateWord(lang_human, 2, true, 12);
    	default:
        	return generateWord(lang_human, 2, true, 12);
    }
}

function constructNPC(){
	/*
     NPC Design
      /Name
      /Trait /Age /Sexuality /Gender /Race
      /Stats, Values /Ideal, Feels /Emotion
      Born /Locale, grew up /Activity, currently works as a /Trade
    */

	//pick a random trait / age / sexuality / gender
    var trait = returnRandom(traits).toLowerCase();
    var age = returnRandom(ages).toLowerCase();
    var sexuality = returnRandom(sexualities).toLowerCase();
    var gender = returnRandom(genders).toLowerCase();
    
    //pick a random race
	var race = returnRandom(races);
    
    var primaryrace = race.split("-")[0];
    var descriprace = race.split("-")[1];
	
    var name = determineName(primaryrace);

	//generate stats
    var stats = generateStats();
    
    //pick a random ideal / emotion / locale / activity / trade
    var ideal = returnRandom(ideals).toLowerCase();
    var emotion = returnRandom(emotions).toLowerCase();
    var locale = returnRandom(locales);
    var activity = returnRandom(activities);
    var trade = returnRandom(trades).toLowerCase();
    trade = determineArticle(trade) + " " + trade;
	
	return name + "<br>" + trait + " " + age + " " + sexuality + " " + gender + " " + descriprace + "<br>" + "Values " + ideal + " | Feels " + emotion + " | " + stats + "<br>" + "Born " + locale + ", grew up " + activity + ", currently is " + trade + ".";
}

function newNPC(){	
    var output = constructNPC();
    
    var current = document.getElementById("npcs").innerHTML;
    
    document.getElementById("npcs").innerHTML = output + "<br><br>" + current;
}

function resetNPCs(){
	document.getElementById("npcs").innerHTML = "";
}

function removeValue(array, value){
	var output = [];
    
    for(var t=0;t<array.length;t++){
    	if(array[t] == value){
        	//dont keep it	
        }else{
        	output.push(array[t]);
        }
    }
    
    return output;
}

function returnRandom(array){
	return array[Math.floor(Math.random() * array.length)];
}

function capitalize(string){
	return string.charAt(0).toUpperCase() + string.slice(1);
}

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
	  return output;
}

function creatureSearch(){
	document.getElementById("totalEncounterXP").innerHTML = "";

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
		output += loadFile(filename).replaceAll("|", " | ");
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
	creatureSearch();
	var rawcreatures = document.getElementById("creatures").innerHTML.split("<br>");
    
    var splitapart = [];
    for (var j = 0; j < rawcreatures.length; j++) {
    	var creature = rawcreatures[j].split(" | ");
        splitapart.push(creature);
    }
    
    var totalxp = document.getElementById("encounterxp").value;
    
    var currentxp = 0;
    var rawtotalcreaturexp = 0;
    
    var creatures = Array.from(splitapart);
    var encounter = [];
    
    while (totalxp > currentxp){
    	var acceptablecreatures = [];
    
    	for(var i=0;i<creatures.length;i++){
        	var crtr = creatures[i];
            var crtrxp = parseInt(crtr[4].replaceAll(",", ""));
            var remainingxp = totalxp-currentxp;
            var crtrwithinbounds = crtrxp <= remainingxp;
            if(crtrwithinbounds){
            	acceptablecreatures.push(crtr);
            }
        }
        
        var creature = [];
        
        if(acceptablecreatures.length < 1){
        	creature = creatures[Math.floor(Math.random() * creatures.length)]
        } else{
        	creature = acceptablecreatures[Math.floor(Math.random() * acceptablecreatures.length)]
        }
        
        var creaturexp = parseInt(creature[4].replaceAll(",", ""));
        var newsize = 1+(encounter.length);
        var factor = 1;
        
    	if(newsize == 1){
        	factor = 1;
        }else if(newsize == 2){
        	factor = 1.5;
        }else if(newsize >= 3 && newsize <=6){
   			factor = 2;     	
        }else if(newsize >= 7 && newsize <=10){
        	factor = 2.5;
        }else if(newsize >= 11 && newsize <=14){
        	factor = 3;
        }else if(newsize >= 15){
        	factor = 4;
        }else{
        	factor = 1;
        }
        
        rawtotalcreaturexp += creaturexp;
        var updatedxp = factor * rawtotalcreaturexp;
        encounter.push(creature);
        currentxp = updatedxp;
    }
    
    var output = [];
    for (var j = 0; j < encounter.length; j++) {
    	var creature = encounter[j];
        output.push(creature.join(" | "));
    }
    
    document.getElementById("totalEncounterXP").innerHTML = "Total Encounter XP: " + currentxp;
    document.getElementById("creatures").innerHTML = output.join("<br>");
}

</script>
<header>
<h1>Creatures and Encounters</h1>
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
<p id="totalEncounterXP"></p>
<p class="creatureDisplay" id="creatures"></p>

<header>
<h3>Calculate XP Budget</h3>
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
</form>
  <button onclick="calculateXP()">Calculate XP</button>
  <p style="display:inline-block" id="xpbudget"></p>
</body>
</html>
