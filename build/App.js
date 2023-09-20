"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Hand_1 = __importDefault(require("./Hand"));
const Game_1 = __importDefault(require("./Game"));
function App() {
    console.log("Welcome! Starting a new game");
    const prompt = (0, prompt_sync_1.default)();
    let player1 = prompt("Insert first player name: ");
    let player2 = prompt("Insert second player name: ");
    console.log("Press P to Play and Q to Quit");
    let choice = prompt("your choice: ");
    while (choice !== "Q") {
        if (choice !== "P") {
            console.log("Invalid input, please press P to Play and Q to Quit");
            choice = prompt("your choice: ");
        }
        else {
            const game = new Game_1.default();
            game.winnerHand(new Hand_1.default(player1 || "defaul player1"), new Hand_1.default(player2 || "defaul player2"));
            console.log("Press P to Play and Q to Quit");
            choice = prompt("your choice: ");
        }
    }
}
exports.default = App;
