function guessingGame() {
    // Guess this number
    const rndNum = Math.floor(Math.random() * 100);
    let hasWon = false;
    let tries = 0;

    // return the "Game" function
    return function(guess) {
        tries++;
        if(hasWon) return "The game is over, you already won!";

        if(guess > rndNum){
            return `${guess} is too high!`;
        } else if(guess < rndNum){
            return `${guess} is too low!`;
        } else{
            hasWon = true;
            return `You win! You found ${rndNum} in ${tries} guesses`;
        }
    }
}

module.exports = { guessingGame };
