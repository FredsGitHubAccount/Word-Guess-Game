// // 1. Have a list of words that can be guessed & variables

// list of characters
let nintendoChars = ["mario", "luigi", "peach", "bowser", "toad", "blooper", "goomba", "yoshi", "boo", "waluigi", "wario", "toadsworth", "rosalina", "daisy", "koopalings", "birdo", "kamek", "toadette", "piranha", "koopa", "wiggler", "pokey", "morton"]

// Computer randomly picks a word from the list
let computerGuess = "";

// Breaks down computerGuess into individual letters inside an array
let computerGuessLetters = [];

// Total underscores that holds the current amount of blanks
let totalBlanks = 0;

// Store user guesses inside an array
let userGuess = [];

// Store the blanks & letters generated from random word chosen
let displayBlanks = [];

// Store wrong letters that don't match the letters of the word
let wrongLetters = [];


// Scoring
let wins = 0;
let losses = 0;
let guessesRemain = 10;


//    2. The computer randomly picks a word from the list and breaks down the letters into an array
function newGame() {

    

    computerGuess = nintendoChars[Math.floor(Math.random() * nintendoChars.length)]; 
    console.log(computerGuess);

    computerGuessLetters = computerGuess.split(""); // computerGuess split into individual letters inside an array
    console.log(computerGuessLetters)

    totalBlanks = computerGuess.length; // Total amount of underscores that will be pushed into displayBlanks
    console.log(totalBlanks);

    //    3. Generate underscores based on the length of the word
    displayBlanks = [];
    wrongLetters = [];
    guessesRemain = 10;

    for (let i = 0; i < totalBlanks; i++) {
        (displayBlanks.push("_"));

    }
    document.getElementById("generate-underscore").innerHTML = displayBlanks.join(" ");
    document.getElementById("guesses-remaining").innerHTML = `Remaining Guesses : ${guessesRemain}`;

}

//    4. Replace underscores with letter if the correct letter is guessed & incorrect letters subract from guesses remaining and are shown in incorrect guesses.

function letterChecker(guess) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {

        var letterInWord = false;


    for (let i = 0; i < totalBlanks; i++) {
        if (computerGuess[i] === guess) {
            letterInWord = true;

        }
    }

 
    if (letterInWord) {

        for (let i = 0; i < totalBlanks; i++) {

            if (computerGuess[i] === guess) {
                displayBlanks[i] = guess;
            }
            document.getElementById("generate-underscore").innerHTML = displayBlanks.join(" ");
        }
    }
    else {
        wrongLetters.push(guess);
        guessesRemain--;

    }
    document.getElementById("wrong-guess-text").innerHTML = `Wrong Guesses : ${wrongLetters.join(" , ")}`;
    document.getElementById("guesses-remaining").innerHTML = `Remaining Guesses : ${guessesRemain}`;
    document.getElementById("directions-text").innerHTML = 'Good Luck!';
} else { 

    alert('You must type a valid character!')
}
};

//    5. If user guesses all letters, a win is added, & randomly select another word
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

function freshStart() {

    wins = 0;
    losses = 0;
    remainingGuesses = 10;
    document.getElementById("wins-text").innerHTML = `Wins : ${wins}`;
    document.getElementById("losses-text").innerHTML = `Losses : ${losses}`;
    document.getElementById("guesses-remaining").innerHTML = `Remaining Guesses : ${guessesRemain}`;
    document.getElementById("wrong-guess-text").innerHTML = `Wrong Guesses : ${wrongLetters.join(" , ")}`;

}

// Calling Functions
newGame();
document.onkeyup = function (event) {

    userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    console.log(userGuess);
    letterChecker(userGuess);
    roundComplete();

}
freshStart();

// Trial
// function letterChecker(guess) {
// for (let i = 0 ; i < totalBlanks ; i++) {
//     if (computerGuess[i] === guess) {
//         displayBlanks[i] = guess;
//         console.log(displayBlanks);
//         document.getElementById("generate-underscore").innerHTML = displayBlanks.join(" ");
//     }    
//       else {
//         wrongLetters.push(guess);
//         guessesRemain--;  
//     }

// }
// document.getElementById("wrong-guess-text").innerHTML = `Wrong Guesses : ${wrongLetters.join(" , ")}`;
// document.getElementById("guesses-remaining").innerHTML = `Remaining Guesses : ${guessesRemain}`;
// document.getElementById("directions-text").innerHTML = 'Good Luck!';
// }

