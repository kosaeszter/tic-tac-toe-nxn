import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

function getEmptyBoard(n) {
    let emptyarray = [];
    for (let i = 0; i < n; i++) {
        emptyarray.push([]);
        for (let j = 0; j < n; j++) {
            emptyarray[i][j] = ".";
        }
    }
    return emptyarray;
}

function isBoardFull(board) {
    for (const row of board) {
        if (row.includes(".")) {
            return false;
        }
    }
    return true;
}

function checkIsSomebodyWon(board, boardN, howLongWantToCheck, mark) {
    let isWin = false;

    // Check rows and columns
    for (let i = 0; i < boardN; i++) {
        let rowMarkCount = 0;
        let colMarkCount = 0;
        for (let j = 0; j < boardN; j++) {
            if (board[i][j] == mark) {  // Rows
                rowMarkCount++;
            }
            if (board[j][i] == mark) {  // Columns
                colMarkCount++;
            }
        }
        if (rowMarkCount == howLongWantToCheck || colMarkCount == howLongWantToCheck) {
            return true;
        }
    }

    // Check main diagonals (only if howLongWantToCheck == boardN)
    let diagFirstCount = 0;
    let diagSecondCount = 0;
    for (let i = 0; i < boardN; i++) {
        if (board[i][i] == mark) { // Main diagonal: top-left to bottom-right
            diagFirstCount++;
        }
        if (board[i][boardN - i - 1] == mark) { // Main diagonal: top-right to bottom-left
            diagSecondCount++;
        }
    }
    if (diagFirstCount == howLongWantToCheck || diagSecondCount == howLongWantToCheck) {
        return true;
    }

    //check oother diag
    if (howLongWantToCheck < boardN) {
        for (let startRow = 0; startRow <= boardN - howLongWantToCheck; startRow++) {
            for (let startCol = 0; startCol <= boardN - howLongWantToCheck; startCol++) {
                let diagCountLR = 0;
                let diagCountRL = 0;
                for (let i = 0; i < howLongWantToCheck; i++) {
                    if (board[startRow + i][startCol + i] == mark) {
                        diagCountLR++;
                    }
                    if (board[startRow + i][startCol + (howLongWantToCheck - i - 1)] == mark) {
                        diagCountRL++;
                    }
                }
                if (diagCountLR == howLongWantToCheck || diagCountRL == howLongWantToCheck) {
                    return true;
                }
            }
        }
    }
    return false;
}

console.log(checkIsSomebodyWon([[".", ".", "."], [".", "O", "."], [".", "O", "."]], 3, 2, "O"));
console.log(checkIsSomebodyWon([["O", "O", "O"], [".", ".", "."], [".", ".", "."]], 3, 3, "O"));
console.log(checkIsSomebodyWon([["O", ".", "."], ["O", ".", "."], ["O", ".", "."]], 3, 3, "O"));  
