print("Hello there from your enemy");

var AImove = function(board, size) {
    var xField;
    var yField;

    do {
        xField = Math.floor((Math.random() * (size-1)) + 1);
        yField = Math.floor((Math.random() * (size-1)) + 1);
    } while (board.isOccupied(xField,yField));

    return [xField, yField];
};

var goodbye = function(board_state) {
};