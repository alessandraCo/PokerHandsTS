"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ranking = void 0;
const Card_1 = require("./Card");
const Deck_1 = __importDefault(require("./Deck"));
var Ranking;
(function (Ranking) {
    Ranking[Ranking["highCard"] = 0] = "highCard";
    Ranking[Ranking["pair"] = 1] = "pair";
    Ranking[Ranking["twoPairs"] = 2] = "twoPairs";
    Ranking[Ranking["threeOfAKind"] = 3] = "threeOfAKind";
    Ranking[Ranking["straight"] = 4] = "straight";
    Ranking[Ranking["flush"] = 5] = "flush";
    Ranking[Ranking["fullHouse"] = 6] = "fullHouse";
    Ranking[Ranking["fourOfAKind"] = 7] = "fourOfAKind";
    Ranking[Ranking["straightFlush"] = 8] = "straightFlush";
})(Ranking = exports.Ranking || (exports.Ranking = {}));
class Hand {
    //first constructor: inizialize player
    constructor(player) {
        //5 cards hand
        this.cards = this.generateRandomHand(); //genereting a random hand ;
        //hand map (key: card value; value: number of cards with the same value)
        this.cardsMap = this.generateCardsMap();
        //hand ranking (high card, pair, two pairs, three of a kind, straight, flush, full house, four of a kind, straight flush)
        this.ranking = this.checkRanking();
        //highest value
        this.handValue = this.checkHandValue();
        this.player = player;
    }
    //second constructor: replacing a hand with a specific set of five cards (used in testing)
    static newSpecificHand(player, card1, card2, card3, card4, card5) {
        let hand = new Hand(player);
        hand.player = player;
        hand.cards = hand.generateHand(card1, card2, card3, card4, card5);
        hand.cardsMap = hand.generateCardsMap();
        hand.ranking = hand.checkRanking();
        hand.handValue = hand.checkHandValue();
        return hand;
    }
    //generating hand
    generateHand(card1, card2, card3, card4, card5) {
        return [card1, card2, card3, card4, card5];
    }
    //generating random hand taking 5 cards from a shuffled deck
    generateRandomHand() {
        const deck = new Deck_1.default();
        let randomHand = deck.cards.slice(0, 5);
        return this.generateHand(randomHand[0], randomHand[1], randomHand[2], randomHand[3], randomHand[4]);
    }
    //generating card map
    generateCardsMap() {
        let map = new Map();
        this.cards.forEach((card) => {
            const cardValue = card.getValue();
            //if the card value is already in map keys
            if (map.has(cardValue)) {
                let count = map.get(cardValue);
                if (count != undefined) {
                    map.set(cardValue, count + 1);
                }
            }
            //if the card value isn't in the map keys
            else {
                map.set(cardValue, 1);
            }
        });
        //returning a sorted by value map in crescent order
        const sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
        return sortedMap;
    }
    //returning card map
    getMap() {
        return this.cardsMap;
    }
    //returning player name
    getPlayer() {
        return this.player;
    }
    //returning num of cards in a hand
    getHandCardsNumber() {
        return this.cards.length;
    }
    //returning true if the 5 cards are all same suits (false otherwise)
    checkAllSameSuit() {
        const firstCardSuit = this.cards[0].getSuit();
        for (let i = 1; i < 5; i++) {
            if (this.cards[i].getSuit() !== firstCardSuit) {
                return false;
            }
        }
        return true;
    }
    //returns the maximum value in the five cards hand
    findMaxValue() {
        //saving the first card value as the temporary max value
        let maxValue = this.cards[0].getValue();
        for (let i = 1; i < 5; i++) {
            if (this.cards[i].getValue() > maxValue) {
                maxValue = this.cards[i].getValue();
            }
        }
        return maxValue;
    }
    //returns true if the five cards values are a straight, false otherwise
    checkStraight() {
        //sorting cards by their value from lowest to highest
        const sortedCards = this.cards.sort(function (a, b) {
            return a.getValue() - b.getValue();
        });
        // console.log("sorted cards: ");
        // sortedCards.forEach(card => card.printCard());
        //currentCardValue is equal to the lowest value
        let currentCardValue = sortedCards[0].getValue();
        //console.log("current sorted card value: " + currentCardValue);
        //if the next value is not equal to the consecutive of the previous one, the for stops and returns false
        for (let i = 1; i < this.cards.length; i++) {
            //console.log("current sorted card value: " + sortedCards[i].getValue());
            if (sortedCards[i].getValue() !== currentCardValue + 1) {
                //console.log("different from: " + (currentCardValue + 1));
                return false;
            }
            else {
                currentCardValue++;
            }
        }
        return true;
    }
    //gets hand ranking
    checkRanking() {
        const sameSuit = this.checkAllSameSuit();
        const isAStraight = this.checkStraight();
        //if Cards are same suit
        if (sameSuit && isAStraight) {
            return Ranking.straightFlush; //Straight Flush (same suit and straight)
        }
        else if (sameSuit) {
            return Ranking.flush; //Flush (same suit)
        }
        else if (isAStraight) {
            return Ranking.straight; //Straight
        }
        //if cards are not same suit
        else {
            let tempRanking = undefined;
            for (const numOfSameValues of this.cardsMap.values()) {
                //console.log("temp ranking: " + tempRanking);
                //console.log("inizio numofsamevalues: " + numOfSameValues);
                //four cards with same value
                if (numOfSameValues === 4) {
                    return Ranking.fourOfAKind; //Four of a Kind (4 cards with the same value)
                }
                else if (numOfSameValues === 3) {
                    //three cards with the same value
                    tempRanking = Ranking.threeOfAKind;
                }
                else if (numOfSameValues === 2) {
                    //two cards with the same value
                    if (tempRanking === Ranking.threeOfAKind) {
                        //3 cards with the same value and a pair
                        return Ranking.fullHouse; //Full House (3 cards with the same value and a pair)
                    }
                    else if (tempRanking === Ranking.pair) {
                        //second pair found
                        return Ranking.twoPairs; //Two pairs
                    }
                    else {
                        //numOfSameValues = 2 at first iteration: it can be a pair or a two pairs
                        tempRanking = Ranking.pair;
                    }
                }
                else {
                    //numOfSameValue === 1
                    if (tempRanking === Ranking.pair) {
                        return Ranking.pair; //Pair
                    }
                    else if (tempRanking === Ranking.threeOfAKind) {
                        return Ranking.threeOfAKind; //Three of a Kind
                    }
                    else {
                        //numOfSameValues = 1 at first iteration: no cards with same value
                        return Ranking.highCard; //High Card
                    }
                }
            }
            return Ranking.highCard;
        }
    }
    //returns ranking
    getRanking() {
        return this.ranking;
    }
    //gets hand value
    checkHandValue() {
        const ranking = this.getRanking();
        if (ranking === Ranking.flush ||
            ranking === Ranking.straight ||
            ranking === Ranking.straightFlush ||
            ranking === Ranking.highCard) {
            return this.findMaxValue();
        }
        let tempMaxValue = 0;
        this.cardsMap.forEach(function (value, key) {
            //console.log("value: " + value + " key: " + key);
            if (value === 4 || value === 3) {
                //console.log("the hand value is: " + key);
                tempMaxValue = key;
            }
            else if (value === 2) {
                if (ranking === Ranking.pair) {
                    //console.log("the hand value is: " + key);
                    tempMaxValue = key;
                }
                else if (ranking === Ranking.twoPairs && tempMaxValue === undefined) {
                    tempMaxValue = key;
                }
                else {
                    if (tempMaxValue !== undefined && tempMaxValue > key) {
                        //console.log("the hand value is: " + tempMaxValue);
                    }
                    else {
                        //console.log("the hand value is: " + key);
                        tempMaxValue = key;
                    }
                }
            }
        });
        //console.log("Final! The hand value is: " + tempMaxValue);
        return tempMaxValue;
    }
    //prints ranking symbol
    printRankingString() {
        let rankingString;
        switch (this.getRanking()) {
            case Ranking.highCard:
                rankingString = "High Card";
                break;
            case Ranking.pair:
                rankingString = "Pair";
                break;
            case Ranking.twoPairs:
                rankingString = "Two Pairs";
                break;
            case Ranking.threeOfAKind:
                rankingString = "Three of a Kind";
                break;
            case Ranking.straight:
                rankingString = "Straight";
                break;
            case Ranking.flush:
                rankingString = "Flush";
                break;
            case Ranking.fullHouse:
                rankingString = "Full house";
                break;
            case Ranking.fourOfAKind:
                rankingString = "Four of a Kind";
                break;
            case Ranking.straightFlush:
                rankingString = "Straight Flush";
                break;
        }
        console.log("Hand ranking: " + rankingString);
    }
    //returns highest value
    getHandValue() {
        return this.handValue;
    }
    //setting hands value
    setHandValue(newValue) {
        this.handValue = newValue;
    }
    //prints highest value symbol
    printHandValueSymbol() {
        let valueSymbol;
        const effectiveValue = this.getHandValue();
        switch (effectiveValue) {
            case Card_1.Values.T:
                valueSymbol = "T";
                break;
            case Card_1.Values.J:
                valueSymbol = "J";
                break;
            case Card_1.Values.Q:
                valueSymbol = "Q";
                break;
            case Card_1.Values.K:
                valueSymbol = "K";
                break;
            case Card_1.Values.A:
                valueSymbol = "A";
                break;
        }
        if (effectiveValue === Card_1.Values.T ||
            effectiveValue === Card_1.Values.J ||
            effectiveValue === Card_1.Values.Q ||
            effectiveValue === Card_1.Values.K ||
            effectiveValue === Card_1.Values.A) {
            console.log("with value: " + valueSymbol);
        }
        else {
            console.log("with value: " + effectiveValue);
        }
    }
    //printing hand
    printHand() {
        this.cards.forEach((card) => {
            card.printCard();
        });
    }
}
exports.default = Hand;
