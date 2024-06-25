function solveSudoku() {
    const puzzle = [];
    for (let i = 0; i < 9; i++) {
        puzzle[i] = [];
        for (let j = 0; j < 9; j++) {
            const cell = document.getElementById(`cell-${i}-${j}`);
            puzzle[i][j] = cell.value ? parseInt(cell.value) : 0;
        }
    }

    if (solveSudokuHelper(puzzle)) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.getElementById(`cell-${i}-${j}`);
                cell.value = puzzle[i][j];
            }
        }
    } else {
        alert("No solution exists for this puzzle.");
    }
}

function solveSudokuHelper(board) {
    const emptyLocation = findEmptyLocation(board);
    if (!emptyLocation) {
        return true;
    }

    const [row, col] = emptyLocation;
    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudokuHelper(board)) {
                return true;
            }
            board[row][col] = 0;
        }
    }

    return false;
}

function findEmptyLocation(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}

function isSafe(board, row, col, num) {
    return !usedInRow(board, row, num) &&
           !usedInCol(board, col, num) &&
           !usedInBox(board, row - row % 3, col - col % 3, num);
}

function usedInRow(board, row, num) {
    return board[row].includes(num);
}

function usedInCol(board, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return true;
        }
    }
    return false;
}

function usedInBox(board, boxStartRow, boxStartCol, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + boxStartRow][j + boxStartCol] === num) {
                return true;
            }
        }
    }
    return false;
}

// Dynamically generate the Sudoku grid
const sudokuDiv = document.getElementById('sudoku');
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const bigBox = document.createElement('div');
        bigBox.className = 'big-box';

        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                const row = i * 3 + k;
                const col = j * 3 + l;
                const input = document.createElement('input');
                input.id = `cell-${row}-${col}`;
                input.type = 'text';
                input.maxLength = 1;
                input.className = 'cell';
                bigBox.appendChild(input);
            }
        }
        sudokuDiv.appendChild(bigBox);
    }
}
