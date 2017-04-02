// welcome pop-up
var gotName = false

while(gotName == false) {

	// ask name
	var name = prompt("Hey! What's your name?");

		// user has to type somthing in the box otherwise the pop-up will ask again
		if(name == "") {
			gotName = false;
		}

		// user must not click cancel otherwise the pop-up will ask again
		else if (name !== "null") {

			// if user type something it will ask for confirm
			// if user clicks cancel it will ask again other it will show welcome message
			if (confirm("Are you sure your name is " + name + " ?")) {
			document.getElementById("welcome-message").innerHTML = ("<h1><small>Welcome </small>" + name + "!<small> to Kotchaparn's Hangman-Game</small></h1>");
			gotName = true;
			
			}
		}
};

// create random words object array
var arr = {
	randomWord: ["california", "germany", "houston", "popeye", "computer", "bugatti"],
	randomHint: ["Name of a state", "Name of a country in Europe", "Name of the biggest city in Texas", "Name of a restuarant", "Electronic device you are typing now", "A brandname of a car"]
}


// create variable to generate random number
var randomNumber = "";

// create variable of random word
var chosenWord = "";

// create the variable to count the length of random word
var numLetters = 0;

// create blank variable to put blanks
var blankWord = [];

// create variable of random hint
var chosenHint = "";

// create empty array for user incorrect guess 
var userGuess = [];

// create score variables
var guessCounter = 0;
var winCounter = 0;
var loseCounter = 0;

function startGame (){

	randomNumber = Math.floor(Math.random() * arr.randomWord.length);
	chosenWord = arr.randomWord[randomNumber];
	numLetters = chosenWord.length;
	chosenHint = arr.randomHint[randomNumber];	
	guessCounter = numLetters + 1;
	userGuess = [];
	blankWord = [];

	for (i=0; i<numLetters; i++) {
	blankWord.push("_")
	
	}

	document.getElementById("hint-placeholder").innerHTML = chosenHint;
	document.querySelector("#guess-counter").innerHTML = guessCounter;
	document.querySelector("#guess-placeholder").innerHTML = blankWord.join(" ");
	document.querySelector("#user-guess").innerHTML = userGuess;
	document.querySelector("#win-counter").innerHTML = winCounter;
	document.querySelector("#lose-counter").innerHTML = loseCounter;
};

startGame();



// test if the codes are correct and run properly
console.log("Random number is " + randomNumber);
console.log("Chosen word is " + chosenWord);
console.log("Chosen hint is " + chosenHint);
console.log("Total letter of chosen word is " + numLetters);
console.log(blankWord);



// Create function when user type
function userType(letter) {

	// var userInput = event.key;

	var checkLetter = false;
	
	for (var i=0; i<numLetters; i++) {
		if (chosenWord[i] === letter) {

		checkLetter = true;

		}
	}
		
	if (checkLetter) {

		for ( i=0; i<numLetters; i++) {

			if(chosenWord[i] === letter) {
				blankWord[i] = letter;
			
			}
		}
 	document.getElementById("guess-placeholder").innerHTML = blankWord.join(" ");
	console.log(blankWord);

	}

	else {

		userGuess.push(letter);
		guessCounter--;
		document.querySelector("#user-guess").innerHTML = userGuess.join(" ");
		console.log(userGuess);
	}
};


function scoreCheck () {

	document.querySelector("#guess-counter").innerHTML = guessCounter;

	var chosenWordCheck = chosenWord.toString()
	var correctLetter = blankWord.join("");

	if(chosenWordCheck === correctLetter) {

		winCounter++;
		document.querySelector("#win-counter").innerHTML = winCounter;
		startGame();

	}
	else if (guessCounter == 0) {
		loseCounter++;
		document.querySelector("#lose-counter").innerHTML = loseCounter;
		startGame();
	}
};


document.onkeyup = function () {

	var input = String.fromCharCode(event.keyCode).toLowerCase();

	userType(input);
	scoreCheck();
}

