let wordsArray = ["khaleesi", "white walker", "Winterfell", "King's Landing", "Westeros", "Jon Snow", "Daenerys Targaryen", "Tyrion Lannister", "Sansa Stark", "dragon", "Valar morghulis", "Arya Stark", "Cersei Lannister", "Winter is Coming"];

let underscores = [];
let wrongGuesses = [];
let guessesRemaining = 9;
let wins = 0;
let losses = 0;

let guessWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

window.onload = function () {
    $.backstretch('./assets/media/images/bckgrd.jpg');

    $("#newGame").click("on", function() {
        $("#landingDiv").fadeOut(900);
        setTimeout(function() { $("#gameDiv").show(); }, 900);
        $("#audiotag1").trigger("play");

        console.log(guessWord);

        for(let i=0; i < guessWord.length; i++) {
            if (guessWord[i] === ' ') {
                underscores.push(' ');
            } else {
                underscores.push(`_`);
            }
        
        };

        
        $("#wordBlanks").append(underscores);
        console.log(underscores);
});
}