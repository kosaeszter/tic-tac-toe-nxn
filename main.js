import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

function getEmptyBoard(N) {
    let emptyarray = [];
    for (let i = 0; i < N; i++) {
        emptyarray.push([]);
        for (let j = 0; j < N; j++) {
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

function checkSubMatrixIsWon(board, n, mark, matrixRowShift, matrixColShift) {
    // Check rows and columns
    for (let i = 0; i < n; i++) {
        let rowMarkCount = 0;
        let colMarkCount = 0;
        for (let j = 0; j < n; j++) {
            if (board[i + matrixRowShift][j + matrixColShift] == mark) {  // Rows
                rowMarkCount++;
            }
            if (board[j + matrixRowShift][i + matrixColShift] == mark) {  // Columns
                colMarkCount++;
            }
        }
        if (rowMarkCount == n || colMarkCount == n) {
            return true;
        }
    }

    let diagFirstCount = 0;
    let diagSecondCount = 0;
    for (let i = 0; i < n; i++) {
        if (board[i + matrixRowShift][i + matrixColShift] == mark) {
            diagFirstCount++;
        }
        if (board[i + matrixRowShift][n - i - 1 + matrixColShift] == mark) {
            diagSecondCount++;
        }
    }
    if (diagFirstCount == n || diagSecondCount == n) {
        return true;
    }
    return false;
}

function checkBoardIsWon(board, N, n, mark){
    let maxRowShift=N-n+1;
    let maxColShift=N-n+1;
    for (let i = 0; i < maxRowShift; i++) {
        for (let j = 0; j < maxColShift; j++) {
            if (checkSubMatrixIsWon(board, n, mark, i, j)){
                return true;
            }
        }
    }
    return false;
}

function aiCoordsInSubMatrix(board, n, mark, isRowCheck, matrixRowShift, matrixColShift){

        let canWinCoord;
        let choosenParams = false;

        for (let i = 0; i < n; i++) {
            let markCount = 0;
            let emptyCount = 0;
            for (let j = 0; j < n; j++) {
                if (isRowCheck === false) {
                    let randomVariable = i;
                    i = j;
                    j = randomVariable;
                }
                if (board[i+matrixRowShift][j+matrixColShift] == mark) {
                    markCount++;
                } else if (board[i+matrixRowShift][j+matrixColShift] == ".") {
                    emptyCount++;
                    canWinCoord = [i+matrixRowShift, j+matrixColShift];
                }
            }
            if (markCount === n - 1 && emptyCount === 1) {
                choosenParams = canWinCoord;
                return choosenParams;
            }
        }
        return false;
}

console.log(aiCoordsInSubMatrix([
    [".", ".", "."],
    [".", "O", "O"],
    [".", ".", "O"]], 3,"O", false, 0, 0));


/*

function diagcycles(board, boardN, howLongWantToCheck, mark, shiftToDiag2, direction) {

    let markCount = 0;
    let emptyCount = 0;
    let canWinCoord;
    let choosenParams = false;

    for (let i = 0; i < boardN; i++) {
        if (board[i][i * direction + shiftToDiag2] === mark) { // Main diagonal: top-left to bottom-right
            markCount++;
        } else if (board[i][i * direction + shiftToDiag2] === '.') {
            emptyCount++;
            canWinCoord = [i, i * direction + shiftToDiag2];
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
    [".", ".", "O", "."]], 4, 4, "O")); */ 
    








