// Name, darkside, HP, Atk, Counter, Portrait
const Luke = ["Luke Skywalker", false, 2800, 20, 80, "assets/img/luke.bmp"];
const Han = ["Han Solo", false, 2200, 70, 30, "assets/img/han.bmp"];
const Yoda = ["Yoda", false, 3000, 10, 90, "assets/img/yoda2.bmp" ];
const Vader = ["Darth Vader", true, 2500, 40, 60, "assets/img/vader.bmp"];
const Boba = ["Boba Fett", true, 2100, 80, 20, "assets/img/boba.bmp"];
const Emp = ["Emeperor Palpatine", true, 1450, 500, 10, "assets/img/emp.bmp"];


// Attack power increase per attack
const atkIncr = 10;

class Combatant {

    constructor(name = "", dark = true, hp = 1, atk = 1, ctr = 1, img = "") {
        this.name = name;
        this.dark = dark;
        this.hp = hp;
        this.atk = atk;
        this.ctr = ctr;
        this.img = img;
        this.alive = true;
        this.initHP = hp;
        this.initAtk = atk;
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

        if (element == "enemy")
            $('#'+selectedId+"HP").html(" " + this.hp);

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
var han = new Combatant(Han[0], Han[1], Han[2],Han[3], Han[4], Han[5]);
var yoda = new Combatant(Yoda[0], Yoda[1], Yoda[2], Yoda[3], Yoda[4], Yoda[5]);
var vader = new Combatant(Vader[0], Vader[1], Vader[2], Vader[3], Vader[4], Vader[5]);
var boba = new Combatant(Boba[0], Boba[1], Boba[2], Boba[3], Boba[4], Boba[5]);
var emp = new Combatant(Emp[0], Emp[1], Emp[2], Emp[3], Emp[4], Emp[5]);
var char = [luke, han, yoda, vader, boba, emp]
var player;
var enemy;
var selectedEnemy;
var selectedId;
var reserve = [];
var defeated = 0;


$('#startButton').click(function() {
    // Displays all character card objects for player to select
    $('#startButton').html("Restart");
    $('#playerCards').show();
    $('#enemy').hide();
    $('#reserveCards').hide();
    $('#combatLog1').html("Select your character.");
    $('#combatLog2').empty();
    $('#combatLog3').empty();
    $('#player1Img').removeClass('dead');
    $('#enemyImg').removeClass('dead');

    for (var i = 1; i <= char.length; i++) {
        char[i-1].hp = char[i-1].initHP;
        char[i-1].atk = char[i-1].initAtk;
        char[i-1].alive = true;
        char[i-1].displayCard("player",i);
        $("#player"+i).addClass('pselect');
        $("#player"+i).css('cursor', 'pointer');
        $('#player'+i+'Img').removeClass('dead');
    }

    reserve = [];

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
            case "player3":     // Yoda
                player = char[2];
                pushEnemy(2);
                break;
            case "player4":     // Vader
                player = char[3];
                pushEnemy(3);
                break;
            case "player5":     // Boba Fett
                player = char[4];
                pushEnemy(4);
                break;
            case "player6":     // Emperor
                player = char[5];
                pushEnemy(5);
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
            $('#reserve'+i+'Img').removeClass('dead');
        }
        $('#reserveCards').show();
        defeated = 0;
        selectEnemy();
    });    

});

function selectEnemy(){
    
    for (var i = 1; i <= reserve.length; i++)
        if (reserve[i-1].alive) {
            $('#reserve'+i).addClass('eselect');
            $('#reserve'+i).css("cursor", "pointer");
        }
        else {
            $('#reserve'+i).removeClass('alive');  // might repeat somewhere later
            $('#reserve'+i+"Img").addClass('dead');
            $('#reserve'+i).off("click");
        }
    $('#atkButton').prop("disabled", true);
    if (defeated != 0)
        $('#combatLog3').append("Choose your next opponent.")
    else
        $('#combatLog1').html("Select your first oppoenent.")

    $("#reserveCards").on("click", ".alive", function() {
        $(this).hide();
        selectedEnemy = $(this);
        selectedId = $(this).attr('id');
        for (var i = 1; i <= reserve.length; i++) {
            if (reserve[i-1].name == $('#'+selectedId+"Name").html()) {
                enemy = reserve[i-1];
            }
            $('#reserve'+i).removeClass('eselect');
            $('#reserve'+i).css("cursor", "auto");
        }
        $("#reserveCards").off("click");
        enemy.displayCard("enemy");
        $('#atkButton').prop("disabled", false);
        $('#combatLog1').empty();
        $('#combatLog2').empty();
        $('#combatLog3').empty();
    });
}

$('#atkButton').click(function() {
    enemy.hp -= player.atk;
    player.hp -= enemy.ctr;
    player.changeHP("player", 1);
    enemy.changeHP("enemy");
    $('#combatLog1').html(player.name + " hits " + enemy.name + " for " + player.atk + " damage!");
    $('#combatLog2').html(enemy.name + " hits " + player.name + " for " + enemy.ctr + " damage!");
    player.atk += atkIncr;
    $('#player1Atk').html(" " + player.atk);

    if (player.hp <= 0) {
        $('#player1Img').addClass('dead');
        $('#combatLog3').append(enemy.name + " has defeated " + player.name + "!<br>You lose!");
        $('#atkButton').prop("disabled", true);
    }
    else if (enemy.hp <= 0) {
        $('#combatLog3').html(player.name + " has defeated " + enemy.name + "!<br>");
        defeated++;
        if (defeated < reserve.length) {
            $('#enemy').hide();
            selectedEnemy.show();
            selectEnemy();
        }
        else {
            $('#combatLog3').append("You've defeated all opponents.  You win!")
            $('#atkButton').prop("disabled", true);
        }
            
    }
});

$('#playerCards').hide();
$('#enemy').hide();
$('#reserveCards').hide();