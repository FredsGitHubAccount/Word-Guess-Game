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

    var audio = new Audio('Assets/music/mario.mp3');

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

//    4. Verify if keystroke is part of the alphabet.  Checks to see if letter is part of the word.  If so, replace underscore with letter.  If not, adds to wrong guesses and subtracts a guess.

function letterChecker(guess) {
    audio.play()
  
    if (event.keyCode >= 65 && event.keyCode <= 90) {

        let letterInWord = false;


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
            for(let i = 0; i <wrongLetters.length; i++) {
            if (guess == wrongLetters[i]) {
                alert("Try not to pick the same letter twice! If I was mean game developer, I'd subtract a guess!")
                return;
            }
        }
        
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

//    5. If user guesses all letters, a win is added, & randomly select another word. If 5 wins or 5 losses occurs, prompt the user to play again.  
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
    document.getElementById("directions-text").innerHTML = `Press Any Key To Get Started! Try To Guess 5 Words Before 5 Losses!`;

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

