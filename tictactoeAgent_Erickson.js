// Tic Tac Toe
class EricksonAgent {
    constructor() {

    }

    minimax(board, wantMax) {
        var gameOver = board.gameOver();
        if (gameOver === 1) {
            return 1; // X
        } else if (gameOver === 2) {
            return -1; // O
        } else if (gameOver === 3) {
            return 0; // Draw
        }

        if (wantMax){
            var max = -Infinity;
            for (var i = 1; i <= board.cells.length; i++){
                if (board.cellFree(i)) {
                    var newBoard = board.clone();
                    newBoard.move(i);
                    max = Math.max(max, this.minimax(newBoard, false));
                }
            }
            return max;
        } else {
            var min = Infinity;
            for (var i = 1; i <= board.cells.length; i++){
                if (board.cellFree(i)) {
                    var newBoard = board.clone();
                    newBoard.move(i);
                    min = Math.min(min, this.minimax(newBoard, true));
                }
            }
            return min;
        }
    }

    selectMove(board) {
        // Define the initial best score and move
        var bestScore = board.playerOne ? -Infinity : Infinity;
        var bestMove = null;
        for (var i = 1; i <= board.cells.length; i++){
            if (board.cellFree(i)){
                var newBoard = board.clone();
                newBoard.move(i);
                var newScore = this.minimax(newBoard, !board.playerOne);
                if ((board.playerOne && newScore > bestScore) || (!board.playerOne && newScore < bestScore)){
                    bestScore = newScore;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }
}