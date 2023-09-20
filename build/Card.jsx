"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Values = exports.Suits = void 0;
var Suits;
(function (Suits) {
    Suits["CLUBS"] = "Clubs";
    Suits["DIAMONDS"] = "Diamonds";
    Suits["SPADES"] = "Spades";
    Suits["HEARTS"] = "Hearts";
})(Suits = exports.Suits || (exports.Suits = {}));
var Values;
(function (Values) {
    Values[Values["two"] = 2] = "two";
    Values[Values["three"] = 3] = "three";
    Values[Values["four"] = 4] = "four";
    Values[Values["five"] = 5] = "five";
    Values[Values["six"] = 6] = "six";
    Values[Values["seven"] = 7] = "seven";
    Values[Values["eight"] = 8] = "eight";
    Values[Values["nine"] = 9] = "nine";
    Values[Values["T"] = 10] = "T";
    Values[Values["J"] = 11] = "J";
    Values[Values["Q"] = 12] = "Q";
    Values[Values["K"] = 13] = "K";
    Values[Values["A"] = 14] = "A";
})(Values = exports.Values || (exports.Values = {}));
class Card {
    //multiple constructor with factory method
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    getSuit() {
        return this.suit;
    }
    getValue() {
        return this.value;
    }
    printCard() {
        let suitSymbol;
        switch (this.suit) {
            case Suits.CLUBS:
                suitSymbol = "♣";
                break;
            case Suits.DIAMONDS:
                suitSymbol = "♢";
                break;
            case Suits.SPADES:
                suitSymbol = "♠";
                break;
            case Suits.HEARTS:
                suitSymbol = "♡";
                break;
        }
        let valueSymbol;
        switch (this.value) {
            case Values.T:
                valueSymbol = "T";
                break;
            case Values.J:
                valueSymbol = "J";
                break;
            case Values.Q:
                valueSymbol = "Q";
                break;
            case Values.K:
                valueSymbol = "K";
                break;
            case Values.A:
                valueSymbol = "A";
                break;
        }
        if (this.value === Values.T ||
            this.value === Values.J ||
            this.value === Values.Q ||
            this.value === Values.K ||
            this.value === Values.A) {
            process.stdout.write(valueSymbol + suitSymbol + " ");
        }
        else {
            process.stdout.write(this.value + suitSymbol + " ");
        }
    }
}
exports.default = Card;
