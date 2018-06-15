print("Hello there from MEDIUM enemy");

var AIFirstMove = function(board, size) {
    var xField;
    var yField;

    do {
        xField = Math.floor((Math.random() * (size-1)) + 1);
        yField = Math.floor((Math.random() * (size-1)) + 1);
    } while (board.isOccupied(xField,yField));

    return [xField, yField];
};

var AIMiddleMove = function(board, size){

    for (var i=0 ; i<size ; i++) {
        for (var j = 0; j < size; j++) {
            if (board.isEnemyField(i, j)) {
                if (i+1<size && !board.isOccupied(i+1, j)) {
                    return [i+1, j];
                }else if (i-1>=0 && !board.isOccupied(i-1, j)) {
                    return [i-1, j];
                }
                else if (j+1<size && !board.isOccupied(i, j+1)) {
                    return [i, j+1];
                }else if (j-1>=0 && !board.isOccupied(i, j-1)) {
                    return [i, j-1];
                }
                else if (i+1<size && j+1<size && !board.isOccupied(i+1, j+1)) {
                    return [i+1, j+1];
                }else if (i-1>=0 && j-1>=0 && !board.isOccupied(i-1, j-1)) {
                    return [i-1, j-1];
                }
                else if (j+1<size && j-1>=0 && !board.isOccupied(i+1, j-1)) {
                    return [i+1, j-1];
                }else if (j-1>=0 && j+1<size && !board.isOccupied(i-1, j+1)) {
                    return [i - 1, j+1];
                }
            }
        }
    }

    return AIFirstMove(board, size);
};