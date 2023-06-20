"use strict"

function players(name) {
    return {name}
}
const init = (() => {
    let startBtn = document.getElementById('start')
    startBtn.addEventListener('click', () => {
        let player1 = document.getElementById('player1').value;
        let player2 = document.getElementById('player2').value;
        if (player1 == "" || player2 == ""){
            alert('Namen eingeben!')
        } else {
            player1 = players(player1);
            player2 = players(player2);
            console.log(player1);
            feldErkennen('click')
        }
    })
})()

function spielfeld(runde){
    this.runde = runde;
}

function feldErkennen(event){
    let rootElement = rootElement;
    rootElement.addEventListener(event, (e) => {
        let targetElement = e.target;

        while (targetElement != null) {
            console.log(targetElement);
        }
        targetElement = targetElement.parentElement;
    }, true)
}