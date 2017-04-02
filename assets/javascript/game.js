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

// main funtion for start game
function startGame (){

	// random number base on arr.length
	randomNumber = Math.floor(Math.random() * arr.randomWord.length);

	// randomword by using random number to pick up word
	chosenWord = arr.randomWord[randomNumber];

	// determine character to put blanks on
	numLetters = chosenWord.length;

	// random hint by using random number to pick up hin HAS TO MATCH WITH WORD
	chosenHint = arr.randomHint[randomNumber];

	// guesscount number determin by lenght of the word 
	guessCounter = numLetters + 1;

	// clear array for .push
	userGuess = [];
	blankWord = [];

	// push blanks as the amount of word
	for (i=0; i<numLetters; i++) {
	blankWord.push("_")
	}

	// display to the screen
	document.getElementById("hint-placeholder").innerHTML = chosenHint;
	document.querySelector("#guess-counter").innerHTML = guessCounter;
	document.querySelector("#guess-placeholder").innerHTML = blankWord.join(" ");
	document.querySelector("#user-guess").innerHTML = userGuess;
	document.querySelector("#win-counter").innerHTML = winCounter;
	document.querySelector("#lose-counter").innerHTML = loseCounter;
};
// call function
startGame();



// test if the codes are correct and run properly
console.log("Random number is " + randomNumber);
console.log("Chosen word is " + chosenWord);
console.log("Chosen hint is " + chosenHint);
console.log("Total letter of chosen word is " + numLetters);
console.log(blankWord);



// Create function to check if it matches with any character of the word.
function userType(letter) {


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
		document.querySelector("#guess-counter").innerHTML = guessCounter;
		console.log(userGuess);
	}
};

// function to run each time when user time to make changes of the scores
function scoreCheck () {

	
	var chosenWordCheck = chosenWord.toString()
	var correctLetter = blankWord.join("");

	if(chosenWordCheck === correctLetter) {

		winCounter++;
		document.querySelector("#win-counter").innerHTML = winCounter;
		startGame();;
	

		
	}
	else if (guessCounter == 0) {
		loseCounter++;
		document.querySelector("#lose-counter").innerHTML = loseCounter;
		startGame();

	}
};

// function when user type
document.onkeyup = function () {

	var input = String.fromCharCode(event.keyCode).toLowerCase();
	userType(input);
	scoreCheck();
};


