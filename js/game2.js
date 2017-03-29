/**
 * Created by MLE3657 on 28/03/2017.
 */
/**
 * Created by MLE3657 on 28/03/2017.
 */
function sum(tab){
    let sum = 0;
    for(elem in tab){
        sum += tab[elem];
    }
    return sum;
}

function createGround(){

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
    //point.setAttribute("visibility", "hidden");
    //die.setAttribute("style", "fill:rgb(255,0,125);stroke-width: 3;stroke: rgb(0,0,0)")
}

function rand(){
    var des = Math.floor((Math.random() * 6) + 1);;
    console.log(des);
    //window.document.getElementById("d0").innerHTML = des;
    animateDie(0, des);
    return des;
}


function play() {
    var ok = rand();

    

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