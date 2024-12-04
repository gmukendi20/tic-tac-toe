// Selecting all cells, restart button, and winner message
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const winnerMessage = document.getElementById('winnerMessage');

// Variables to track the game state
let isCircleTurn = false;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle cell clicks
function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'o' : 'x';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

// Place X or O in the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

// Swap turns between X and O
function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

// Check for a win
function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

// Check for a draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

// End the game
function endGame(draw) {
    if (draw) {
        winnerMessage.textContent = "It's a Draw!";
    } else {
        winnerMessage.textContent = `${isCircleTurn ? "O's" : "X's"} Win!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

// Restart the game
function restartGame() {
    isCircleTurn = false;
    winnerMessage.textContent = '';
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.addEventListener('click', handleClick, { once: true });
    });
}

// Add event listeners to cells and restart button
cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);
