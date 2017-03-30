/**
 * Created by MLE3657 on 28/03/2017.
 */

let circle = Array();
let players = ["Charles", "Minh", "Paul", "Loic"];
let horsesG = Array();

const posHorseDefault = [40,16,36,34,38,40,34,50,60,50,56,40,58,34,54,20,60,20,50,4,40,16];
const offset = 30;
let isAnimate = false;

function createGround(){
    let svgNS = "http://www.w3.org/2000/svg";
    let svg = document.createElementNS(svgNS, "svgGround");

    let svgGround = document.getElementById("svgGround");


    for(var j =0; j< 4; j++) {
        for (var i = 0; i < 14; i++) {
            circle[j * 14 + i] = document.createElementNS(svgNS, "circle");
            circle[j * 14 + i].setAttribute("r", "15");
            circle[j * 14 + i].setAttribute("visibility", "visible");
            circle[j * 14 + i].setAttribute("style", "stroke-width: 2;stroke: rgb(0,0,0)");

            switch (j) {
                case 0 :
                    circle[j * 14 + i].setAttribute("cx", 33 * i + 18 + offset);
                    circle[j * 14 + i].setAttribute("cy", 18 + offset);
                    circle[j * 14 + i].setAttribute("fill", "yellow");
                    break;
                case 1 :
                    circle[j * 14 + i].setAttribute("cx", 33 * 14 + 18 + offset);
                    circle[j * 14 + i].setAttribute("cy", 33 * i + 18 + offset);
                    circle[j * 14 + i].setAttribute("fill", "red");
                    break;
                case 2 :
                    circle[j * 14 + i].setAttribute("cx", 33 * (14 - i) + 18 + offset);
                    circle[j * 14 + i].setAttribute("cy", 33 * 14 + 18 + offset);
                    circle[j * 14 + i].setAttribute("fill", "green");
                    break;
                case 3 :
                    circle[j * 14 + i].setAttribute("cx", 18 + offset);
                    circle[j * 14 + i].setAttribute("cy", 33 * (14 - i) + 18 + offset);
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

    horsesG[0] =
        {
            index:0,
            pos2D: [...posHorseDefault],
            svg : document.createElementNS(svgNS, "path")
        };
    horsesG[0].svg.setAttribute("visibility", "visible");
    horsesG[0].svg.setAttribute("style", "stroke-width: 2;stroke: rgb(0,0,0)");
    horsesG[0].svg.setAttribute("fill", "gray");

    horsesG[0].svg.setAttribute("d", "M" + posHorseDefault);
    svgGround.appendChild(horsesG[0].svg);
}


function moveHorse(horse, movePoint) {
    for(var i = 1; i<=movePoint; i++){
        isAnimate = true;
        horse.index = (horse.index + 1)%(circle.length);
        for(let j = 1; j <= 10; j++){
            setTimeout(function(indexH, fragDelay, countToStop){
                var index = indexH;
                for(var k = 0 ; k < horse.pos2D.length; k++){
                    if(index < 15 && index > 0 && k%2 == 0){
                        horse.pos2D[k] += 3;
                        if(fragDelay == 10){
                            horse.pos2D[k]+=3;
                        }
                        horsesG[0].svg.setAttribute("d", "M" + horse.pos2D);
                    }

                    if(index > 14 && index < 29 && k%2 == 1){
                        horse.pos2D[k] += 3;
                        if(fragDelay == 10){
                            horse.pos2D[k]+=3;
                        }
                        horsesG[0].svg.setAttribute("d", "M" + horse.pos2D);
                    }

                    if(index > 28 && index < 43 && k%2 == 0){
                        horse.pos2D[k] -= 3;
                        if(fragDelay == 10){
                            horse.pos2D[k]-=3;
                        }
                        horsesG[0].svg.setAttribute("d", "M" + horse.pos2D);
                    }

                    if( (index > 42 || index == 0)  && k%2 == 1){
                        horse.pos2D[k] -= 3;
                        if(fragDelay == 10){
                            horse.pos2D[k]-=3;
                        }
                        horsesG[0].svg.setAttribute("d", "M" + horse.pos2D);
                    }

                }

                if(countToStop == 0){
                    isAnimate = false;
                }
            }, ((i-1)*10+j)*150, horse.index, j, movePoint-i);
        }
    }
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
        isAnimate = true;
        var des = Math.floor((Math.random() * 6) + 1);
        //animateDie(0, des);
        setTimeout(function (value, count){
            animateDie(0, value);
            if(count == 9){
                isAnimate = false;
            }
        }, j*50, des, j);
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



function play() {
    if(!isAnimate){
        activePlayer  = (activePlayer + 1) % 4;
        let value = rand();


        //todo a finir
        moveHorse(horsesG[0], value);

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

    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
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

