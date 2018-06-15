print("Hello there from HARD enemy");

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

    var bestBargain=0;
    var currentBargain=0;

    var VCost = 0;
    var HCost = 0;
    var D1Cost = 0;
    var D2Cost = 0;

    var bestCost=0;

    var VProfit = 0;
    var HProfit = 0;
    var D1Profit = 0;
    var D2Profit = 0;

    var bestProfit=0;

    var finalX = -1;
    var finalY = -1;
    var x;
    var y;

/*
    for (var x=0 ; x < size ; x++) {
        for (var y = 0; y < size; y++) {

            if (!board.isEnemyField(x, y)) {

                i = x;
                j = y;
                count = 1;

                // VERTICAL
                for (i = x + 1; i < size && !board.isEnemyField(i, j); i++) {
                    count++;
                }
                for (i = x - 1; i >= 0 && !board.isEnemyField(i, j); i--) {
                    count++;
                }
                if (i < size && i >= 0 && bestCunt < count) {
                    bestCunt = count;
                    finalX = i;
                    finalY = j;
                }

                 i = x;
                 j = y;
                count = 1;

                // HORIZONTAL
                count = 1;
                for (j = y + 1; j < size && !board.isEnemyField(i, j); j++) {
                    count++;
                }
                for (j = y - 1; j >= 0 && !board.isEnemyField(i, j); j--) {
                    count++;
                }
                if (j < size && j >= 0 && bestCunt < count) {
                    bestCunt = count;
                    finalX = i;
                    finalY = j;
                }

                i = x;
                j = y;
                count = 1;

                // DIAGONAL \
                count = 1;
                for ( i = x + 1, j = y + 1; i < size && j < size && !board.isEnemyField(i, j); i++ , j++) {
                    count++;
                }
                for ( i = x - 1, j = y - 1; i >= 0 && j >= 0 && !board.isEnemyField(i, j); i-- , j--) {
                    count++;
                }
                if ( i < size && i >= 0 && j < size && j >= 0 && !board.isOccupied(i, j)  && bestCunt < count) {
                    bestCunt = count;
                    finalX = i;
                    finalY = j;
                }

                i = x;
                j = y;

                count = 1;

                // DIAGONAL /
                count = 1;
                for ( i = x + 1, j = y - 1; i < size && j >= 0 && !board.isEnemyField(i, j); i++ , j--) {
                    count++;
                }
                for ( i = x - 1, j = y + 1; i >= 0 && j < size && !board.isEnemyField(i, j); i-- , j++) {
                    count++;
                }
                if (i < size && i >= 0 && j < size && j >= 0 && bestCunt < count) {
                    bestCunt = count;
                    finalX = i;
                    finalY = j;
                }

            }else if (board.isEnemyField(i, j)) {

                i = x;
                j = y;

                count = 1;
                // VERTICAL
                for (i = x + 1; i < size && board.isEnemyField(i, j); i++) {
                    count++;
                }
                for (i = x - 1;
                     i >= 0 && board.isEnemyField(i, j); i--) {
                    count++;
                }
                if (i < size && i >= 0 && j < size && j >= 0 && bestCunt < count) {
                    bestCunt = count;
                    finalX = i;
                    finalY = j;
                }

                i = x;
                j = y;

                count = 1;
                // HORIZONTAL
                count = 1;
                for (j = y + 1; j < size && board.isEnemyField(i, j); j++) {
                    count++;
                }
                for (j = y - 1; j >= 0 && board.isEnemyField(i, j); j--) {
                    count++;
                }
                if (i < size && i >= 0 && j < size && j >= 0 && bestCunt < count) {
                    bestCunt = count;
                    finalX = i;
                    finalY = j;
                }

                i = x;
                j = y;

                count = 1;
                // DIAGONAL \
                count = 1;
                for (i = x + 1, j = y + 1;
                     i < size && j < size && board.isEnemyField(i, j); i++ , j++) {
                    count++;
                }
                for (i = x - 1, j = y - 1; i >= 0 && j >= 0 && board.isEnemyField(i, j); i-- , j--) {
                    count++;
                }
                if (i < size && i >= 0 && j < size && j >= 0 && bestCunt < count) {
                    bestCunt = count;
                    finalX = i;
                    finalY = j;
                }

                i = x;
                j = y;

                count = 1;

                // DIAGONAL /
                count = 1;
                for (i = x + 1, j = y - 1; i < size && j >= 0 && board.isEnemyField(i, j); i++ , j--) {
                    count++;
                }
                for (i = x - 1, j = y + 1; i >= 0 && j < size && board.isEnemyField(i, j); i-- , j++) {
                    count++;
                }
                if (i < size && i >= 0 && j < size && j >= 0 && bestCunt < count) {
                    bestCunt = count;
                    finalX = i;
                    finalY = j;
                }
            }
        }
    }*/

    for (var i = 0 ; i < size ; i++) {
        for (var j = 0; j < size; j++) {
            if ( !board.isOccupied(i, j) ) {

                bestCost=0;
                bestProfit=0;
                currentBargain = 0;

                // VERTICAL
                VCost = VerticalCost(i,j,board,size);
                if (bestCost < VCost) bestCost=VCost;

                VProfit = VerticalProfit(i,j,board,size);
                if (bestProfit < VProfit)  bestProfit=VProfit;

                // HORIZONTAL
                HCost = HorizontalCost(i,j,board,size);
                if (bestCost < HCost) bestCost=HCost;
                HProfit = HorizontalProfit(i,j,board,size);
                if (bestProfit < HProfit)  bestProfit=HProfit;

                // DIAGONAL \
                D1Cost = Diagonal1Cost(i,j,board,size);
                if (bestCost < D1Cost) bestCost=D1Cost;
                D1Profit = Diagonal1Profit(i,j,board,size);
                if (bestProfit < D1Profit)  bestProfit=D1Profit;

                // DIAGONAL /
                D2Cost = Diagonal2Cost(i,j,board,size);
                if (bestCost < D2Cost) bestCost=D2Cost;
                D2Profit = Diagonal2Profit(i,j,board,size);
                if (bestProfit < D2Profit)  bestProfit=D2Profit;

                currentBargain = bestProfit + bestCost;

                if (bestBargain < currentBargain) {
                    bestBargain = currentBargain;
                    finalX = i;
                    finalY = j;
                }
            }

        }
    }

    if(finalX ==-1 || finalY==-1)
    {
        return AIFirstMove(board,size);
    }

    return [finalX, finalY];
};


