"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    //method to compare two hands with the same ranking and the same max value
    sameMaxValue(hand1, hand2) {
        //sorting cardMap by its key from highest to lowest
        const map1 = hand1.getMap();
        const keys1 = [...map1.keys()];
        const sortedKey1 = keys1.sort((a, b) => b - a);
        const map2 = hand2.getMap();
        const keys2 = [...map2.keys()];
        const sortedKey2 = keys2.sort((a, b) => b - a);
        //getting hands same value
        let sameValue = hand1.getHandValue();
        for (let i = 0; i < sortedKey1.length; i++) {
            if (sortedKey1[i] !== sameValue && sortedKey2[i] !== sameValue && sortedKey1[i] > sortedKey2[i]) {
                hand1.setHandValue(sortedKey1[i]);
                return hand1;
            }
            else if (sortedKey1[i] !== sameValue && sortedKey2[i] !== sameValue && sortedKey1[i] < sortedKey2[i]) {
                hand2.setHandValue(sortedKey2[i]);
                return hand2;
            }
        }
        return undefined;
    }
    winnerHand(hand1, hand2) {
        //printing hands:
        console.log("------------");
        console.log(hand1.getPlayer() + ": ");
        hand1.printHand();
        console.log();
        console.log("------------");
        console.log(hand2.getPlayer() + ": ");
        hand2.printHand();
        console.log();
        console.log("------------");
        //initializing winner
        let winnerHand;
        if (hand1.getRanking() > hand2.getRanking()) {
            //first player wins
            winnerHand = hand1;
        }
        else if (hand1.getRanking() === hand2.getRanking()) {
            //same ranking: compare high values
            if (hand1.getHandValue() > hand2.getHandValue()) {
                //first player wins with high value
                winnerHand = hand1;
            }
            else if (hand1.getHandValue() === hand2.getHandValue()) {
                //same max value
                winnerHand = this.sameMaxValue(hand1, hand2);
            }
            else {
                //second player wins with high value
                winnerHand = hand2;
            }
        }
        else {
            //second player wins
            winnerHand = hand2;
        }
        if (winnerHand !== undefined) {
            console.log("*******************");
            console.log(winnerHand.getPlayer() + " wins!");
            console.log("*******************");
            winnerHand.printRankingString();
            winnerHand.printHandValueSymbol();
            return winnerHand;
        }
        else {
            console.log("It's a Tie!");
            return undefined;
        }
    }
}
exports.default = Game;
