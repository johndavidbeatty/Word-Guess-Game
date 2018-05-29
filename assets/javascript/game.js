//   define variables as global because scopes ia a PITA
var winCount = 0;
var lossesCount = 0;
var badGuesses = 0;
var possible = ["cat", "dog", "bird", "horse", "rabbit", "fish", "snake", "dolphin"];
var letters = "abcdefghijklmnopqrstuvwxyz";
var newWord = true;
var letterGuessed = [];
var guessesLeft = 7;
var secretWord = "foo";
var shownWord = "-";
var userGuess = "z";
var manStage = 0;




messages.innerHTML = `
<div style="font-size:24px;">Press Any Letter to Start!</div>`

man.innerHTML = `                
<img src=./assets/images/Picture9.png class="img-fluid"></img>`


// get keyboard entry

document.onkeyup = function (event) {
    // Determines which key was pressed and pass it as lower case.
    userGuess = (event.key).toLowerCase();


    // make sure the entry is a-z, and not already guessed
    if ((letters.indexOf(userGuess) == -1) || (letterGuessed.indexOf(userGuess) >= 0)) {   
        return;       
    } 



    // Call Javascript functions
    if (newWord == true) {
    newGame()
        newWord = false;
    }
    else {
        winLose()
    }

    screenOut()

}

// XXXXXXXX   FUNCTION DEFINITIONS    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// String Replace Function

// Got this from stack overflow to replace a character in string- I understand how it works..so.. "yoink"
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// Function to determin Win/loss and also hit various counters

function winLose() {
    // matching section - first make sure we have guessed a letter in the secretWord 

    if (secretWord.search(userGuess) !== -1) {

        // I'm doing a for loop to search and replace - need loop for double letters
        //  - painful but feel like that is less cheezey than just providing words with single letters
        for (i = 0; i < (secretWord.length); i++) {
            if (userGuess == secretWord.charAt(i)) {
                shownWord = (shownWord.replaceAt(i, userGuess));
                letterGuessed.push(userGuess);
            }
        }
        // check if they won with this guess
        if (shownWord == secretWord) {
            console.log("its a win!");
            winCount++
            letterGuessed = ["you won this one - good job!         Press any letter for next round"];
            newWord = true;
            manStage = 8;

        }
    }
    else {
        console.log("swing and a miss");
        badGuesses++;
        letterGuessed.push(userGuess);



        // check if this has been five times
        if (badGuesses == 7) {
            lossesCount++
            newWord = true;
            shownWord = secretWord;
            letterGuessed = ["you lost this round!                    Press any letter for the next round"]
        }
        manStage = badGuesses;

    }

}



function newGame() {

    console.log("user Guess: " + userGuess);

    // determine if we need a new word or iterating on current word
    // using newWord bolean.

    if (newWord == true) {
        // Generate compute guess using random selection from letter array
        console.log("entered new word code");
        secretWord = possible[(Math.floor(Math.random() * (possible.length)))];
        // reset everything
        letterGuessed = [];
        badGuesses = 0;
        shownWord = "-";
        manStage = 0;

        // generate shownWord string of dashes

        for (i = 1; i < (secretWord.length); i++) {
            shownWord = shownWord.concat("-")
        }
    }


}

function screenOut() {

    guessesLeft = (7 - badGuesses);

    let man = document.getElementById('man');
    man.innerHTML = `                
        <img src=./assets/images/Picture${manStage}.png class="img-fluid"></img>`

    let word = document.getElementById('word');
    word.innerHTML = `
                    <div>${shownWord}</div>`

    let messages = document.getElementById('messages');
    messages.innerHTML = `
                    <div>${letterGuessed}</div>`



    let game = document.getElementById('game');

    game.innerHTML = `
                <div>wins: ${winCount}</div>
                <div>losses: ${lossesCount}</div>
                <div>Misses left: ${guessesLeft}</div>        
                `


}