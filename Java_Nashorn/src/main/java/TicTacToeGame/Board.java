package TicTacToeGame;

import javafx.scene.control.Button;
import javafx.scene.text.Font;

public class Board {

    GameField[][] fields;

    public Board(GameField[][] fields){
        this.fields = fields;
    }

    public boolean isOccupied(int x, int y){
        return fields[x][y].isOccupied();
    }

    public boolean isEnemyField(int x, int y){
        return fields[x][y].mark == OX.X;
    }

}


enum OX{
    O,
    X
}

class GameField extends Button {

    OX mark = null;
    int x,y;
    BoardController controller;

    GameField(BoardController controller,int x, int y){
        this.x = x;
        this.y = y;

        this.controller = controller;
        this.setMinSize(100,100);
        this.setPrefSize(100,100);
        this.setMaxSize(Double.MAX_VALUE,Double.MAX_VALUE);
        this.setFont(new Font(40));
    }

    public void clearField(){
        mark = null;
        this.setText("");
    }

    public boolean isOccupied(){
        return mark != null;
    }

    public void enemyMove(){
        mark = OX.X;
        this.setText("X");
        controller.manager.endTurn(x,y);
    }

    public void playerMove(){
        if ( controller.manager.getCurrentTurn()) {
            if (mark == null) {
                mark = OX.O;
                this.setText("O");
                controller.manager.endTurn(x,y);
            } else {
                System.out.print("this field is occupied");
            }
        }
    }

    @Override
    public void fire() {
        super.fire();
        playerMove();
    }
}