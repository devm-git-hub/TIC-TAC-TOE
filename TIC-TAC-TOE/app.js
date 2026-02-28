const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('reset');
const status = document.getElementById('status');

let turnO = true; 
let gameOver = false;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function updateStatus(text) {
    if (status) status.textContent = text;
}

function checkWinner() {
    const values = Array.from(boxes).map(b => b.textContent.trim());

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (values[a] !== '' && values[a] === values[b] && values[b] === values[c]) {
            return { winner: values[a], combo };
        }
    }
    return null;
}

function endGame(result) {
    gameOver = true;
    if (result && result.winner) {
        updateStatus(result.winner + ' wins!');
        
        result.combo.forEach(i => boxes[i].classList.add('win'));
    } else {
        updateStatus('Draw');
    }
    boxes.forEach(b => b.classList.add('disabled'));
}


boxes.forEach((box, idx) => {
    box.addEventListener('click', () => {
        if (gameOver) return;
        if (box.textContent.trim() !== '') return; // already filled

        box.textContent = turnO ? 'O' : 'X';
        box.classList.add('played');

        const result = checkWinner();
        if (result) {
            endGame(result);
            return;
        }

        // check draw
        const isFull = Array.from(boxes).every(b => b.textContent.trim() !== '');
        if (isFull) {
            endGame(null);
            return;
        }

        turnO = !turnO;
        updateStatus('Turn: ' + (turnO ? 'O' : 'X'));
    });
});

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        boxes.forEach(b => {
            b.textContent = '';
            b.classList.remove('played', 'disabled', 'win');
        });
        turnO = true;
        gameOver = false;
        updateStatus('Turn: O');
    });
} else {
    console.warn('Reset button not found');

}



