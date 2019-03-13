//Global Variables
//======================================================================================================================

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const wordsArray = ["khaleesi", "white walkers", "Winterfell", "King's Landing", "Westeros", "Jon Snow", "Daenerys Targaryen", "Tyrion Lannister", "Sansa Stark", "dragon", "Valar morghulis", "Arya Stark", "Cersei Lannister", "Winter is Coming", "The North Remembers", "Red Wedding", "dire wolf", "Joffrey Baratheon", "Ramsay Bolton", "Jaime Lannister", "Dragonstone", "The Night King", "The Night's Watch", "wildling", "Brienne of Tarth", "Dothraki", "Khal Drogo", "Littlefinger", "The Iron Throne", "Margaery Tyrell"];

let guessWord = "";

let underscores = [];
let wordLetters = [];
let wrongGuesses = [];

let guessesRemaining = 10;
let wins = 0;
let losses = 0;


//Functions
//======================================================================================================================

function gameSet() {
    underscores = [];
    wordLetters = [];
    wrongGuesses = [];
    guessesRemaining = 10;

    $("#wrongGuesses").text(wrongGuesses.join(",  "));

    guessWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    $("#guessesRemaining").text(guessesRemaining);
    $("#wins").text(wins);
    $("#losses").text(losses);

    wordLetters = guessWord.split("");

    console.log(wordLetters);

    for (let i = 0; i < wordLetters.length; i++) {
        if (wordLetters[i] === ' ') {
            underscores.push(" ");
        } else if (wordLetters[i] === "'") {
            underscores.push("'");
        } else {
            underscores.push("_");
        }
    };

    console.log(underscores);

    for (let i = 0; i < underscores.length; i++) {
        if (underscores[i] === " ") {
            $("#wordBlanks").append(" ");
        } else if (underscores[i] === "'") {
            $("#wordBlanks").append("'");
        } else {
            $("#wordBlanks").append('_');
        }
    }
}

function showLetterGuesses() {
    for (let i = 0; i < wordLetters.length; i++) {
        $("#wordBlanks").append(underscores[i]);
    }

    if (wordLetters.indexOf(event.key) == -1 && wordLetters.indexOf((event.key).toString().toUpperCase()) == -1) {
        if (guessesRemaining > 0) {
            guessesRemaining--;
        }
    }

    $("#guessesRemaining").text(guessesRemaining);

}

function loseCheck() {
    if (guessesRemaining === 0) {
        swal({
            title: "You Lose!",
            text: "Answer: " + guessWord,
            buttons: [true, "New Game"]
        }).then(function (input) {
            if (input === false) {
                return;
            } else if (input === true) {
                $("#wordBlanks").empty();
                gameSet();
            }
        });

        losses++
        $("#losses").text(losses);
    }
}

function winCheck() {
    if (wordLetters.toString() === underscores.toString()) {
        swal({
            title: "You Win!",
            text: "Answer: " + guessWord,
            icon: "assets/media/images/death.gif",
            buttons: [true, "New Game"],
        }).then(function (input) {
            if (input === false) {
                return;
            } else if (input === true) {
                $("#wordBlanks").empty();
                gameSet();
            }
        });

        wins++
        $("#wins").text(wins);
    }
}

//Main Process
//======================================================================================================================

window.onload = function () {
    $.backstretch('./assets/media/images/bckgrd.jpg');

    $("#newGame").click("on", function () {
        $("#landingDiv").hide();
        $("#gameDiv").show();
        $("#audiotag1").trigger("play");
        gameSet();
    });

    $(document).keyup(function () {
        if (letters.indexOf(event.key) === -1 || wrongGuesses.indexOf(event.key) !== -1) {
            return;
        }

        $("#wordBlanks").empty();

        for (let i = 0; i < wordLetters.length; i++) {
            if (event.key === wordLetters[i].toLowerCase()) {
                underscores[i] = wordLetters[i];
            }
        }

        console.log(underscores);

        showLetterGuesses();
        
        if (wordLetters.indexOf(event.key) == -1  && wordLetters.indexOf((event.key).toString().toUpperCase()) == -1) {
            wrongGuesses.push(event.key);
        }

        $("#wrongGuesses").text(wrongGuesses.join(",  "));

        loseCheck();
        winCheck();
    });

}

//bug--it decreases guesses when the letter is capitalized