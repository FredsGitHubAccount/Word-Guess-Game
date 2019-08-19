// Global Variables

// List of characters
let nintendoChars = ["mario", "luigi", "peach", "bowser", "toad", "blooper", "goomba", "yoshi", "boo", "waluigi", "wario", "toadsworth", "rosalina", "daisy", "koopalings", "birdo", "kamek", "toadette", "piranha", "koopa", "wiggler", "pokey", "morton"]

// Computer randomly picks a word from the list
let computerGuess = "";

// Breaks down computerGuess into individual letters inside an array
let computerGuessLetters = [];

// Total underscores that holds the current amount of blanks
let totalBlanks = 0;

// Store user guesses inside an array to check for duplicate guesses
let userGuessHolder = [];

// Store the blanks & letters generated from random word chosen
let displayBlanks = [];

// Store wrong letters that don't match the letters of the word
let wrongLetters = [];


// Scoring & Music
let wins = 0;
let losses = 0;
let guessesRemain = 10;
var audio = new Audio('Assets/music/mario.mp3');

// Function to start a new round
function newGame() {

    // Select a random word from the nintendoChars variable
    computerGuess = nintendoChars[Math.floor(Math.random() * nintendoChars.length)];
    console.log(computerGuess);

    // Split the random word inside an array
    computerGuessLetters = computerGuess.split("");
    console.log(computerGuessLetters)

    // Determine the total amount of blanks needed based on the length of the random word
    totalBlanks = computerGuess.length;


    // Clear variables 
    displayBlanks = [];
    wrongLetters = [];
    guessesRemain = 10;
    userGuessHolder = []

    // Push the amount of underscores into the document and into the displayBlanks variable
    for (let i = 0; i < totalBlanks; i++) {
        (displayBlanks.push("_"));

    }
    // Dom manipulation 
    document.getElementById("generate-underscore").innerHTML = displayBlanks.join(" ");
    document.getElementById("guesses-remaining").innerHTML = `Remaining Guesses : ${guessesRemain}`;

}

//    Function to verify the key that was pressed
function letterChecker(guess) {
    audio.play()

    // Checks to see if the key pressed was part of the alphabet
    if (event.keyCode >= 65 && event.keyCode <= 90) {

        // By default, the letterInWord is false and will toggle true if the letter matches
        let letterInWord = false;

        // Run a for loop to see if the user guess matches the index of the computerguess
        for (let i = 0; i < totalBlanks; i++) {
            if (computerGuess[i] === guess) {
                letterInWord = true;

            }
        }

        // If the letter matches an index of the word, run through this statement
        if (letterInWord) {

            // Checks to see if the user already picked that letter in the userGuessHolder array
            if (userGuessHolder.includes(guess)) {
                document.getElementById("alerts").innerHTML = "You've Already Picked That Letter!"

            }
            // Runs a for loop to turn the underscore into the corresponding letter and pushes the guess into the userGuessHolder array
            for (let i = 0; i < totalBlanks; i++) {

                if (computerGuess[i] === guess) {
                    displayBlanks[i] = guess;
                    userGuessHolder.push(guess)
                    document.getElementById("generate-underscore").innerHTML = displayBlanks.join(" ");
                }

            }

        }


        // If the guess is wrong run the following statements
        else {
            // Checks to see if the guess was already given
            if (wrongLetters.includes(guess)) {
                document.getElementById("alerts").innerHTML = "Don't Pick The Same Letter Twice! If I Was A Mean Game Developer, I'd Subtract A Guess!"

            }
            // If it was a new wrong guess, then subtract a guess and push the letter into the wrongLetters array
            else {
                wrongLetters.push(guess);
                guessesRemain--;
            }

        }
        // Dom manipulation
        document.getElementById("wrong-guess-text").innerHTML = `Wrong Guesses : ${wrongLetters.join(" , ")}`;
        document.getElementById("guesses-remaining").innerHTML = `Remaining Guesses : ${guessesRemain}`;
        document.getElementById("directions-text").innerHTML = 'Good Luck!';
        
        // Alerts to hit a valid key
    } else {

        document.getElementById("alerts").innerHTML = "Make Sure To Hit A Valid Key!"
    }

};

//   Function to check if the user has guessed the entire word & to check if the user has reached 5 wins or 5 losses  
function roundComplete() {

    if (computerGuessLetters == displayBlanks.toString()) {
        wins++;
        alert(`You Win! The Word Was ${computerGuess}!`);
        document.getElementById(`wins-text`).innerHTML = `Wins : ${wins}`;
        document.getElementById(`wrong-guess-text`).innerHTML = `Wrong Guesses :`;
        newGame()


    }

    else if (guessesRemain === 0) {

        losses++;
        alert(`You Lose! The Word Was ${computerGuess}!`);
        document.getElementById("losses-text").innerHTML = `Losses : ${losses}`;
        document.getElementById("wrong-guess-text").innerHTML = `Wrong Guesses : `;
        newGame()


    } if (wins == 5) {

        freshStart();
        alert(`You Are A Hangman Master! Hit Enter To Play Again!`)

    }

    else if (losses == 5) {

        freshStart();
        alert(`Better Luck Next Time!`)

    }

}

// Function to run the game from scratch with default menu
function freshStart() {

    wins = 0;
    losses = 0;
    remainingGuesses = 10;
    userGuessHolder = []
    document.getElementById("wins-text").innerHTML = `Wins : ${wins}`;
    document.getElementById("losses-text").innerHTML = `Losses : ${losses}`;
    document.getElementById("guesses-remaining").innerHTML = `Remaining Guesses : ${guessesRemain}`;
    document.getElementById("wrong-guess-text").innerHTML = `Wrong Guesses : ${wrongLetters.join(" , ")}`;
    document.getElementById("directions-text").innerHTML = `Press Any Key To Get Started! Try To Guess 5 Words Before 5 Losses!`;

}

// Called Functions
newGame();
document.onkeyup = function (event) {
    document.getElementById("alerts").innerHTML = ""
    userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(userGuess);
    letterChecker(userGuess);
    roundComplete();
}
freshStart();

