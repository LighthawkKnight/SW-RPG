const iPath = "assets/img/"

// Name, darkside, HP, Atk, Counter, Portrait
const Luke = ["Luke Skywalker", false, 800, 20, 40, iPath+"luke.bmp"];
const Han = ["Han Solo", false, 600, 40, 20, iPath+"han.bmp"]
const Vader = ["Darth Vader", true, 1000, 10, 50, iPath+"vader.bmp"];
const Boba = ["Boba Fett", true, 600, 30, 30, iPath+"boba.bmp"]

// Attack power increase per attack
const atkIncr = 5;

class Combatant {

    constructor(name = "", dark = true, hp = 1, atk = 1, ctr = 1, img = "") {
        this.name = name;
        this.dark = dark;
        this.hp = hp;
        this.atk = atk;
        this.ctr = ctr;
        this.img = img;
        this.alive = true;
    }

    displayCard(element, pos = "") {
        $("#"+element+pos+"Img").attr('src', this.img);
        $("#"+element+pos+"Img").attr('alt', this.name);
        $("#"+element+pos+"Name").html(this.name);
        $("#"+element+pos+"HP").html(this.hp);
        $("#"+element+pos+"Atk").html(this.atk);
        $("#"+element+pos+"Ctr").html(this.ctr);   
        $("#"+element+pos).show();
    }

    changeHP(element, pos = "") {
        if (this.hp <= 0) {
            this.hp = 0
            this.alive = false;
        }
        $("#"+element+pos+"HP").html(" " + this.hp);
    }

    
}

// main
// character select

/* move elements
    player char to player area
    rest of char to 'defender area'
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

var luke = new Combatant(Luke[0], Luke[1], Luke[2], Luke[3], Luke[4], Luke[5])
var vader = new Combatant(Vader[0], Vader[1], Vader[2], Vader[3], Vader[4], Vader[5]);
var han = new Combatant(Han[0], Han[1], Han[2],Han[3], Han[4], Han[5]);
var boba = new Combatant(Boba[0], Boba[1], Boba[2], Boba[3], Boba[4], Boba[5]);
var char = [luke, han, vader, boba]
var player;
var enemy;
var reserve = [];

// $('#startButton').click(function(){
function start(){
    // Displays all character card objects for player to select
    for (var i = 1; i <= char.length; i++) {
        char[i-1].displayCard("player",i);
        $("#player"+i).addClass('pselect');
        $("#player"+i).css('cursor', 'pointer');
    }

    $("#playerCards").on("click", ".card", function() {
        switch($(this).attr('id')) {
            case "player1":     // Luke
                player = char[0];
                pushEnemy(0);
                break;
            case "player2":     // Han
                player = char[1];
                pushEnemy(1);
                break;
            case "player3":     // Vader
                player = char[2];
                pushEnemy(2);
                break;
            case "player4":     // Boba Fett
                player = char[3];
                pushEnemy(3);
                break;               
            function pushEnemy(player) {
                for (var i = 0; i < char.length; i++)
                    if (i != player)
                        reserve.push(char[i]);
            }
        }

        player.displayCard("player", 1);    // Change first card to character selected
        $('#playerCards').off("click");      // Make all character select cards unclickable
        $('#player1').css("cursor", "auto");    // Reset cursor for player card
        $('#player1').removeClass('pselect');  // Remove hover border
        for (var i = 2; i <= char.length; i++) {  // Hide all other cards
            $("#player"+i).removeClass('pselect');
            $("#player"+i).hide();
        }
        //Generate enemy cards
        for (var i = 1; i <= reserve.length; i++) {
            reserve[i-1].displayCard("reserve", i);
            $('#reserve'+i).addClass('alive');
        }
        
        selectEnemy();
    });    

}//);

function selectEnemy(){
    
    for (var i = 1; i <= reserve.length; i++)
        if (reserve[i-1].alive) {
            $('#reserve'+i).addClass('eselect');
            $('#reserve'+i).css("cursor", "pointer");
        }
        else {
            $('#reserve'+i).removeClass('alive');  // might repeat somewhere later
            $('#reserve'+i).off("click");
        }

    $("#reserveCards").on("click", ".alive", function() {
        $(this).hide();
        var id = $(this).attr('id');
        for (var i = 1; i <= reserve.length; i++) {
            if (reserve[i-1].name == $('#'+id+"Name").html()) {
                enemy = reserve[i-1];
            }
            $('#reserve'+i).removeClass('eselect');
            $('#reserve'+i).css("cursor", "auto");
        }
        $("#reserveCards").off("click");
        enemy.displayCard("enemy");
    });
}




start();


$('#atkButton').click(function() {
    enemy.hp -= player.atk;
    player.hp -= enemy.ctr;
    player.changeHP("player", 1);
    enemy.changeHP("enemy");
    player.atk += atkIncr;
    $('#player1Atk').html(" " + player.atk);

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

