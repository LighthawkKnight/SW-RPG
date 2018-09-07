const lightSide = ["Luke Skywalker", "Han Solo"];
const darkSide = ["Darth Vader", "Stormtrooper"];

// HP, Atk, Counter
const luke = [500, 20, 30];
const vader = [600, 10, 50];
const han = [400, 50, 10];
const trooper = [300, 40, 20];

class Combatant {

    constructor(hp = 9999, atk = 999, ctr = 999) {
        // this.name = name;
        // this.aff = aff;
        this.hp = hp;
        this.atk = atk;
        this.ctr = ctr;
    }
}

// main
// character select

/* move elements
    player char to player area
    rest of chars to 'defender area'
    choose enemy to attack
    enemy chosen becomes active/moves to fighting arena
    create/show attack button for player
*/

/* Click attack 
    Char attacks.  Defender hp -= player atk

    If defender hp <= 0
        Delete defender from defender area/fighting arena
        Player choose new enemy -> New enemy becomes defender
        if no ememies
            game over (win)
    Else
        Defender counters.  Player hp -= defender ctr (defender should counter after hp check)
        if player hp = 0
             game over (lose)
*/

// get char chosen, maybe a switch case
var char = luke;

var player = new Combatant(char[0], char[1], char[2])

// pick random enemy
var oppt = vader;

var enemy = new Combatant(oppt[0], oppt[2], oppt[3]);

$('element').click(function() {
    enemy.hp -= player.atk;
    if (enemy.hp <= 0) {
        // remove defender, player choose new;
        // if no enemies
            // win
    }
    else {
        player.hp -= enemy.ctr;
        if (player.hp <= 0) {
            //lose
        }
    }
});

