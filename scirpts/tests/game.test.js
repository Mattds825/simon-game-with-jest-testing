/**
 * @jest-environment jsdom
 */

const {game} = require('../game.js');

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
});