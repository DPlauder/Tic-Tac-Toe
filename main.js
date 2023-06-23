"use strict"

//-----------------------------Anzeige im HTML Switchen-------------------------------------------
const toogleShowForm = (() => {
    let form = document.getElementById('form');
    form.classList.toggle('anzeige_weg');
})
const toogleShowGame = (() => {
    let spielfeld = document.getElementById('spielablauf');
    spielfeld.classList.toggle('anzeige_weg');
})
const toogleShowFinal = (() => {
    let ergebnis = document.getElementById('ergebnis');
    ergebnis.classList.toggle('anzeige_weg');   
})
const toogleShowZug = (() => {
    let p1 = document.getElementById('zug1');
    let p2 = document.getElementById('zug2');
    p1.classList.toggle('anzeige_weg');
    p2.classList.toggle('anzeige_weg');
}) 
//-----------------------------Spieler erstellen/Anzeigen---------------------------------------------------
function Players(name, punkte, mark) {
    //this.punkte = 0;
    //this.mark = mark;
    return {name}
}
const playerInfo = () => {
    let startBtn = document.getElementById('start')
    startBtn.addEventListener('click', () => {
        let player1 = document.getElementById('player1').value;
        let player2 = document.getElementById('player2').value;
        if (player1 == "" || player2 == ""){
            alert('Namen eingeben!');
        } else {
            player1 = new Players(player1, 0, 'X');
            player2 = new Players(player2, 0, 'O');
            toogleShowForm();
            toogleShowGame();
            playerDisplay(player1, player2)
            spielen(player1, player2, 'p1');
        
        }
    })   
}
const playerDisplay = (player1, player2) => {
    let p1 = document.getElementById('p1');
    let p2 = document.getElementById('p2');
    p1.innerHTML = player1.name;
    p2.innerHTML = player2.name;
}

//-----------------------------Spiel starten-----------------------------------------------------
class NeuesSpiel{   
    constructor(runde, werdran, spielfeld, player1, player2){
        this.runde = runde;
        this.player1 = player1;
        this.player2 = player2
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
//-----------------------------Spiel Daten/ Gamemaster func ------------------------------------------------------
const spielen = (player1, player2, wer) => {
    let spielfeld = ['a','b','c','d','e','f','g','h','i'];
    let spiel = new NeuesSpiel(0, wer, spielfeld, player1, player2);
    feldErkennen('click', spiel, player1, player2);
}
const feldErkennen = (event, spiel, player1, player2) =>{
    let feld = document.getElementById('spielfeld')   
        feld.addEventListener(event, (e) => {
            let targetElement = e.target;
            if (spiel.end === 'run'){
                feldMarkieren(targetElement, spiel);
            } else if (spiel.end === 'win'){
                winner(player1, player2)
            } else if (spiel.end === 'draw') {
                console.log(('spiel draw'));
            }
        }, true)    
}
//-----------------------------Marker am Feld + Wechsel wer dran-------------------------------------------
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
        toogleShowZug();
        feldErstellen(targetElement, spiel);
    }
    else if(targetElement.innerHTML === 'NEU STARTEN'){
        restart()
    }
    else {
        alert('Feld ist schon besetzt');
    }
}
//-----------------------------Rundenzähler-----------------------------------------------------------
const changeRound = (spiel) => {   
    spiel.welcheRunde = spiel.welcheRunde + 1;    
}
//-----------------------------ändern Array Felder-----------------------------------------------------
const feldErstellen = (targetElement, spiel) => {
    let feld = document.querySelector('.felder');
    feld = targetElement.dataset.value;
    spiel.spielfeld[feld] = spiel.werDran;
    endCondition(spiel);   
}
//-----------------------------------------------------------------------------------------------------------------
const restart = () => {
    location.reload();
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
        spiel.end = 'win';
        ergebnis(spiel, player1, player2)
    } else if(spiel.welcheRunde >= 9) {
        spiel.end = 'draw';
        ergebnis(spiel, player1, player2)
    }
}
//-----------------------------Spiel Ende/ Meldung Runden Ende---------------------------------------------------
const ergebnis = ((spiel) => {
    let ausgabe = document.getElementById('ausgabe');
    if(spiel.end === 'win'){  
        let winner = ""
        if(spiel.werDran === 'p1'){
            winner = spiel.player2;
        } else {
            winner = spiel.player1;
        }
        ausgabe.innerHTML = `${winner.name} hat gewonnen!`;
    } else if (spiel.end === 'draw'){
        ausgabe.innerHTML = `Das Spiel endet Unentschieden`;
    }   
    toogleShowGame();
    toogleShowFinal();
    let btn = document.getElementById('restart_erg');
    btn.addEventListener('click', () => restart());
})

const init = (() => {
    playerInfo()
})()
