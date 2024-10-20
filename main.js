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

    if (howLongWantToCheck === boardN) {
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
    }
    return isWin;
}
function diagcycles(board, boardN, howLongWantToCheck, mark, shift, direction) {

    let markCount = 0;
    let emptyCount = 0;
    let canWinCoord;
    let choosenParams = false;

    for (let i = 0; i < boardN; i++) {
        if (board[i][i * direction + shift] === mark) { // Main diagonal: top-left to bottom-right
            markCount++;
        } else if (board[i][i * direction + shift] === '.') {
            emptyCount++;
            canWinCoord = [i, i * direction + shift];
        }
    }

    if (markCount === howLongWantToCheck - 1 && emptyCount === 1) {
        choosenParams = canWinCoord;
    }
    return choosenParams;

}
function rowAndColcycles(board, boardN, howLongWantToCheck, mark, rowOrCol) {
    let canWinCoord;
    let choosenParams = false;
    for (let i = 0; i < boardN; i++) {
        let markCount = 0;
        let emptyCount = 0;
        for (let j = 0; j < boardN; j++) {
            if (rowOrCol === false) {
                let randomVariable = i;
                i = j;
                j = randomVariable;
            }
            if (board[i][j] == mark) {
                markCount++;
            } else if (board[i][j] == ".") {
                emptyCount++;
                canWinCoord = [i, j];
            }
        }
        if (markCount === howLongWantToCheck - 1 && emptyCount === 1) {
            choosenParams = canWinCoord;
        }
    }
    return choosenParams;
}

function getCleverParams(board, boardN, howLongWantToCheck, mark) {

    let windiag1 = diagcycles(board, boardN, howLongWantToCheck, mark, 0, 1);
    let windiag2 = diagcycles(board, boardN, howLongWantToCheck, mark, boardN - 1, -1);
    let winRow = rowAndColcycles(board, boardN, howLongWantToCheck, mark, true);
    let winCol = rowAndColcycles(board, boardN, howLongWantToCheck, mark, false);

    let listOfGoodChoises = [windiag1, windiag2, winRow, winCol];

    for (const element of listOfGoodChoises) {
        if (element !== false) {
            return element;
        }
    }

    return "nope";
}

console.log(getCleverParams([
    ["O", "O", "."],
    [".", "O", "."],
    [".", "O", "."]], 3, 3, "O"));

console.log(getCleverParams([
    ["O", ".", "O"],
    [".", ".", "."],
    [".", ".", "."]], 3, 3, "O"));

console.log(getCleverParams([
    ["O", ".", "."],
    [".", "O", "."],
    [".", "O", "O"]], 3, 3, "O"));

console.log(getCleverParams([
    [".", ".", "O", "O"],
    [".", "O", "O", "."],
    [".", "O", "O", "O"],
    [".", ".", "O", "."]], 4, 4, "O"));








