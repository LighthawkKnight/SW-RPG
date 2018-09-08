// Name, darkside, HP, Atk, Counter
const luke = ["Luke Skywalker", false, 800, 20, 40];
const vader = ["Darth Vader", true, 1000, 10, 50];
const boba = ["Boba Fett", true, 500, 30, 30]

class Combatant {

    constructor(name = "Yoda", dark = false, hp = 9999, atk = 999, ctr = 999) {
        this.name = name;
        this.dark = dark;
        this.hp = hp;
        this.atk = atk;
        this.ctr = ctr;
    }

    changeHP(element) {
        if (this.hp <= 0)
            this.hp = 0
        $(element).html(" " + this.hp);
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
var player = new Combatant(char[0], char[1], char[2], char[3], char[4])

// pick random enemy
var oppt = vader;
var enemy = new Combatant(oppt[0], oppt[1], oppt[2], oppt[3], oppt[4]);

$('#atkButton').click(function() {
    enemy.hp -= player.atk;
    player.hp -= enemy.ctr;
    player.changeHP("'#playerHP'");
    enemy.changeHP("'#activeHP'");

    if (player.hp <= 0) {
        // game over
    }
    else if (enemy.hp <= 0) {
        // remove defender, player choose new;
        // if no enemies
            // win
    }
    else {
        if (player.hp <= 0) {
            //lose
        }
    }
});

