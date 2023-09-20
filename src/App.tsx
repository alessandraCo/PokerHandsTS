import promptSync from 'prompt-sync';
import Hand from "./Hand";
import Game from "./Game";

function App() {
  console.log("Welcome! Starting a new game");
  const prompt = promptSync();
  let player1 = prompt("Insert first player name: ");
  let player2 = prompt("Insert second player name: ");
  console.log("Press P to Play and Q to Quit");
  let choice = prompt("your choice: ");
  while (choice !== "Q") {
    if (choice !== "P") {
      console.log("Invalid input, please press P to Play and Q to Quit");
      choice = prompt("your choice: ");
    } else {
      const game: Game = new Game();
      game.winnerHand(
        new Hand(player1 || "defaul player1"),
        new Hand(player2 || "defaul player2")
      );
      console.log("Press P to Play and Q to Quit");
      choice = prompt("your choice: ");
    }
  }
}
export default App;
