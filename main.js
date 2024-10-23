import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

//ai diagCheck!!!!!!!!

const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  
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

function showBoard(board, N) {

    let header = "  " + alphabet.slice(0, N).join(" ");
    console.log(header);

    for (let i = 0; i < N; i++) {
        let row = (i + 1) + " " + board[i].join(" ");
        console.log(row);
    }
}

function isBoardFull(board) {  // [[".", "."], [".", "."]]
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

function checkBoardIsWon(board, N, n, mark) {
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

function aiCoordsInSubMatrixRowCol(board, n, mark, isRowCheck, matrixRowShift, matrixColShift) {

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
        }
    }
    let randomINdex = Math.floor(Math.random() * possibilities.length)
    return possibilities[randomINdex];
}

function updateBoard(board, coord, mark){
    let i=coord[0];
    let j=coord[1];
    if (board[i][j] === ".") {
        board[i][j]=mark;
    }
    return false;
}

function makeIndexFromChar(userinput, N){
    for (let i = 0; i < N; i++) {
        if (alphabet[i]==userinput[0]){
            return [userinput[1]-1, i]
        }     
    }
    return false;
}

function gameFlow() {

    let N = prompt("N?")
    let n = prompt("n")

    let firstPlayer;
    let secondPlayer;

    while (!(firstPlayer == "human" || firstPlayer == "ai")) {
        firstPlayer = prompt("Who is the first player? Human, AI: ").toLowerCase();
    }

    while (!(secondPlayer == "human" || secondPlayer == "ai")) {
        secondPlayer = prompt("Who is the second player? human, AI: ").toLowerCase();
    }

    let whoPlays=[firstPlayer, secondPlayer];
    const playerMark = ["X", "O"];

    let playerIndex = 0;

    let board = getEmptyBoard(N);

    showBoard(getEmptyBoard(N), N)

    for (let index = 0; index < N*N; index++) { 
        if (whoPlays[playerIndex]=="human") {
         let humanCord =prompt("Pls Give me a coord ")
         updateBoard(board, makeIndexFromChar(humanCord, N), playerMark[playerIndex])
        }
        showBoard(board, N);
        playerIndex = (playerIndex + 1) % 2;
    }

    /*if (checkBoardIsWon(board, N, n, playerMark[playerIndex])) {
        console.log(`${playerMark[playerIndex]} won!`);
    }
    if (isBoardFull(board)) {
        console.log("Board is full, it's a tie!");
    }*/
}

gameFlow()

/*
console.log(updateBoard([
    [".", "O", "."],
    ["O", "O", "."],
    [".", ".", "."]], [1,1],  "X")); */
/*
console.log(getEmptyBoard(5))
console.log(isBoardFull([
    ["O", ".", "."],
    [".", "O", "."],
    [".", ".", "."]]))

console.log(checkBoardIsWon([
    [".", ".", "."],
    [".", "O", "."],
    [".", ".", "O"]], 3, 2, "O"));

console.log(aiCoordsInSubMatrix([
    [".", ".", "."],
    [".", ".", "O"],
    [".", "O", "O"]], 3, "O", false, 0, 0));
*/

/*
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









