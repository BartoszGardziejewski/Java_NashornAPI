print("Hello there from EASY enemy");

var AIFirstMove = function(board, size) {
    var xField;
    var yField;

    do {
        xField = Math.floor((Math.random() * (size-1)) + 1);
        yField = Math.floor((Math.random() * (size-1)) + 1);
    } while (board.isOccupied(xField,yField));

    return [xField, yField];
};

var AIMiddleMove = function(board, size) {
    return AIFirstMove(board,size);
};