var VerticalCost = function(i,j,board,size){

    var count = 0;
    var bargain = 0;
    var x=i;
    var y=j;

    for ( x = i + 1; x < size && board.isOccupied(x, y) && !board.isEnemyField(x, y); x++) {
        count++;
        bargain += count;
    }
    for ( x = i - 1; x >= 0 && board.isOccupied(x, y) && !board.isEnemyField(x, y); x--) {
        count++;
        bargain += count;
    }

    return bargain;
};

var HorizontalCost = function(i, j, board, size){

    var count = 0;
    var bargain = 0;
    var x=i;
    var y=j;

    for ( y = j + 1; y < size && board.isOccupied(x, y) && !board.isEnemyField(x, y); y++) {
        count++;
        bargain += count;
    }
    for ( y = j - 1; y >= 0 && board.isOccupied(x, y) && !board.isEnemyField(x, y); y--) {
        count++;
        bargain += count;
    }

    return bargain;
};

var Diagonal1Cost = function(i, j, board, size){

    var count = 0;
    var bargain = 0;
    var x=i;
    var y=j;

    for ( y = j + 1 , x = i + 1; y < size && x < size && board.isOccupied(x, y) && !board.isEnemyField(x, y); y++ , x++) {
        count++;
        bargain += count;
    }
    for ( y = j - 1 , x = i - 1; y >= 0 && x >= 0 && board.isOccupied(x, y) && !board.isEnemyField(x, y); y-- , x--) {
        count++;
        bargain += count;
    }

    return bargain;
};

var Diagonal2Cost = function(i, j, board, size){

    var count = 0;
    var bargain = 0;
    var x=i;
    var y=j;

    for ( y = j + 1 , x = i - 1; y < size && x >= 0 && board.isOccupied(x, y) && !board.isEnemyField(x, y); y++ , x--) {
        count++;
        bargain += count;
    }
    for ( y = j - 1 , x = i + 1; y >= 0 && x < size && board.isOccupied(x, y) && !board.isEnemyField(x, y); y-- , x++) {
        count++;
        bargain += count;
    }

    return bargain;
};

var VerticalProfit = function(i,j,board,size){

    var count = 0;
    var bargain = 0;
    var x=i;
    var y=j;

    for ( x = i + 1; x < size && board.isOccupied(x, y) && board.isEnemyField(x, y); x++) {
        count++;
        bargain += count;
    }
    for ( x = i - 1; x >= 0 && board.isOccupied(x, y) && board.isEnemyField(x, y); x--) {
        count++;
        bargain += count;
    }

    return bargain;
};

var HorizontalProfit = function(i, j, board, size){

    var count = 0;
    var bargain = 0;
    var x=i;
    var y=j;

    for ( y = j + 1; y < size && board.isOccupied(x, y) && board.isEnemyField(x, y); y++) {
        count++;
        bargain += count;
    }
    for ( y = j - 1; y >= 0 && board.isOccupied(x, y) && board.isEnemyField(x, y); y--) {
        count++;
        bargain += count;
    }

    return bargain;
};

var Diagonal1Profit = function(i, j, board, size){

    var count = 0;
    var bargain = 0;
    var x=i;
    var y=j;

    for ( y = j + 1 , x = i + 1; y < size && x < size && board.isOccupied(x, y) && board.isEnemyField(x, y); y++ , x++) {
        count++;
        bargain += count;
    }
    for ( y = j - 1 , x = i - 1; y >= 0 && x >= 0 && board.isOccupied(x, y) && board.isEnemyField(x, y); y-- , x--) {
        count++;
        bargain += count;
    }

    return bargain;
};

var Diagonal2Profit = function(i, j, board, size){

    var count = 0;
    var bargain = 0;
    var x=i;
    var y=j;

    for ( y = j + 1 , x = i - 1; y < size && x >= 0 && board.isOccupied(x, y) && board.isEnemyField(x, y); y++ , x--) {
        count++;
        bargain += count;
    }
    for ( y = j - 1 , x = i + 1; y >= 0 && x < size && board.isOccupied(x, y) && board.isEnemyField(x, y); y-- , x++) {
        count++;
        bargain += count;
    }

    return bargain;
};