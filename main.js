"use strict"
//-----------------------------Spieler erstellen---------------------------------------------------
function Players(name, punkte, mark) {
    this.punkte = 0;
    this.mark = mark;
    return {name, punkte, mark}
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
    constructor(runde, werdran){
        this.runde = runde;
        this.werDran = werdran;
        this.auswahl = ['z','z','z','z','z','z','z','z','z'];
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
    let spiel = new NeuesSpiel(0, wer);
    feldErkennen('click', spiel);
    //restart();
}
const feldErkennen = (event, spiel) =>{
    let feld = document.getElementById('spielfeld')
    feld.addEventListener(event, (e) => {
        let targetElement = e.target;
        feldMarkieren(targetElement, spiel);
        feldErstellen(targetElement, spiel);
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
    } else {
        alert('Feld ist schon besetzt');
    }
}
const changeRound = (spiel) => {   
    spiel.welcheRunde = spiel.welcheRunde + 1;
    
}
const feldErstellen = (targetElement, spiel) => {
    let feld = document.querySelector('.felder');
    feld = targetElement.dataset.value;
    console.log('feld', feld);
    //spiel.werFeld = spiel.werfeld[feld]
}

/*
const restart = () => {
    let btn = document.getElementById('restart')
    btn.addEventListener('click', () => {
        init()
    })
    console.log('test', player1);
}


const winCondition = (spiel) => {    
    if( (0 === 1 && 1 === 2) ||
        (3 === 4 && 4 === 5)) ||
        (6 === 7 && 7 === 8) ||

        (0 === 3 && 3 === 6) ||
        (1 === 4 && 4 === 7) ||
        (2 === 5 && 5 === 8) ||

        (0 === 4 && 4 === 8) ||
        (6=== 4 && 4 === 2)     {

    }
    456
    789

    741
    258
    963

    159
    753

}


const playerTurn = (spiel) => {
    if(spiel.runde % 2 === 0) {
        spiel.werdran = 'p1';
    } else {
        spiel.werdran = 'p2';
    }
}
*/
