/**
 * Created by MLE3657 on 28/03/2017.
 */

let circle = Array();
let players = ["Charles", "Minh", "Paul", "Loic"];

function createGround(){
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svgGround");

    let svgGround = document.getElementById("svgGround");

    for(var j =0; j< 4; j++) {
        for (var i = 0; i < 14; i++) {
            circle[j * 14 + i] = document.createElementNS(svgNS, "circle");
            circle[j * 14 + i].setAttribute("r", "15");
            circle[j * 14 + i].setAttribute("visibility", "visible");
            circle[j * 14 + i].setAttribute("visibility", "visible");
            circle[j * 14 + i].setAttribute("style", "stroke-width: 2;stroke: rgb(0,0,0)");

            switch (j) {
                case 0 :
                    circle[j * 14 + i].setAttribute("cx", 33 * i + 18);
                    circle[j * 14 + i].setAttribute("cy", 18);
                    circle[j * 14 + i].setAttribute("fill", "yellow");

                    break;
                case 1 :
                    circle[j * 14 + i].setAttribute("cx", 33 * 14 + 18);
                    circle[j * 14 + i].setAttribute("cy", 33 * i + 18);
                    circle[j * 14 + i].setAttribute("fill", "red");
                    break;
                case 2 :
                    circle[j * 14 + i].setAttribute("cx", 33 * (14 - i) + 18);
                    circle[j * 14 + i].setAttribute("cy", 33 * 14 + 18);
                    circle[j * 14 + i].setAttribute("fill", "green");
                    break;
                case 3 :
                    circle[j * 14 + i].setAttribute("cx", 18);
                    circle[j * 14 + i].setAttribute("cy", 33 * (14 - i) + 18);
                    circle[j * 14 + i].setAttribute("fill", "blue");
                    break;

                default :
                    break;
            }
            svgGround.appendChild(circle[j * 14 + i]);
        }
    }
}

function createDieSVG(id){
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svg");
    let circle = Array(7);
    for(var i=0;i<7;i++){
        circle[i] = document.createElementNS(svgNS, "circle");
        circle[i].setAttribute("r", "5");
        circle[i].setAttribute("fill", "white");
        circle[i].setAttribute("visibility", "hidden");
        circle[i].setAttribute("id", "d"+id+"p"+i);
        if (i == 0){
            circle[i].setAttribute("cx", "25");
            circle[i].setAttribute("cy", "25");
        } else {
            let j = i;
            if (i % 2){
                circle[i].setAttribute("cx", "10");
                j++;
            }
            else{
                circle[i].setAttribute("cx", "40");
            }
            circle[i].setAttribute("cy", String(7.5 * j - 5));
        }
    }

    for(var i=0;i<7;i++){
        svg.appendChild(circle[i]);
    }
    return svg;
}

function setupGame(){
    for(var i =0; i<1; i++){
        let die = document.getElementById("svg"+i);
        let svg = createDieSVG(i);
        die.appendChild(svg);
    }
    createGround();
}

function animateDie(id, value){
    let die = document.getElementById("svg"+id);
    let point = [];
    for(var i = 0; i < 7; i++){
        point[i] = document.getElementById("d"+id+"p"+i);
        point[i].setAttribute("visibility", "hidden");
    }
    if (value % 2){
        point[0].setAttribute("visibility", "visible");
    }
    if (value >= 2){
        point[5].setAttribute("visibility", "visible");
        point[2].setAttribute("visibility", "visible");
    }
    if (value >= 4){
        point[1].setAttribute("visibility", "visible");
        point[6].setAttribute("visibility", "visible");
    }
    if (value >= 6){
        point[3].setAttribute("visibility", "visible");
        point[4].setAttribute("visibility", "visible");
    }
}

function rand(){
    var des = Math.floor((Math.random() * 6) + 1);;
    console.log(des);
    //window.document.getElementById("d0").innerHTML = des;
    animateDie(0, des);
    return des;
}

let activePlayer = 0;
let horses = [
    [-1,-1],
    [-1,-1],
    [-1,-1],
    [-1,-1],
];
function play(event) {
    event.preventDefault();
    let value = rand();
    log("--------------------------------");
    log("Tour de " + players[activePlayer]);
    log("Dé : " + value);
    for(let i=0; i<4; i++){
        if (i == activePlayer){
            document.getElementById("p"+i).className = "label label-success";
        }
        else{
            document.getElementById("p"+i).className = "label label-default";
        }
    }
    activePlayer  = (activePlayer + 1) % 4;

    ///S'il n'a pas de cheval sur le board
    let activeHorses = 2 - horses[activePlayer].filter(function(x){return x==-1}).length;
    log("Nombre de chevaux actifs : " + activeHorses);
    switch (activeHorses){
        case 0:
            if(value == 6){
                log("Sortie de cheval !");
                horses[activePlayer][0] = activePlayer*15;
            }
            break;
        case 1:
            if(value == 6){
                log("Voulez-vous sortir un cheval");
            } else {
                horses[activePlayer][0] += value;
                horses[activePlayer][0] %= 60;
            }
            break;
        case 2:
            log("Quel cheval voulez-vous avancer ?");
            break;
        default:
            log("ERREUR !");
            break;
    }
    log("Chevaux : (" + horses[activePlayer] + ")");

    /*

        joueurActif = player;
        let opponent = 1 - player;
        //log("[Chance] : " + chance[player]+ ", " + chance[opponent]);

        ///Premier lancer : Win si AZAR
        if (chance[opponent] == null){
            setChance(opponent);
            document.getElementById("p"+opponent).disabled = true;
            if (isAzar(chance[opponent])){
                log("AZAR ! Joueur " + joueurs[player] + " gagne !")
                document.getElementById("p"+player).disabled = true;
            } else {
                log("Chance de " + joueurs[opponent] + " = " + chance[opponent]);
            }
        }
        ///Deuxième lancer : Lose si AZAR
        else if (chance[player] == null) {
            setChance(player);
            document.getElementById("p"+player).disabled = true;
            document.getElementById("p"+opponent).disabled = false;
            if (isAzar(chance[player])){
                log("AZAR ! Joueur " + joueurs[player] + " perd !")
                document.getElementById("p"+opponent).disabled = true;
            } else {
                if (chance[0] == chance[1]){
                    log("Chances égales ! Match nul!");
                    document.getElementById("p"+opponent).disabled = true;
                }
                else{
                    log("Chance de " + joueurs[player] + " = " + chance[player]);
                }
            }
        }
        ///Boucle de jeu
        else{
            log("Tour de " + joueurs[player]);
            document.getElementById("p"+player).disabled = true;
            document.getElementById("p"+opponent).disabled = false;
            lancers[player] = rand();
            score[player] = sum(lancers[player]);
            log(score[player]);
            if (score[player] == chance[0] || score[player] == chance[1]){
                log("Gagné !");
                document.getElementById("p"+opponent).disabled = true;
            }
        }*/
}

function log (message) {
    let consoleView = window.document.getElementById("results");
    consoleView.value += "\n" + message;
    consoleView.scrollTop = consoleView.scrollHeight;
}

function reset(){
   /* chance = [];
    lancers = [];
    score = [];
    document.getElementById("p0").disabled = false;
    document.getElementById("p1").disabled = false;
    for(let i in [0,1,2]){
        document.getElementById("d"+i).innerHTML = "-";
    }
    for(let i in [0,1]){
        document.getElementById("c"+i).innerHTML = "-";
    }
    log("----------------");
    log("Nouvelle Partie !");
    log("----------------");*/
}