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

function createHorse() {
    let svgNS = "http://www.w3.org/2000/svg";
    let svgGround = document.getElementById("svgGround");

    let cheval = Array();
    let pos = [22, 16, 18, 34, 20, 40, 16, 50, 42, 50, 38, 40, 40, 34, 36, 20, 42, 20, 32, 4, 22, 16];



    cheval[0] =  document.createElementNS(svgNS, "path");
    cheval[0].setAttribute("visibility", "visible");
    cheval[0].setAttribute("style", "stroke-width: 2;stroke: rgb(0,0,0)");
    cheval[0].setAttribute("fill", "gray");


    cheval[0].setAttribute("d", "M" + pos);

    svgGround.appendChild(cheval[0]);
    /*
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
    }*/
}

function setupGame(){
    for(var i =0; i<1; i++){
        let die = document.getElementById("svg"+i);
        let svg = createDieSVG(i);
        die.appendChild(svg);
    }
    createGround();
    createHorse();
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
    for(let j = 0; j < 10; j++){
        var des = Math.floor((Math.random() * 6) + 1);
        //animateDie(0, des);
        setTimeout(function (value){animateDie(0, value);}, j*50, des);
    }
    console.log(des);
    return des;
}

let activePlayer = -1;
let horses = [
    [-1,-1],
    [-1,-1],
    [-1,-1],
    [-1,-1],
];
function play(event) {
    event.preventDefault();
    activePlayer  = (activePlayer + 1) % 4;
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

