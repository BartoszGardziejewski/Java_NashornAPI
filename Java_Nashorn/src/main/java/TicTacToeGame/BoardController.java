package TicTacToeGame;

import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.control.Button;
import javafx.scene.control.MenuButton;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Font;

public class BoardController {

    public BorderPane mainBoard;
    public AnchorPane anchorPane;
    public MenuButton DifficultyLevel;
    public BoardManager manager;
    public GridPane BoardGrid;
    public GameField[][] BoardFields;
    public double windowSize;

    private int size;

    public void DifficultySetEasy(){
        manager.setDifficulty(0);
        DifficultyLevel.setText("Easy");
    }

    public void DifficultySetMedium(){
        manager.setDifficulty(1);
        DifficultyLevel.setText("Medium");
    }

    public void DifficultySetHard(){
        manager.setDifficulty(2);
        DifficultyLevel.setText("Hard");
    }

    public void restartGame(){
        for (int i=0 ; i<size ; i++){
            for (int j=0 ; j<size ; j++){
                BoardFields[i][j].clearField();
            }
        }

        manager.restartGame();
    }

    public GameField[][] getFields(){
        return BoardFields;
    }

    public void createBoard(int size){

        this.size = size;

        BoardGrid = new GridPane();
        BoardFields = new GameField[size][size];


        anchorPane.setPrefSize(windowSize,windowSize);

        double BoardGridSize=Double.MAX_VALUE;
        //BoardGrid.setPrefSize(BoardGridSize,BoardGridSize);
        BoardGrid.setMaxSize(BoardGridSize,BoardGridSize);
        BoardGrid.setStyle("-fx-background-color: grey; ");
        BoardGrid.setPadding(new Insets(2));
        BoardGrid.setHgap(2);
        BoardGrid.setVgap(2);


        for (int k=0 ; k<size ; k++) {
            BoardGrid.addColumn(k);
        }for (int k=1 ; k<size ; k++) {
            BoardGrid.addRow(k);
        }

        for (int i=0 ; i<size ; i++){
            for (int j=0 ; j<size ; j++){
                BoardFields[i][j] = new GameField(this,i,j);
                BoardGrid.add(BoardFields[i][j] , i, j);
            }
        }
        BoardGrid.setAlignment(Pos.CENTER);
        mainBoard.setCenter(BoardGrid);

    }
}
