"use strict"
//-----------------------------Spieler erstellen---------------------------------------------------
function Players(name, punkte, mark) {
    //this.punkte = 0;
    //this.mark = mark;
    return {name}
}
const init = (() => {
    let startBtn = document.getElementById('start')
    startBtn.addEventListener('click', () => {
        let player1 = document.getElementById('player1').value;
        let player2 = document.getElementById('player2').value;
        if (player1 == "" || player2 == ""){
            alert('Namen eingeben!');
        } else {
            player1 = new Players(player1, 0, 'X');
             player2 = new Players(player2, 0, 'O');
            spielen(player1, player2, 'p1');
        }
    })
})()
//--------------------------Spiel starten-----------------------------------------------------
class NeuesSpiel{   
    constructor(runde, werdran, spielfeld){
        this.runde = runde;
        this.werDran = werdran;
        this.spielfeld = spielfeld;
        this.end = 'run';
    }
    get welcheRunde() {
        return this.runde
    }
    set welcheRunde(runde) {
        this.runde = runde;
    }
    set werZug(werdran){
        this.werDran = werdran;
    }
    get werFeld(){
        this.auswahl = auswahl;
    }
}
//--------------------------Spiel Daten/ Gamemaster func ------------------------------------------------------
const spielen = (player1, player2, wer) => {
    let spielfeld = ['a','b','c','d','e','f','g','h','i'];
    let spiel = new NeuesSpiel(0, wer, spielfeld);
    feldErkennen('click', spiel);
    //restart();
}
const feldErkennen = (event, spiel) =>{
    let feld = document.getElementById('spielfeld')   
        feld.addEventListener(event, (e) => {
            let targetElement = e.target;
            if (spiel.end === 'run'){
                feldMarkieren(targetElement, spiel);
            } else if (spiel.end === 'win'){
                console.log('spiel sieg');
            } else if (spiel.end === 'draw') {
                console.log(('spiel draw'));
            }
            //playerTurn(spiel);
            /*
            while (targetElement != null) {
                targetElement = targetElement.parentElement;
            }*/
        }, true)
    
}
const feldMarkieren = (targetElement, spiel) => {
    if(targetElement.innerHTML === ""){
        if(spiel.werDran == 'p1'){
            targetElement.innerHTML = 'X';
            spiel.werZug = 'p2';
            changeRound(spiel)
        }
        else if(spiel.werDran == 'p2'){
            targetElement.innerHTML = 'O';
            spiel.werZug = 'p1';
            changeRound(spiel)
        }
        feldErstellen(targetElement, spiel);
    }
    else if(targetElement.innerHTML === 'Restart'){
        restart()
    }
    else {
        alert('Feld ist schon besetzt');
    }
}
const changeRound = (spiel) => {   
    spiel.welcheRunde = spiel.welcheRunde + 1;
    
}
const feldErstellen = (targetElement, spiel) => {
    let feld = document.querySelector('.felder');
    feld = targetElement.dataset.value;
    spiel.spielfeld[feld] = spiel.werDran;
    endCondition(spiel);   
}
const restart = () => {
    navigator.reload();
}
const endCondition = (spiel) => { 
    if( (spiel.spielfeld[0] === spiel.spielfeld[1] && spiel.spielfeld[1] === spiel.spielfeld[2]) ||
        (spiel.spielfeld[3] === spiel.spielfeld[4] && spiel.spielfeld[4] === spiel.spielfeld[5]) ||
        (spiel.spielfeld[6] === spiel.spielfeld[7] && spiel.spielfeld[7] === spiel.spielfeld[8]) ||

        (spiel.spielfeld[0] === spiel.spielfeld[3] && spiel.spielfeld[3] === spiel.spielfeld[6]) ||
        (spiel.spielfeld[1] === spiel.spielfeld[4] && spiel.spielfeld[4] === spiel.spielfeld[7]) ||
        (spiel.spielfeld[2] === spiel.spielfeld[5] && spiel.spielfeld[5] === spiel.spielfeld[8]) ||

        (spiel.spielfeld[0] === spiel.spielfeld[4] && spiel.spielfeld[4] === spiel.spielfeld[8]) ||
        (spiel.spielfeld[6] === spiel.spielfeld[4] && spiel.spielfeld[4] === spiel.spielfeld[2])){   
        console.log(spiel.werDran, 'hat gewonnen');
        spiel.end = 'win';
    } else if(spiel.welcheRunde >= 8) {
        spiel.end = 'draw';
    }
}
/*
const playerTurn = (spiel) => {
    if(spiel.runde % 2 === 0) {
        spiel.werdran = 'p1';
    } else {
        spiel.werdran = 'p2';
    }
}
*/
