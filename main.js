window.addEventListener('DOMContentLoaded', domLoaded);

let newGameBtns;

const currentGame = {
    "rowCount": 3,
    "columnCount": 3,
    "lights": [
        true, true, true,
        true, true, true,
        true, true, true
    ]
}

function domLoaded() {
    const blog = document.getElementById('blog');
    const showBlog = document.getElementById('blogBtn');
    const rules = document.getElementById('rules');
    const showRules = document.getElementById('rulesBtn');
    const clsBlog = document.getElementById('closeBlog');
    const clsRules = document.getElementById('closeRules');
    newGameBtns = document.querySelectorAll('.new-game');
    console.log(newGameBtns);

    const newGameBtn3 = document.getElementById('newGameButton3x3');
    const newGameBtn5 = document.getElementById('newGameButton5x5');

    showBlog.addEventListener('click', function() {
        blog.classList.remove('hidden');
    })
    
    showRules.addEventListener('click', function() {
        rules.classList.remove('hidden');
    })
    
    clsBlog.addEventListener('click', function() {
        blog.classList.add('hidden');
    })
    
    clsRules.addEventListener('click', function() {
        rules.classList.add('hidden');
    })

    newGameBtn3.addEventListener('click', function() {
        newGame(currentGame, false);
    });
    newGameBtn5.addEventListener('click', function() {
        newGame(currentGame, true);
    });

    newGame(currentGame, false);
}

function newGame(game, is5x5) {
    const message = document.getElementById('info');
    message.innerText = 'Turn out all the lights';
    message.classList.remove('end-game');
    body.style.backgroundImage = 'radial-gradient(circle at 50% 40%, #FFFFaa, black 45%)';
    newGameBtns.forEach(btn => {
        btn.style.animation = 'none';
        btn.style.opacity = '0';
    });

    if (is5x5) {
        game.rowCount = 5;
        game.columnCount = 5;
    }else {
        game.rowCount = 3;
        game.columnCount = 3;
    }

    const lightCount = game.rowCount * game.columnCount;
    game.lights = [];
    for (let i = 0; i < lightCount; i++) {
        game.lights.push(false);
    }

    while (allLightsOut(game)) {
        for (let i = 0; i < 20; i++) {
            const randRow = Math.floor(Math.random() * game.rowCount);
            const randCol = Math.floor(Math.random() * game.columnCount);

            toggle(game, randRow, randCol);
        }
    }

    createGameGrid(game, is5x5);
}

function checkIfWin(game) {
    if (allLightsOut(game)) {
        const message = document.getElementById('info');
        message.innerText = 'Whoa! It got dark in here... \nPlay again?';
        message.classList.add('end-game');
        body.style.backgroundImage = 'none';

        newGameBtns.forEach(btn => {
            btn.style.animation = 'fade-in 3s linear 4s 1 forwards, button-glow 3s linear 4s infinite';
        });

        return true;
    }
    return false;
}

function clickLight(game, row, column) {
    if (allLightsOut(game)) {
        return;
    }

    toggle(game, row, column);
    updateGridButtons(game);
    checkIfWin(game);
}

function toggle(game, row, column) {
    const locations = [
        [row, column],
        [row - 1, column],
        [row, column - 1],
        [row + 1, column],
        [row, column + 1],
    ];
    for (let location of locations) {
        row = location[0];
        column = location[1];
        if (row >= 0 && row < game.rowCount && column >= 0 && column < game.columnCount) {
            const index = row * game.columnCount + column;
            game.lights[index] = !game.lights[index];
        }
    }
}

function allLightsOut(game) {
    for (let i = 0; i < game.lights.length; i++) {
        if (game.lights[i]) {
            return false;
        }
    }
    return true;
}

function createGameGrid(game, is5x5) {
    const grid = document.getElementById('gridSpace');
    grid.innerHTML = '';

    grid.className = is5x5 ? 'grid5x5' : 'grid3x3';

    for (let row = 0; row < game.rowCount; row++) {
        for (let column = 0; column < game.columnCount; column++) {
            const button = document.createElement('input');
            button.type = 'button';
            grid.appendChild(button);

            button.addEventListener('click', (e) => {
                clickLight(game, row, column);
            });
        }
    }

    updateGridButtons(game);
}

function updateGridButtons(game) {
    const grid = document.getElementById('gridSpace');

    for (let i = 0; i < game.lights.length; i++) {
        const button = grid.children[i];
        button.className = game.lights[i] ? 'lightOn' : 'lightOff';
    }
}