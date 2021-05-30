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
             } else if (word == word.toUpperCase()) {
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
             constructor(type = 'text') {
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
             addStates(state) {
                 if (Array.isArray(state)) {
                     this.states = Array.from(state)
                 } else {
                     this.states.push(state)
                 }
             }

             // Clear the Markov Chain completely
             clearChain() {
                 this.states = []

                 if (this.type === 'text') {
                     this.start = []
                 }

                 this.possibilities = {}
                 this.order = 3
             }

             // Clear the states
             clearState() {
                 this.states = []

                 if (this.type === 'text') {
                     this.start = []
                 }
             }

             // Clear the possibilities
             clearPossibilities() {
                 this.possibilities = {}
             }

             // Get the states
             getStates() {
                 return this.states
             }

             // Set the order
             setOrder(order = 3) {
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
             getOrder() {
                 if (this.type === 'numeric') {
                     console.warn(
                         'The Markov Chain only accepts numerical data. Therefore, the order does not get used.\nThe order may be used by you to simulate an ID for the Markov Chain if required'
                     )
                 }

                 return this.order
             }

             // Get the whole list of possibilities or a single possibility
             getPossibilities(possibility) {
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
             train(order) {
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
                         const {
                             state,
                             predictions
                         } = this.states[i]

                         if (!this.possibilities[state]) {
                             this.possibilities[state] = []
                         }

                         this.possibilities[state].push(...predictions)
                     }
                 }
             }

             // Generate output
             generateRandom(chars = 15) {
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
             random(obj, type) {
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
             predict(value) {
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

             getType() {
                 return this.type
             }

             setType(type = 'text') {
                 if (type === 'text' || type === 'numeric') {
                     this.clearChain()
                     this.type = type
                 } else {
                     throw new Error('Invalid type: ' + type)
                 }
             }
         }

         function trainMarkovChain(strings) {

             var splitstrings = [];

             for (var i = 0; i < strings.length; i++) {
                 splitstrings.push(String(strings[i].split("").join(" ")));
             }

             var markov = new Markov();

             // Add some states
             markov.addStates(splitstrings);

             // Train the Markov Chain
             markov.train();

             return markov;
         }

         function truncateString(str, num) {
             if (str.length <= num) {
                 return str
             }
             return str.slice(0, num);
         }

         function generateWord(markov, numberwords, proper, maxlen, minlen) {

             function generateWord() {
                 var word = markov.generateRandom(100).replaceAll(",", "").replaceAll(" ", "");
                 while (word.length < minlen) {
                     word += markov.generateRandom(100).replaceAll(",", "").replaceAll(" ", "");
                 }

                 word = truncateString(word, maxlen);

                 if (proper) {
                     word = word.toLowerCase();
                     return capitalize(word);
                 } else {
                     return word;
                 }
             }

             var output = [];

             if (numberwords == 1) {
                 output.push(generateWord());
             } else {
                 for (var j = 0; j < numberwords; j++) {
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

         function generateStats() {
             var numberstats = returnRandom([1, 2, 3]);

             var mystats = Array.from(stats);

             var chosenstats = [];
             for (var x = 0; x < numberstats; x++) {
                 var chosenstat = returnRandom(mystats);
                 mystats = removeValue(mystats, chosenstat);
                 chosenstats.push(chosenstat);
             }

             for (var y = 0; y < chosenstats.length; y++) {
                 var modifier = returnRandom(["+4", "+3", "+2", "+1", "-1", "-2", "-3", "-4"]);
                 chosenstats[y] += " " + modifier;
             }

             function statOrdinal(stat) {
                 if (stat.includes("STR")) {
                     return 1;
                 } else if (stat.includes("DEX")) {
                     return 2;
                 } else if (stat.includes("CON")) {
                     return 3;
                 } else if (stat.includes("INT")) {
                     return 4;
                 } else if (stat.includes("WIS")) {
                     return 5;
                 } else if (stat.includes("CHA")) {
                     return 6;
                 } else if (stat.includes("BEA")) {
                     return 7;
                 } else {
                     return 0;
                 }
             }

             var output = chosenstats.sort(function(a, b) {
                 return statOrdinal(a) - statOrdinal(b)
             });

             return output.join(" / ");
         }

         //all global npc variables (global so they are only loaded once) go here
         var sexualities = ["Ace", "Straight", "Bisexual", "Gay", "Queer"];
         var genders = ["Male", "Female"];
         var ages = ["Young", "Middle-Aged", "Old"];
         var traits = loadFile("FILES\\NPC\\" + "TRAITS" + ".txt").split("<br>");
         var ideals = loadFile("FILES\\NPC\\" + "IDEALS" + ".txt").split("<br>");
         var emotions = loadFile("FILES\\NPC\\" + "EMOTIONS" + ".txt").split("<br>");
         var locales = loadFile("FILES\\NPC\\" + "LOCALES" + ".txt").split("<br>");
         var activities = loadFile("FILES\\NPC\\" + "ACTIVITIES" + ".txt").split("<br>");
         var trades = loadFile("FILES\\NPC\\" + "TRADES" + ".txt").split("<br>");
         var races = loadFile("FILES\\NPC\\" + "RACES" + ".txt").split("<br>");

         //load languages
         var lang_raw_human = loadFile("FILES\\NPC\\LANGUAGES\\" + "HUMAN" + ".txt").split("<br>");
         var lang_raw_elvish = loadFile("FILES\\NPC\\LANGUAGES\\" + "ELVISH" + ".txt").split("<br>");
         var lang_raw_aasimar = loadFile("FILES\\NPC\\LANGUAGES\\" + "AASIMAR" + ".txt").split("<br>");
         var lang_raw_beastfolk = loadFile("FILES\\NPC\\LANGUAGES\\" + "BEASTFOLK" + ".txt").split("<br>");
         var lang_raw_dragonborn = loadFile("FILES\\NPC\\LANGUAGES\\" + "DRAGONBORN" + ".txt").split("<br>");
         var lang_raw_dwarvish = loadFile("FILES\\NPC\\LANGUAGES\\" + "DWARVISH" + ".txt").split("<br>");
         var lang_raw_firbolg = loadFile("FILES\\NPC\\LANGUAGES\\" + "FIRBOLG" + ".txt").split("<br>");
         var lang_raw_genasi = loadFile("FILES\\NPC\\LANGUAGES\\" + "GENASI" + ".txt").split("<br>");
         var lang_raw_gith = loadFile("FILES\\NPC\\LANGUAGES\\" + "GITH" + ".txt").split("<br>");
         var lang_raw_gnomish = loadFile("FILES\\NPC\\LANGUAGES\\" + "GNOMISH" + ".txt").split("<br>");
         var lang_raw_goblinoid = loadFile("FILES\\NPC\\LANGUAGES\\" + "GOBLINOID" + ".txt").split("<br>");
         var lang_raw_goliath = loadFile("FILES\\NPC\\LANGUAGES\\" + "GOLIATH" + ".txt").split("<br>");
         var lang_raw_halfling = loadFile("FILES\\NPC\\LANGUAGES\\" + "HALFLING" + ".txt").split("<br>");
         var lang_raw_kenku = loadFile("FILES\\NPC\\LANGUAGES\\" + "KENKU" + ".txt").split("<br>");
         var lang_raw_kobold = loadFile("FILES\\NPC\\LANGUAGES\\" + "KOBOLD" + ".txt").split("<br>");
         var lang_raw_lizardfolk = loadFile("FILES\\NPC\\LANGUAGES\\" + "LIZARDFOLK" + ".txt").split("<br>");
         var lang_raw_orcish = loadFile("FILES\\NPC\\LANGUAGES\\" + "ORCISH" + ".txt").split("<br>");
         var lang_raw_shifter = loadFile("FILES\\NPC\\LANGUAGES\\" + "SHIFTER" + ".txt").split("<br>");
         var lang_raw_tabaxi = loadFile("FILES\\NPC\\LANGUAGES\\" + "TABAXI" + ".txt").split("<br>");
         var lang_raw_tiefling = loadFile("FILES\\NPC\\LANGUAGES\\" + "TIEFLING" + ".txt").split("<br>");
         var lang_raw_triton = loadFile("FILES\\NPC\\LANGUAGES\\" + "TRITON" + ".txt").split("<br>");
         var lang_raw_warforged = loadFile("FILES\\NPC\\LANGUAGES\\" + "WARFORGED" + ".txt").split("<br>");
         var lang_raw_yuanti = loadFile("FILES\\NPC\\LANGUAGES\\" + "YUAN TI" + ".txt").split("<br>");


         //generate language changes
         var lang_human = trainMarkovChain(lang_raw_human);
         var lang_elvish = trainMarkovChain(lang_raw_elvish);
         var lang_aasimar = trainMarkovChain(lang_raw_aasimar);
         var lang_beastfolk = trainMarkovChain(lang_raw_beastfolk);
         var lang_dragonborn = trainMarkovChain(lang_raw_dragonborn);
         var lang_dwarvish = trainMarkovChain(lang_raw_dwarvish);
         var lang_firbolg = trainMarkovChain(lang_raw_firbolg);
         var lang_genasi = trainMarkovChain(lang_raw_genasi);
         var lang_gith = trainMarkovChain(lang_raw_gith);
         var lang_gnomish = trainMarkovChain(lang_raw_gnomish);
         var lang_goblinoid = trainMarkovChain(lang_raw_goblinoid);
         var lang_goliath = trainMarkovChain(lang_raw_goliath);
         var lang_halfling = trainMarkovChain(lang_raw_halfling);
         var lang_kenku = trainMarkovChain(lang_raw_kenku);
         var lang_kobold = trainMarkovChain(lang_raw_kobold);
         var lang_lizardfolk = trainMarkovChain(lang_raw_lizardfolk);
         var lang_orcish = trainMarkovChain(lang_raw_orcish);
         var lang_shifter = trainMarkovChain(lang_raw_shifter);
         var lang_tabaxi = trainMarkovChain(lang_raw_tabaxi);
         var lang_tiefling = trainMarkovChain(lang_raw_tiefling);
         var lang_triton = trainMarkovChain(lang_raw_triton);
         var lang_warforged = trainMarkovChain(lang_raw_warforged);
         var lang_yuanti = trainMarkovChain(lang_raw_yuanti);

         //determine name by race
         function determineName(primaryrace) {
             var output = [];

             switch (primaryrace) {
                 case "Dwarf":
                     output = generateWord(lang_dwarvish, 2, true, 12, 8);
                     break;
                 case "Elf":
                     output = generateWord(lang_elvish, 4, true, 8, 6);
                     break;
                 case "Halfling":
                     output = generateWord(lang_halfling, 5, true, 6, 2);
                     break;
                 case "Human":
                     output = generateWord(lang_human, 2, true, 8, 3);
                     break;
                 case "Dragonborn":
                     output = generateWord(lang_dragonborn, 1, true, 20, 15);
                     break;
                 case "Gnome":
                     output = generateWord(lang_gnome, 3, true, 8, 6);
                     break;
                 case "Aasimar":
                     output = generateWord(lang_aasimar, 1, true, 25, 5);
                     break;
                 case "Tiefling":
                     output = generateWord(lang_tiefling, 1, true, 25, 5);
                     break;
                 case "Shifter":
                     output = generateWord(lang_shifter, 1, true, 4, 2);
                     break;
                 case "Gith":
                     output = generateWord(lang_gith, 2, true, 25, 5);
                     break;
                 case "Firbolg":
                     output = generateWord(lang_firbolg, 1, true, 12, 10);
                     break;
                 case "Goliath":
                     output = generateWord(lang_goliath, 2, true, 25, 5);
                     break;
                 case "Kenku":
                     output = generateWord(lang_kenku, 1, true, 5, 2);
                     break;
                 case "Lizardfolk":
                     output = generateWord(lang_lizardfolk, 2, true, 20, 5);
                     break;
                 case "Tabaxi":
                     output = generateWord(lang_tabaxi, 2, true, 20, 5);
                     break;
                 case "Triton":
                     output = generateWord(lang_triton, 3, true, 18, 12);
                     break;
                 case "Goblinoid":
                     output = generateWord(lang_goblinoid, 6, true, 4, 2);
                     break;
                 case "Kobold":
                     output = generateWord(lang_kobold, 2, true, 20, 5);
                     break;
                 case "Yuan Ti":
                     output = generateWord(lang_yuanti, 1, true, 30, 5);
                     break;
                 case "Orc":
                     output = generateWord(lang_orcish, 2, true, 20, 5);
                     break;
                 case "Warforged":
                     output = generateWord(lang_warforged, 1, true, 20, 5);
                     break;
                 case "Beastfolk":
                     output = generateWord(lang_beastfolk, 2, true, 20, 5);
                     break;
                 case "Genasi":
                     output = generateWord(lang_genasi, 2, true, 20, 5);
                     break;
                 default:
                     output = generateWord(lang_human, 2, true, 12, 2);
             }

             return output.join(" ");
         }

         function constructNPC() {
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

             //generate stats - currently not being used on NPCs
             //var stats = generateStats();

             //pick a random ideal / emotion / locale / activity / trade
             var ideal = returnRandom(ideals).toLowerCase();
             var emotion = returnRandom(emotions).toLowerCase();
             var locale = returnRandom(locales);
             var activity = returnRandom(activities);
             var trade = returnRandom(trades).toLowerCase();
             trade = determineArticle(trade) + " " + trade;
			 
			 var newline_singletab = "<br>&nbsp;&nbsp;&nbsp;&nbsp;";
			 var newline_doubletab = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			 var newline_tripletab = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			 
			 return name + newline_singletab + trait + " " + age + " " + sexuality + " " + gender + ";" + newline_doubletab + "Is " + determineArticle(descriprace) + " " + descriprace + ";" + newline_doubletab + "Values " + ideal + " | Feels " + emotion + ";" + newline_tripletab + "Born " + locale + ";" + newline_tripletab + "Grew up " + activity + ";" + newline_tripletab + "Currently is " + trade + ".";
         }

         function newNPC() {
             var output = constructNPC();

             var current = document.getElementById("npcs").innerHTML;

             document.getElementById("npcs").innerHTML = output + "<br><br>" + current;
         }

         function clearNPCs() {
             document.getElementById("npcs").innerHTML = "";
         }

         function removeValue(array, value) {
             var output = [];

             for (var t = 0; t < array.length; t++) {
                 if (array[t] == value) {
                     //dont keep it	
                 } else {
                     output.push(array[t]);
                 }
             }

             return output;
         }

         function returnRandom(array) {
             return array[Math.floor(Math.random() * array.length)];
         }

         function capitalize(string) {
             return string.charAt(0).toUpperCase() + string.slice(1);
         }

         function isEmpty(value) {
             return (value == null || value.length === 0);
         }

         function calculateXP() {
             var level = document.getElementById("level").value;
             var numchar = document.getElementById("numchar").value;
             var difficulty = document.getElementById("difficulty").value;
             var xp = "";

             function easyXP() {
                 switch (level) {
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

             function mediumXP() {
                 switch (level) {
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

             function hardXP() {
                 switch (level) {
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

             function deadlyXP() {
                 switch (level) {
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

             switch (difficulty) {
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
             document.getElementById("treasurexp").value = xp;
         }

         function loadFile(filePath) {
             var result = null;
             var xmlhttp = new XMLHttpRequest();
             xmlhttp.open("GET", filePath, false);
             xmlhttp.send();
             if (xmlhttp.status == 200) {
                 result = xmlhttp.responseText;
             }
             result = result.split("/");
             var output = "";
             var i;
             for (i = 0; i < result.length; i++) {
                 var linebreak = "";
                 if (i == result.length - 1) {
                     linebreak = "";
                 } else {
                     linebreak = "<br>";
                 }
                 output += result[i] + linebreak;
             }
             return output;
         }

         function creatureSearch() {
             document.getElementById("totalEncounterXP").innerHTML = "";

             var output = "";

             var selectElement = document.getElementById('environment');
             var environments = Array.from(selectElement.selectedOptions).map(option => option.value);

             if (environments.length == 0) {
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
                 var typewithoutsubtype = type.split("(")[0];
                 var bookwithoutpage = String(book.split("p.")[0]);

                 if (
                     filterName(name.toLowerCase()) ||
                     filterXP(xpint) ||
                     filterType(typewithoutsubtype.slice().trim()) ||
                     filterBook(bookwithoutpage.slice().trim()) ||
                     filterAlignment(alignment.slice().trim()) ||
                     filterSize(size.slice().trim()) ||
                     isEmpty(name)
                 ) {
                     continue;
                 }

                 var newcreature = [name, size, type, alignment, xp, book];
                 filtered.push(newcreature.join(" | "));
             }

             output = filtered;
             document.getElementById("creatures").innerHTML = output.join("<br>");
         }

         //if filter returns true, we do filter the row
         function filterName(name) {
             var namefilter = String(document.getElementById("crname").value).slice(0).toLowerCase();
             if (isEmpty(name) ||
                 isEmpty(namefilter) ||
                 name.includes(namefilter)
             ) {
                 return false;
             } else {
                 return true;
             }
         }

         //filter row if minxp is not null && less than xp
         //same in reverse for maxxp
         function filterXP(xp) {
             var minxp = document.getElementById("minxp").value;
             var maxxp = document.getElementById("maxxp").value;

             if (!isEmpty(minxp) && minxp > xp) {
                 return true;
             }

             if (!isEmpty(maxxp) && maxxp < xp) {
                 return true;
             }

             return false;
         }

         //filter if the typefilters are not null, and the type is not included
         function filterType(type) {
             var typefilters = Array.from(document.getElementById('creaturetype').selectedOptions).map(({
                 value
             }) => value).join(",");

             if (!isEmpty(typefilters) && !(typefilters.includes(type))) {
                 return true;
             }

             return false;
         }

         function filterBook(book) {
             var bookfilters = Array.from(document.getElementById('book').selectedOptions).map(({
                 value
             }) => value).join(",").trim();

             if (!isEmpty(bookfilters) && !(bookfilters.includes(book))) {
                 return true;
             }

             return false;
         }

         function filterAlignment(alignment) {
             var alignmentfilters = Array.from(document.getElementById('alignment').selectedOptions).map(({
                 value
             }) => value).join(",").trim();

             if (!isEmpty(alignmentfilters) && !(alignmentfilters.includes(alignment))) {
                 return true;
             }

             return false;
         }

         function filterSize(size) {
             var sizefilters = Array.from(document.getElementById('size').selectedOptions).map(({
                 value
             }) => value).join(",").trim();

             if (!isEmpty(sizefilters) && !(sizefilters.includes(size))) {
                 return true;
             }

             return false;
         }

         function sortAlphabeticallyAscending() {
             var output = document.getElementById("creatures").innerHTML.split("<br>");

             output = output.sort();

             document.getElementById("creatures").innerHTML = output.join("<br>");
         }

         function sortAlphabeticallyDescending() {
             var output = document.getElementById("creatures").innerHTML.split("<br>");

             output = output.sort().reverse();

             document.getElementById("creatures").innerHTML = output.join("<br>");
         }

         function sortXP(ascending) {
             var creatures = document.getElementById("creatures").innerHTML.split("<br>");

             var splitapart = [];
             for (var j = 0; j < creatures.length; j++) {
                 var creature = creatures[j].split(" | ");
                 splitapart.push(creature);
             }

             splitapart = splitapart.sort(function(a, b) {
                 return parseInt(a[4].replace(",", "")) - parseInt(b[4].replace(",", ""));
             })

             if (!ascending) {
                 splitapart = splitapart.reverse();
             }

             var output = [];
             for (var j = 0; j < splitapart.length; j++) {
                 var creature = splitapart[j];
                 output.push(creature.join(" | "));
             }

             document.getElementById("creatures").innerHTML = output.join("<br>");
         }

         function generateEncounter() {
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

             while (totalxp > currentxp) {
                 var acceptablecreatures = [];

                 for (var i = 0; i < creatures.length; i++) {
                     var crtr = creatures[i];
                     var crtrxp = parseInt(crtr[4].replaceAll(",", ""));
                     var remainingxp = totalxp - currentxp;
                     var crtrwithinbounds = crtrxp <= remainingxp;
                     if (crtrwithinbounds) {
                         acceptablecreatures.push(crtr);
                     }
                 }

                 var creature = [];

                 if (acceptablecreatures.length < 1) {
                     creature = creatures[Math.floor(Math.random() * creatures.length)]
                 } else {
                     creature = acceptablecreatures[Math.floor(Math.random() * acceptablecreatures.length)]
                 }

                 var creaturexp = parseInt(creature[4].replaceAll(",", ""));
                 var newsize = 1 + (encounter.length);
                 var factor = 1;

                 if (newsize == 1) {
                     factor = 1;
                 } else if (newsize == 2) {
                     factor = 1.5;
                 } else if (newsize >= 3 && newsize <= 6) {
                     factor = 2;
                 } else if (newsize >= 7 && newsize <= 10) {
                     factor = 2.5;
                 } else if (newsize >= 11 && newsize <= 14) {
                     factor = 3;
                 } else if (newsize >= 15) {
                     factor = 4;
                 } else {
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
             document.getElementById("treasurexp").value = currentxp;
             document.getElementById("creatures").innerHTML = output.join("<br>");
             generateTreasure();
         }

         function determineSentence() {
             var output = [];

             var endpunc = returnRandom([".", "!", "?", "?!"]);

             var race = document.getElementById("chosenlang").value;
             //determine length of sentence: 1-10
             var sentence_length = generateNumber(1, 10);
             //for the length of our sentence...
             for (var x = 0; x < sentence_length; x++) {
                 //generate a word of the selected language with a random min/max length and proper = false
                 var minleng = generateNumber(1, 5);
                 var maxleng = generateNumber(1, 5);
                 output.push(returnRandomWordPerRace(race, 1, false, maxleng + minleng, minleng)[0].toLowerCase());
             }

             //capitalize first word
             output[0] = capitalize(output[0]);

             if (sentence_length == 1) {
                 document.getElementById("wordbank").innerHTML = output[0] + endpunc + "<br>" + document.getElementById("wordbank").innerHTML;
                 return;
             }

             //determine if we will capitalize a word
             //if so, pick word at random after 1st
             var randompropernoun = generateNumber(-5, output.length - 1);

             if (randompropernoun > -1) {
                 output[randompropernoun] = capitalize(output[randompropernoun]);
             }
             //determine if we will do a (, ; -)
             //if so, pick word and add it on end
             var randompunc = generateNumber(-3, output.length - 2);

             if (randompunc > -1) {
                 output[randompunc] = output[randompunc] + returnRandom([",", ";", " -"]);
             }



             //determine ending punctuation (? . ! ?!)
             output[output.length - 1] = output[output.length - 1] + endpunc;

             //set sentence to element value
             document.getElementById("wordbank").innerHTML = output.join(" ") + "<br>" + document.getElementById("wordbank").innerHTML;
         }

         function returnRandomWordPerRace(race, numwords, proper, maxleng, minleng) {
             var output = "";

             switch (race) {
                 case "Dwarf":
                     output = generateWord(lang_dwarvish, numwords, proper, maxleng, minleng);
                     break;
                 case "Elf":
                     output = generateWord(lang_elvish, numwords, proper, maxleng, minleng);
                     break;
                 case "Halfling":
                     output = generateWord(lang_halfling, numwords, proper, maxleng, minleng);
                     break;
                 case "Human":
                     output = generateWord(lang_human, numwords, proper, maxleng, minleng);
                     break;
                 case "Dragonborn":
                     output = generateWord(lang_dragonborn, numwords, proper, maxleng, minleng);
                     break;
                 case "Gnome":
                     output = generateWord(lang_gnomish, numwords, proper, maxleng, minleng);
                     break;
                 case "Aasimar":
                     output = generateWord(lang_aasimar, numwords, proper, maxleng, minleng);
                     break;
                 case "Tiefling":
                     output = generateWord(lang_tiefling, numwords, proper, maxleng, minleng);
                     break;
                 case "Shifter":
                     output = generateWord(lang_shifter, numwords, proper, maxleng, minleng);
                     break;
                 case "Gith":
                     output = generateWord(lang_gith, numwords, proper, maxleng, minleng);
                     break;
                 case "Firbolg":
                     output = generateWord(lang_firbolg, numwords, proper, maxleng, minleng);
                     break;
                 case "Goliath":
                     output = generateWord(lang_goliath, numwords, proper, maxleng, minleng);
                     break;
                 case "Kenku":
                     output = generateWord(lang_kenku, numwords, proper, maxleng, minleng);
                     break;
                 case "Lizardfolk":
                     output = generateWord(lang_lizardfolk, numwords, proper, maxleng, minleng);
                     break;
                 case "Tabaxi":
                     output = generateWord(lang_tabaxi, numwords, proper, maxleng, minleng);
                     break;
                 case "Triton":
                     output = generateWord(lang_triton, numwords, proper, maxleng, minleng);
                     break;
                 case "Goblinoid":
                     output = generateWord(lang_goblinoid, numwords, proper, maxleng, minleng);
                     break;
                 case "Kobold":
                     output = generateWord(lang_kobold, numwords, proper, maxleng, minleng);
                     break;
                 case "Yuan Ti":
                     output = generateWord(lang_yuanti, numwords, proper, maxleng, minleng);
                     break;
                 case "Orc":
                     output = generateWord(lang_orcish, numwords, proper, maxleng, minleng);
                     break;
                 case "Warforged":
                     output = generateWord(lang_warforged, numwords, proper, maxleng, minleng);
                     break;
                 case "Beastfolk":
                     output = generateWord(lang_beastfolk, numwords, proper, maxleng, minleng);
                     break;
                 case "Genasi":
                     output = generateWord(lang_genasi, numwords, proper, maxleng, minleng);
                     break;
                 default:
                     output = "Unable to generate word";
             }
             return output;
         }

         function determineWords() {
             var output = [];

             var numwords = document.getElementById("numwords").value;
             var minimumlength = document.getElementById("minlength").value;
             var maximumlength = document.getElementById("maxlength").value;
             var race = document.getElementById("chosenlang").value;

             output = returnRandomWordPerRace(race, numwords, false, maximumlength, minimumlength);

             document.getElementById("wordbank").innerHTML = output.join("   ").toLowerCase() + "<br>" + document.getElementById("wordbank").innerHTML;
         }

         function clearWords() {
             document.getElementById("wordbank").innerHTML = "";
         }

         function clearTreasure() {
             document.getElementById("treasure").innerHTML = "";
         }


         //load loot
         var gp10 = loadFile("FILES\\LOOT\\" + "10GP" + ".txt").split("<br>");
         var gp25 = loadFile("FILES\\LOOT\\" + "25GP" + ".txt").split("<br>");
         var gp50 = loadFile("FILES\\LOOT\\" + "50GP" + ".txt").split("<br>");
         var gp100 = loadFile("FILES\\LOOT\\" + "100GP" + ".txt").split("<br>");
         var gp250 = loadFile("FILES\\LOOT\\" + "250GP" + ".txt").split("<br>");
         var gp500 = loadFile("FILES\\LOOT\\" + "500GP" + ".txt").split("<br>");
         var gp750 = loadFile("FILES\\LOOT\\" + "750GP" + ".txt").split("<br>");
         var gp1000 = loadFile("FILES\\LOOT\\" + "1000GP" + ".txt").split("<br>");
         var gp2500 = loadFile("FILES\\LOOT\\" + "2500GP" + ".txt").split("<br>");
         var gp5000 = loadFile("FILES\\LOOT\\" + "5000GP" + ".txt").split("<br>");
         var gp7500 = loadFile("FILES\\LOOT\\" + "7500GP" + ".txt").split("<br>");

         //load magic tables
         var tablea = loadFile("FILES\\MAGIC\\" + "TABLEA" + ".txt").split("<br>");
         var tableb = loadFile("FILES\\MAGIC\\" + "TABLEB" + ".txt").split("<br>");
         var tablec = loadFile("FILES\\MAGIC\\" + "TABLEC" + ".txt").split("<br>");
         var tabled = loadFile("FILES\\MAGIC\\" + "TABLED" + ".txt").split("<br>");
         var tablee = loadFile("FILES\\MAGIC\\" + "TABLEE" + ".txt").split("<br>");
         var tablef = loadFile("FILES\\MAGIC\\" + "TABLEF" + ".txt").split("<br>");
         var tableg = loadFile("FILES\\MAGIC\\" + "TABLEG" + ".txt").split("<br>");
         var tableh = loadFile("FILES\\MAGIC\\" + "TABLEH" + ".txt").split("<br>");
         var tablei = loadFile("FILES\\MAGIC\\" + "TABLEI" + ".txt").split("<br>");

         //load custom items
         var netlibram = loadFile("FILES\\MAGIC\\" + "NETLIBRAMOFRANDOMMAGICALEFFECTS" + ".txt").split("<br>");
         var blessings = loadFile("FILES\\CUSTOM ITEMS\\" + "BLESSINGS AND CHARMS" + ".txt").split("<br>");
         var boons = loadFile("FILES\\CUSTOM ITEMS\\" + "BOONS" + ".txt").split("<br>");
         var longtermmadness = loadFile("FILES\\CUSTOM ITEMS\\" + "LONG TERM MADNESS" + ".txt").split("<br>");
         var majorbene = loadFile("FILES\\CUSTOM ITEMS\\" + "MAJOR BENE" + ".txt").split("<br>");
         var majordetr = loadFile("FILES\\CUSTOM ITEMS\\" + "MAJOR DETR" + ".txt").split("<br>");
         var minorbene = loadFile("FILES\\CUSTOM ITEMS\\" + "MINOR BENE" + ".txt").split("<br>");
         var minordetr = loadFile("FILES\\CUSTOM ITEMS\\" + "MINOR DETR" + ".txt").split("<br>");
         var minorprop = loadFile("FILES\\CUSTOM ITEMS\\" + "MINOR PROPERTIES" + ".txt").split("<br>");
         var quirks = loadFile("FILES\\CUSTOM ITEMS\\" + "QUIRKS" + ".txt").split("<br>");
         var shorttermmadness = loadFile("FILES\\CUSTOM ITEMS\\" + "SHORT TERM MADNESS" + ".txt").split("<br>");

         function breakTab() {
             return "<br>&emsp;&emsp;";
         }

         /*
         PL1:	- adjective/noun + random magical effect
         PL2:	- minor beneficial / minor detrimental
         PL3:	- major beneficial / major detrimental 
         PL4:	- blessing charm or a boon / madness or sentience
         */
         function generatePL1() {
             return "A " + returnRandom(quirks).toLowerCase() + " token of " + returnRandom(minorprop).toLowerCase() + " with the effect of:" + breakTab() + returnRandom(netlibram);
         }

         function generatePL2() {
             return "An item with the following effects:" + breakTab() + returnRandom(minorbene) + breakTab() + returnRandom(minordetr);
         }

         function generatePL3() {
             return "An item with the following effects:" + breakTab() + returnRandom(majorbene) + breakTab() + returnRandom(majordetr);
         }

         function generatePL4() {
             var item = "An item with the following effects:" + breakTab() + returnRandom(returnRandom([blessings, boons])) + breakTab() + returnRandom(returnRandom([shorttermmadness, longtermmadness]));

             switch (generateNumber(1, 4)) {
                 case 1:
                     item += breakTab() + "It is sentient, but can only communicate emotion. Roll an NPC to see who it used to be.";
                     break;
                 case 2:
                     item += breakTab() + "It is sentient, but can only communicate telepathically. Roll an NPC to see who it used to be.";
                     break;
                 case 3:
                     item += breakTab() + "It is sentient, but can only communicate through speech. Roll an NPC to see who it used to be.";
                     break;
                 default:
                     break;
             }

             return item;
         }

         function customMagicItem(pl) {
             var output = "";
             //based on pl, fork into one of four different case
             switch (pl) {
                 case 1:
                     output = generatePL1();
                     break;
                 case 2:
                     output = generatePL2();
                     break;
                 case 3:
                     output = generatePL3();
                     break;
                 case 4:
                     output = generatePL4();
                     break;
                 default:
                     output = "Item unable to be generated";
             }
             //generate a name

             return output;
         }

         function generateFirstBracketTreasure() {
             var goodies = [];

             var rarenum = generateNumber(0, 1);
             var unrarenum = generateNumber(0, 1);
             var uncommonnum = generateNumber(1, 2);
             var commonnum = generateNumber(1, 2);

             var rareset = gp100;
             var unrareset = gp50;
             var uncommonset = gp25;
             var commonset = gp10;

             if (rarenum == 1) {
                 goodies.push("100gp - " + returnRandom(rareset));
             }

             if (unrarenum == 1) {
                 goodies.push("50gp - " + returnRandom(unrareset));
             }

             for (var x = 0; x < uncommonnum; x++) {
                 goodies.push("25gp - " + returnRandom(uncommonset));
             }

             for (var y = 0; y < commonnum; y++) {
                 goodies.push("10gp - " + returnRandom(commonset));
             }

             var itemset = tablea.concat(tableb).concat(tablec);
             var isCustom = generateNumber(0, 1);

             if (isCustom == 1) {
                 goodies.push(customMagicItem(1));
             } else {
                 goodies.push(returnRandom(itemset));
             }

             return goodies;
         }

         function generateSecondBracketTreasure() {
             var goodies = [];

             var rarenum = generateNumber(0, 1);
             var unrarenum = generateNumber(0, 1);
             var uncommonnum = generateNumber(1, 2);
             var commonnum = generateNumber(1, 2);

             var rareset = gp500;
             var unrareset = gp250;
             var uncommonset = gp100;
             var commonset = gp50;

             if (rarenum == 1) {
                 goodies.push("500gp - " + returnRandom(rareset));
             }

             if (unrarenum == 1) {
                 goodies.push("250gp - " + returnRandom(unrareset));
             }

             for (var x = 0; x < uncommonnum; x++) {
                 goodies.push("100gp - " + returnRandom(uncommonset));
             }

             for (var y = 0; y < commonnum; y++) {
                 goodies.push("50gp - " + returnRandom(commonset));
             }

             goodies.push(returnRandom(tablea.concat(tableb).concat(tablec)));

             var itemset = tablec.concat(tabled).concat(tablee).concat(tablef);
             var isCustom = generateNumber(0, 1);

             if (isCustom == 1) {
                 goodies.push(customMagicItem(2));
             } else {
                 goodies.push(returnRandom(itemset));
             }

             return goodies;
         }

         function generateThirdBracketTreasure() {
             var goodies = [];

             var rarenum = generateNumber(0, 1);
             var unrarenum = generateNumber(0, 1);
             var uncommonnum = generateNumber(1, 2);
             var commonnum = generateNumber(1, 2);

             var rareset = gp1000;
             var unrareset = gp750;
             var uncommonset = gp500;
             var commonset = gp250;

             if (rarenum == 1) {
                 goodies.push("1000gp - " + returnRandom(rareset));
             }

             if (unrarenum == 1) {
                 goodies.push("750gp - " + returnRandom(unrareset));
             }

             for (var x = 0; x < uncommonnum; x++) {
                 goodies.push("500gp - " + returnRandom(uncommonset));
             }

             for (var y = 0; y < commonnum; y++) {
                 goodies.push("250gp - " + returnRandom(commonset));
             }

             var combinedset = tablea.concat(tableb).concat(tablec).concat(tabled).concat(tablee).concat(tablef);
             goodies.push(returnRandom(combinedset));
             goodies.push(returnRandom(combinedset));

             var itemset = tablef.concat(tableg);
             var isCustom = generateNumber(0, 1);

             if (isCustom == 1) {
                 goodies.push(customMagicItem(3));
             } else {
                 goodies.push(returnRandom(itemset));
             }

             return goodies;
         }

         function generateFourthBracketTreasure() {
             var goodies = [];

             var rarenum = generateNumber(0, 1);
             var unrarenum = generateNumber(0, 1);
             var uncommonnum = generateNumber(1, 2);
             var commonnum = generateNumber(1, 2);

             var rareset = gp7500;
             var unrareset = gp5000;
             var uncommonset = gp2500;
             var commonset = gp1000;

             if (rarenum == 1) {
                 goodies.push("7500gp - " + returnRandom(rareset));
             }

             if (unrarenum == 1) {
                 goodies.push("5000gp - " + returnRandom(unrareset));
             }

             for (var x = 0; x < uncommonnum; x++) {
                 goodies.push("2500gp - " + returnRandom(uncommonset));
             }

             for (var y = 0; y < commonnum; y++) {
                 goodies.push("1000gp - " + returnRandom(commonset));
             }

             var combinedset = tablea.concat(tableb).concat(tablec).concat(tabled).concat(tablee).concat(tablef).concat(tableg);
             goodies.push(returnRandom(combinedset));
             goodies.push(returnRandom(combinedset));
             goodies.push(returnRandom(combinedset));

             var itemset = tableh.concat(tablei);
             var isCustom = generateNumber(0, 1);

             if (isCustom == 1) {
                 goodies.push(customMagicItem(4));
             } else {
                 goodies.push(returnRandom(itemset));
             }

             return goodies;
         }

         function generateTreasure() {
             var output = [];

             switch (determineBracket()) {
                 case 1:
                     output = generateFirstBracketTreasure();
                     break;
                 case 2:
                     output = generateSecondBracketTreasure();
                     break;
                 case 3:
                     output = generateThirdBracketTreasure();
                     break;
                 case 4:
                     output = generateFourthBracketTreasure();
                     break;
                 default:
                     output = ["Error!", "You must first set an XP value."];
             }

             document.getElementById("treasure").innerHTML = output.join("<br>") + "<br><br>" + document.getElementById("treasure").innerHTML;
         }

         function determineBracket() {
             var xp = document.getElementById("treasurexp").value;
             if (xp <= 1100) {
                 return 1;
             } else if (xp <= 5900) {
                 return 2;
             } else if (xp <= 15000) {
                 return 3;
             } else {
                 return 4;
             }
         }

         function generateNumber(min, max) {
             return Math.floor(Math.random() * ((max + 1) - min) + min);
         }

         //markov chain works by common patterns, so if no two encounters start with the same values it cant make sense of it
         //to fix this, we need to split up the file into two word pairs
         var encounters_raw = loadFile("FILES\\" + "ENCOUNTERS" + ".txt").split("<br>"); //["One Two Three Four", "Four Five Six Seven"]
         /*
	 var encounters_cooked = [];
         for (var i = 0; i < encounters_raw.length; i++) {
             var split = encounters_raw[i].split(" ");

             //for my sentence split 
             for (var h = 0; h < split.length; h++) {
                 //for every index
                 //build a substring from this index to every other index
                 for (var x = 0; x < split.length; x++) {
                     var slice = "";
                     if (x == h) {
                         continue;
                     } else if (x > h) {
                         slice = (split.slice(h, x + 1).join(" "))
                     } else {
                         slice = (split.slice(x, h + 1).join(" "))
                     }

                     if (!encounters_cooked.includes(slice)) {
                         encounters_cooked.push(slice);
                     }
                 }
             }
         }
         var encounters_chain = new Markov();
         encounters_chain.addStates(encounters_cooked);
         encounters_chain.train(100);
	 */

         function createEncounter() {
             /*
	     var output = encounters_chain.generateRandom(1000).replaceAll("_", "");

             while (output.split(" ").length < 50) {
                 output += " " + encounters_chain.generateRandom(1000).replaceAll("_", "");
             }

             output = output.toLowerCase();
	     */
		 
	     var output = returnRandom(encounters_raw);

             var current = document.getElementById("encounters").innerHTML;

             document.getElementById("encounters").innerHTML = output + "<br><br>" + current;
         }


         function clearEncounter() {
             document.getElementById("encounters").innerHTML = "";
         }
