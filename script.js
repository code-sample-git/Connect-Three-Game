const columns = [[], [], []]; // Tracks the discs in each column
let currentPlayer = 'red'; // Alternates between 'red' and 'yellow'
let winningSequence = []; // Stores the winning sequence of discs+
let isDropping = false; // Prevents the player from dropping multiple discs at once

updateCurrentPlayer();

async function dropDisc(colIndex) {
    if (isDropping) {
        return;
    }
    isDropping = true;
    if (columns[colIndex].length < 6) {
        const disc = createDisc(currentPlayer, colIndex);
        document.getElementsByClassName('column')[colIndex].appendChild(disc);
        columns[colIndex].push(currentPlayer);

        // Update the bottom property after the disc has been added to the DOM
        setTimeout(() => {
            disc.style.bottom = `${(columns[colIndex].length - 1) * 100}px`; // Drop to the correct position
        }, 0);

        // Check for win
        if (checkWin()) {
            // Wait for the disc to drop before drawing the winning line
            setTimeout(() => {
                // Get the positions of the first and last discs in the winning sequence
                const start = getDiscPosition(winningSequence[0]);
                const end = getDiscPosition(winningSequence[winningSequence.length - 1]);
                // Draw a line through the winning discs
                drawWinningLine(start, end);

                setTimeout(() => {
                    alert(currentPlayer.toUpperCase() + " wins!");
                    // Reset the game
                    resetGame();
                }, 500);
                
            }, 1000);
            return;
        }

        // check for draw
        if (columns[0].length === 6 && columns[1].length === 6 && columns[2].length === 6) {
            // Wait for the disc to drop before showing the alert.
            setTimeout(() => {
                alert("It's a draw!");
                // Reset the game
                resetGame();
            }, 1000);
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        updateCurrentPlayer();
        isDropping = false;
    }
}


function createDisc(color, colIndex) {
    const disc = document.createElement('div');
    disc.className = 'disc';
    disc.style.backgroundColor = color;
    disc.style.bottom = '600px'; // Start at the top of the column
    return disc;
}

function checkWin() {
    // Check vertical
    for (let col = 0; col < 3; col++) {
        for (let row = 0; row < columns[col].length - 2; row++) {
            if (columns[col][row] === columns[col][row + 1] && columns[col][row + 1] === columns[col][row + 2]) {
                winningSequence = [{ column: col, row: row }, { column: col, row: row + 1 }, { column: col, row: row + 2 }];
                return true;
            }
        }
    }

    // Check horizontal
    for (let row = 0; row < 6; row++) {
        //Check if all columns have a disc in this row
        if (columns[0][row] && columns[1][row] && columns[2][row]) {
            if (columns[0][row] === columns[1][row] && columns[1][row] === columns[2][row]) {
                winningSequence = [{ column: 0, row: row }, { column: 1, row: row }, { column: 2, row: row }];
                return true;
            }
        }
    }

    // Check diagonal (from bottom left to top right)
    for (let row = 0; row < 4; row++) {
        if (columns[0][row] && columns[1][row + 1] && columns[2][row + 2]) {
            if (columns[0][row] === columns[1][row + 1] && columns[1][row + 1] === columns[2][row + 2]) {
                winningSequence = [{ column: 0, row: row }, { column: 1, row: row + 1 }, { column: 2, row: row + 2 }];
                return true;
            }
        }
    }

    // Check diagonal (from bottom right to top left)
    for (let row = 0; row < 4; row++) {
        if (columns[2][row] && columns[1][row + 1] && columns[0][row + 2]) {
            if (columns[2][row] === columns[1][row + 1] && columns[1][row + 1] === columns[0][row + 2]) {
                winningSequence = [{ column: 2, row: row }, { column: 1, row: row + 1 }, { column: 0, row: row + 2 }];
                return true;
            }
        }
    }

    return false;
}

function getDiscPosition(disc) {
    const discElement = document.getElementsByClassName('column')[disc.column].getElementsByClassName('disc')[disc.row];
    const rect = discElement.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

function drawWinningLine(start, end) {
    return new Promise((resolve, reject) => {
        const line = document.createElement('div');
        line.className = 'winning-line';

        // Calculate the length and angle of the line
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        // Set the width, rotation, and position of the line
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = `${start.x}px`;
        line.style.top = `${start.y}px`;

        // Add the line to the game board
        document.getElementById('gameBoard').appendChild(line);
        resolve();
    });
}

function resetGame() {
    //reload the page
    location.reload();
}

// Update the current player
function updateCurrentPlayer() {
    const currentPlayerElement = document.getElementById('current-player');
    currentPlayerElement.textContent = currentPlayer;
}