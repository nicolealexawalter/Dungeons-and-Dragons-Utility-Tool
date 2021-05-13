<html>
<head>
<link rel="shortcut icon" type="image/png" href="favicon.png">
<style>
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
  <input type="number" id="numchar" name="numchar" value="" min=1 max=99><br>
  <label for="level">Average Level:</label>
  <input type="number" id="level" name="level" value="" min=1 max=20><br>
  <label for="difficulty">Difficulty:</label>
  <select name="difficulty" id="difficulty"><br>
  <option value="Easy">Easy</option>
  <option value="Medium">Medium</option>
  <option value="Hard">Hard</option>
  <option value="Deadly">Deadly</option>
  </select>
</form>
<button onclick="calculateXP()">Calculate</button>
<p style="display:inline-block" id="xpbudget"></p>
<script>
function creatureSearch(){
	var strings = "";
	var fr = new FileReader(strings, "FILES\CREATURES\AQUATIC.TXT");
	document.getElementById("xpbudget").innerHTML = fr.readAsText();
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
}
</script>
<header>
<h1>Creature Searcher</h1>
</header>
<form>
	<label for="crname">Creature Name:</label>
	<input type="text" id="crname" name="crname" value=""><br>
</form>
<button onclick="creatureSearch()">Search</button><br><br>
<p id="creatures"></p>
<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>
</body>
</html>