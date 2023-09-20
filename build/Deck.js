"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./Card");
const Card_2 = __importDefault(require("./Card"));
class Deck {
    //generating a shuffled deck
    constructor() {
        //creating a new deck of 52 cards
        this.cards = this.createNewDeck();
        //shuffle the deck
        this.shuffle();
    }
    getNumOfCards() {
        return this.cards.length;
    }
    //creates a new deck of 52 cards using the cartesian product between Suits and Values
    createNewDeck() {
        //flatMap: concates the 4 arrays (each one for a different Suit) of 13 cards in a single array of 52 cards
        return Object.keys(Card_1.Suits).flatMap((suit) => {
            return Object.values(Card_1.Values)
                //that's because Values is a numeric Enum, so I need to take only the numeric values
                .filter((v) => isNaN(Number(v)))
                .map((value) => {
                //from strings to Enum
                const suitString = suit;
                const valueString = value;
                let suitEnum = Card_1.Suits[suitString];
                let valueEnum = Card_1.Values[valueString];
                return new Card_2.default(suitEnum, valueEnum);
            });
        });
    }
    //generates a random index and swaps the two cards
    shuffle() {
        const numOfCards = this.getNumOfCards();
        for (let i = numOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}
exports.default = Deck;
