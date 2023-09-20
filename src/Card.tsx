export enum Suits {
  CLUBS = "Clubs",
  DIAMONDS = "Diamonds",
  SPADES = "Spades",
  HEARTS = "Hearts",
}

export enum Values {
  two = 2,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  T,
  J,
  Q,
  K,
  A,
}

class Card {
  private suit: Suits;
  private value: Values;

  //multiple constructor with factory method
  public constructor(suit: Suits, value: Values) {
    this.suit = suit;
    this.value = value;
  }

  public getSuit() {
    return this.suit;
  }

  public getValue() {
    return this.value;
  }

  public printCard() {
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
    if (
      this.value === Values.T ||
      this.value === Values.J ||
      this.value === Values.Q ||
      this.value === Values.K ||
      this.value === Values.A
    ) {
      process.stdout.write(valueSymbol + suitSymbol + " ");
    } else {
      process.stdout.write(this.value + suitSymbol + " ");
    }
  }
}

export default Card;
