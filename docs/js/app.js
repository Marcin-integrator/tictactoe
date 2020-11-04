/*jslint es6 */
let activePlayer, circleImg, crossImg, gamePlaying, size;


let toWin = [
    [NaN, NaN, NaN], //[1, 2, 3]
    [NaN, NaN, NaN], //[4, 5, 6]
    [NaN, NaN, NaN], //[7, 8, 9]
    [NaN, NaN, NaN], //[1, 4, 7]
    [NaN, NaN, NaN], //[2, 5, 8]
    [NaN, NaN, NaN], //[3, 6, 9]
    [NaN, NaN, NaN], //[1, 5, 9]
    [NaN, NaN, NaN]  //[3, 5, 7]
];


init();


function Board() {
    let i = toWin.length;
    while (i-- > 0) {
        toWin.splice(i, 1, [NaN, NaN, NaN]);
    }

    for (let j = 1; j <= size; j++) {
        document.getElementById('fld-' + j).addEventListener('click', field);
    }
};


function image(activeNum) {
    if (activeNum === 0) {
        circleImg = new Image();
        circleImg.src = './img/circle.png';
        circleImg.setAttribute('class', 'circle');
        return circleImg;
    } else {
        crossImg = new Image();
        crossImg.src = './img/cross.png';
        crossImg.setAttribute('class', 'cross')
        return crossImg;
    };
}


function insert(value, num) {
    if (num === 1) {
        toWin[0][0] = value;
        toWin[3][0] = value;
        toWin[6][0] = value;
    } else if (num === 2) {
        toWin[0][1] = value;
        toWin[4][0] = value;
    } else if (num === 3) {
        toWin[0][2] = value;
        toWin[5][0] = value;
        toWin[7][0] = value;
    } else if (num === 4) {
        toWin[1][0] = value;
        toWin[3][1] = value;
    } else if (num === 5) {
        toWin[1][1] = value;
        toWin[4][1] = value;
        toWin[6][1] = value;
        toWin[7][1] = value;
    } else if (num === 6) {
        toWin[1][2] = value;
        toWin[5][1] = value;
    } else if (num === 7) {
        toWin[2][0] = value;
        toWin[3][2] = value;
        toWin[7][2] = value;
    } else if (num === 8) {
        toWin[2][1] = value;
        toWin[4][2] = value;
    } else if (num === 9) {
        toWin[2][2] = value;
        toWin[5][2] = value;
        toWin[6][2] = value;
    }
    chceckWin(value);
};


function field(insert) {
    ourTarget = insert.target.getAttribute('id');
    ourField = document.getElementById(ourTarget)
    if (activePlayer === 0) {
        ourField.appendChild(image(activePlayer));
        ourField.removeEventListener('click', field);
        ourField.setAttribute("class", "field-dis");
    } else {
        ourField.appendChild(image(activePlayer));
        ourField.removeEventListener('click', field);
        ourField.setAttribute("class", "field-dis");
    }
    position(activePlayer, ourTarget);
    if (gamePlaying === true) {
        checkFreeFields();
        nextPlayer();
    }
};


function position(player, field) {
    field = parseInt(field.slice(-1));
    insert(player, field);

};


function chceckWin(winner) {
    toWin.forEach(line => {
        line.forEach((fld, i, line) => {
            if (line[0] === line[1] && line[1] === line[2] && fld !== NaN) {
                document.querySelector('#name-' + winner).textContent = 'Winner!';
                document.querySelector('.player-' + winner + '-panel').classList.add('winner');
                document.querySelector('.player-' + winner + '-panel').classList.remove('active');
                gamePlaying = false;
                for (let i = 1; i <= size; i++) {
                    document.getElementById('fld-' + i).removeEventListener('click', field);
                    document.getElementById('fld-' + i).setAttribute("class", "field-dis");
                }
            }
        })
    })

};


function checkFreeFields() {
    for (let i = 1; i <= size; i++) {
        if (document.getElementById('fld-' + i).getAttribute("class") === "field") {
            break;
        } else if (i === 9){
            draw();
        } else {
            continue;
        }
    }
};


function draw() {
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.add('active');
    document.getElementById('info').textContent = 'It\'s a draw, play again';
};


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    gamePlaying = true;
    size = 9;
    Board();
    activePlayer = 0;
    for (let i = 1; i <= size; i++) {
            document.getElementById('fld-' + i).innerHTML = '';
            document.getElementById('fld-' + i).setAttribute("class", "field");
    }
    document.getElementById('info').textContent = '';
    document.getElementById('name-0').textContent = 'Player' + '\n' + ' ⃝';
    document.getElementById('name-1').textContent = 'Player' + '\n' + ' X';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

