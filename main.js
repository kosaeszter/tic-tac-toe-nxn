import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

//ai diagCheck!!!!!!!! -----> OK
//+ userinput validation

const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

function getEmptyBoard(N) { //OK
    let emptyarray = [];
    for (let i = 0; i < N; i++) {
        emptyarray.push([]);
        for (let j = 0; j < N; j++) {
            emptyarray[i][j] = ".";
        }
    }
    return emptyarray;
}
//console.log(getEmptyBoard(5));


function showBoard(board, N) { //OK

    let header = "  " + alphabet.slice(0, N).join(" ");
    console.log(header);

    for (let i = 0; i < N; i++) {
        let row = (i + 1) + " " + board[i].join(" ");
        console.log(row);
    }
}
//showBoard(getEmptyBoard(5), 5)


function isBoardFull(board) { //OK
    for (const row of board) {
        if (row.includes(".")) {
            return false;
        }
    }
    return true;
}
//console.log(isBoardFull([["X", ".", "X"], ["X", "X", "X"], ["X", "X", "X"]]))


function checkSubMatrixIsWon(board, n, mark, matrixRowShift, matrixColShift) { //OK
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
//console.log(checkSubMatrixIsWon([["X", ".", "O"], [".", ".", "O"], [".", "X", "X"]], 2, "X", 1, 1))


function checkBoardIsWon(board, N, n, mark) { //OK
    let maxRowShift = N - n + 1;
    let maxColShift = N - n + 1;
    for (let i = 0; i < maxRowShift; i++) {
        for (let j = 0; j < maxColShift; j++) {
            if (checkSubMatrixIsWon(board, n, mark, i, j)) {
                return true;
            }
        }
    }
    return false;
}
//console.log(checkBoardIsWon([["X", "X", ""], [".", ".", "."], [".", ".", "."]], 3, 2, "X"))


function aiCoordsInSubMatrixRowCol(board, n, mark, isRowCheck, matrixRowShift, matrixColShift) { //OK

    let canWinCoord;
    let choosenParams = false;

    for (let i = 0; i < n; i++) {
        let markCount = 0;
        let emptyCount = 0;
        for (let j = 0; j < n; j++) {
            let rowINdex;
            let colIndex;
            if (isRowCheck === false) {   // row board[i][j] col: board[j][i]
                rowINdex = i;
                colIndex = j;
            } else {
                rowINdex = j;
                colIndex = i;
            }
            if (board[rowINdex + matrixRowShift][colIndex + matrixColShift] == mark) {
                markCount++;
            } else if (board[rowINdex + matrixRowShift][colIndex + matrixColShift] == ".") {
                emptyCount++;
                canWinCoord = [rowINdex + matrixRowShift, colIndex + matrixColShift];
            }
        }
        if (markCount === n - 1 && emptyCount === 1) {
            choosenParams = canWinCoord;
            return choosenParams;
        }
    }
    return false;
}
//console.log(aiCoordsInSubMatrixRowCol([["X", "X", "."], [".", "X", "."], [".", ".", "."]], 3, "X", false, 0, 0))


function aiCoordsInSubMatrixDiag1(board, n, mark, matrixRowShift, matrixColShift) { //OK
    let canWinCoord;
    let choosenParams = false;

    let markCount = 0;
    let emptyCount = 0;
    for (let i = 0; i < n; i++) {
        if (board[i + matrixRowShift][i + matrixColShift] == mark) {
            markCount++;
        } else if (board[i + matrixRowShift][i + matrixColShift] == ".") {
            emptyCount++
            canWinCoord = [i + matrixRowShift, i + matrixColShift];
        }
    }
    if (markCount === n - 1 && emptyCount === 1) {
        choosenParams = canWinCoord;
        return choosenParams;
    }
    return false;
}
//console.log(aiCoordsInSubMatrixDiag1([["X", ".", "."], [".", "X", "."], [".", ".", "."]], 3, "X", 0, 0))


function aiCoordsInSubMatrixDiag2(board, n, mark, matrixRowShift, matrixColShift) {
    let canWinCoord;
    let choosenParams = false;
    let markCount = 0;
    let emptyCount = 0;

    for (let i = 0; i < n; i++) {
        if (board[i + matrixRowShift][n - i - 1 + matrixColShift] == mark) {
            markCount++;
        } else if (board[i + matrixRowShift][n - i - 1 + matrixColShift] == ".") {
            emptyCount++
            canWinCoord = [i + matrixRowShift, n - i - 1 + matrixColShift];
        }
    }

    if (markCount === n - 1 && emptyCount === 1) {
        choosenParams = canWinCoord;
        return choosenParams;
    }

    return false;
}
//console.log(aiCoordsInSubMatrixDiag2([[".", ".", "X"], [".", "X", "."], [".", ".", "."]], 3, "X", 0, 0))


function aiCoordsFullBoard(board, N, n, mark) {
    let maxRowShift = N - n + 1;
    let maxColShift = N - n + 1;
    let possibilities = [];

    for (let i = 0; i < maxRowShift; i++) {
        for (let j = 0; j < maxColShift; j++) {
            if (aiCoordsInSubMatrixRowCol(board, n, mark, true, i, j) !== false) {
                possibilities.push(aiCoordsInSubMatrixRowCol(board, n, mark, true, i, j));
            }
            if (aiCoordsInSubMatrixRowCol(board, n, mark, false, i, j) !== false) {
                possibilities.push(aiCoordsInSubMatrixRowCol(board, n, mark, false, i, j));
            }
            if (aiCoordsInSubMatrixDiag1(board, n, mark, i, j) !== false) {
                possibilities.push(aiCoordsInSubMatrixDiag1(board, n, mark, i, j));
            }
            if (aiCoordsInSubMatrixDiag2(board, n, mark, i, j) !== false) {
                possibilities.push(aiCoordsInSubMatrixDiag2(board, n, mark, i, j));
            }
        }
    }

    if (possibilities.length !== 0) {
        let randomINdex = Math.floor(Math.random() * possibilities.length);
        return possibilities[randomINdex];

    } else {
        return false;
    }
}
//console.log(aiCoordsFullBoard([["X", "X", "."],[".", "X", "."],[".", ".", "."]], 3, 3, "X"))


function randomAiCoord(board, N, mark) {
    let randomCoord;
    do {
        randomCoord = [Math.floor(Math.random() * N), Math.floor(Math.random() * N)];
    } while (updateBoard(board, randomCoord, mark) == false);
    return randomCoord;
}
//console.log(randomAiCoord([[".", "X", "X"],["X", "X", "X"], ["X", "X", "X"]], 3, "X"));

function updateBoard(board, coord, mark) {
    let i = coord[0];
    let j = coord[1];
    if (board[i][j] === ".") {
        board[i][j] = mark;
        return true;
    }
    return false;
}

function makeIndexFromChar(userinput, N) {
    for (let i = 0; i < N; i++) {
        if (alphabet[i] == userinput[0]) {
            return [userinput[1] - 1, i]
        }
    }
    return false;
}
//console.log(makeIndexFromChar("D3", 6))

function thisIsPureHapinessss() {
    let N = parseInt(prompt("Board size (N): "));
    let n = parseInt(prompt("Win condition size (n): "));

    let firstPlayer;
    let secondPlayer;

    while (!(firstPlayer == "human" || firstPlayer == "ai")) {
        firstPlayer = prompt("Who is the first player? (human/ai): ").toLowerCase();
    }

    while (!(secondPlayer == "human" || secondPlayer == "ai")) {
        secondPlayer = prompt("Who is the second player? (human/ai): ").toLowerCase();
    }

    let whoPlays = [firstPlayer, secondPlayer];
    const playerMark = ["X", "O"];

    let playerIndex = 0;

    let board = getEmptyBoard(N);
    showBoard(board, N);

    while (!isBoardFull(board)) {
        console.log(`Player ${playerMark[playerIndex]}'s turn!`);

        if (whoPlays[playerIndex] == "human") {
            let humanCoord;
            let coord;
            do {
                humanCoord = prompt("Enter coordinates: ");
                coord = makeIndexFromChar(humanCoord, N);
            } while (!coord || !updateBoard(board, coord, playerMark[playerIndex]));
            console.clear();
        } else {
            let aiCoord = aiCoordsFullBoard(board, N, n, playerMark[playerIndex]);
            let preventAiCoord = aiCoordsFullBoard(board, N, n, playerMark[(playerIndex + 1) % 2]);
            let randomCoord = randomAiCoord(board, N, playerMark[playerIndex]);

            let chosenCoord;

            if (aiCoord) {
                chosenCoord = aiCoord;  // AI győzelmi lépése
            } else if (preventAiCoord) {
                chosenCoord = preventAiCoord;  // AI védekezési lépése
            } else {
                chosenCoord = randomCoord;  // AI véletlenszerű lépése
            }
            console.clear();
            updateBoard(board, chosenCoord, playerMark[playerIndex]);

        }
        showBoard(board, N);

        if (checkBoardIsWon(board, N, n, playerMark[playerIndex])) {
            console.log(`${playerMark[playerIndex]} won!`);
            return;
        }
        playerIndex = (playerIndex + 1) % 2;
    }
    console.log("It's a tie! The board is full.");
}

thisIsPureHapinessss()










