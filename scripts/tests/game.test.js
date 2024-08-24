/**
 * @jest-environment jsdom
 */

const exp = require('constants');
const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require('../game.js');
const { afterEach } = require('node:test');

beforeAll(() =>{
    let fs = require('fs');
    let fileContent = fs.readFileSync('index.html', 'utf8');

    document.open();
    document.write(fileContent);
    document.close();
});

describe("Game object contains correct keys", ()=>{
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("choices contains the correct ids", ()=>{
        expect(game.choices).toEqual(["button1","button2","button3","button4"]);
    });
});

describe("newGame function works correctly", () => {    
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = [1,2,3,4];
        game.currentGame = [1,2,3,4];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to 0", ()=>{
        expect(game.score).toBe(0);
    });
    test("should set playerMoves to empty array", ()=>{
        expect(game.playerMoves.length).toBe(0);
    });
    test("there should be one element in currentGame array", ()=>{
        expect(game.currentGame.length).toBe(1);
    });
    test("should display 0 fore elemnt with id of score", ()=>{
        expect(document.getElementById("score").innerText).toBe(0);
    });
});

describe("gameplay works correctly", () =>{
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });

    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });

    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurn should update game.turnNumber", ()=>{
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
});