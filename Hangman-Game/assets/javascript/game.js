alert("Good Luck, You'll Need It!!");
    

var wordBank = ["garnet", "amethyst", "aquamarine", "diamond", "emerald", "pearl", "ruby", "peridot", "sapphire", "tourmaline", "topaz", "turquoise"];
var selectedWord = "";
var blankSpots = 0;
var letterAmount = [];
var spotsRight = []; 
var wrongLetters = [];


// Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 15;



// function new game

function beginGame () {
    selectedWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    
    letterAmount = selectedWord.split('')
    blankSpots = letterAmount.length;

    
    guessesLeft = 15;
    wrongLetters = [];
    spotsRight = [];

    
    for (var i=0; i<blankSpots; i++) {
        spotsRight.push("_");
    }

    // keep track of scoreboard
    document.getElementById("wordToGuess").innerHTML = spotsRight.join(" ");
    document.getElementById('numGuesses').innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;
   
}

function checkLetters(letter) {
    // Check if letter exists in word at all
    var itsThere = false;
    for (var i=0; i<blankSpots; i++) {
        if(selectedWord[i] == letter) {
            itsThere = true;
        }
    }

    // Check where in word letter exists, then populate out blanks and sucesses
    if (itsThere) {
        for (var i=0; i<blankSpots; i++) {
            if(selectedWord[i] == letter) {
                spotsRight[i] = letter;
            }
        }   
    }

    // Letter wasnt found
    else {
        wrongLetters.push(letter);
        guessesLeft --
    }
    // Test and Debugging 
    console.log(spotsRight);
}

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);

    // Update the HTML to reflect the most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = spotsRight.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    // Check is user won
    if (letterAmount.toString() == spotsRight.toString()) {
        //time
        setTimeout(function(){ 
            winCount++;
            alert("You Actually Won");
        // Update the win counter 
        document.getElementById("winCounter").innerHTML = winCount;

        beginGame();

        }, 5);
    }

    // Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("Didn't Think You Had What It Takes!");

        // Update HTML 
        document.getElementById("lossCounter").innerHTML = lossCount;

        beginGame();
    }
}

//______

// begin
beginGame();



document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();


}


    
    