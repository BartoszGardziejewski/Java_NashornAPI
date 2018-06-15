package TicTacToeGame;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

import javax.script.ScriptException;
import java.io.FileNotFoundException;

public class BoardManager extends Application{

    private int countToWin=5;
    private int tournsCount=0;
    private BoardController controller;
    private Stage primaryStage;
    private EnemyAI enemy;
    private int size = 8;
    private boolean PlayerFirst = true;
    private boolean isPlayerTurn = PlayerFirst;
    private boolean game=true;
    private OX potentialWinner;

    public boolean getCurrentTurn(){
        return isPlayerTurn;
    }

    public void endTurn(int x, int y){
        tournsCount++;
        if(tournsCount == size*size){
            System.out.println("tie");
            isPlayerTurn = false;
            game = false;
        }else {
            if (isWinner(x,y)){
                System.out.println(potentialWinner.toString()+" wines :)");
                isPlayerTurn = false;
                game = false;
            }else {
                isPlayerTurn = !isPlayerTurn;
                if(!isPlayerTurn){
                    try {
                        enemy.MakeMove(controller.getFields(),size);
                    } catch (ScriptException e) {
                        e.printStackTrace();
                    } catch (NoSuchMethodException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    public void setDifficulty(int dificulty){
        try {
            enemy.setDifficulty(dificulty);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (ScriptException e) {
            e.printStackTrace();
        }
    }

    private boolean isWinner(int x, int y){
        GameField[][] fields = controller.getFields();
        potentialWinner = fields[x][y].mark;


        int count = 1;

        // VERTICAL
        for (int i=x+1 ; i<size && fields[x][y].mark == fields[i][y].mark ; i++){
            count++;
            if (count>=countToWin){
                return true;
            }
        }
        for (int i=x-1 ; i>=0 && fields[x][y].mark == fields[i][y].mark ; i--){
            count++;
            if (count>=countToWin){
                return true;
            }
        }

        // HORIZONTAL
        count = 1;
        for (int i=y+1 ; i<size && fields[x][y].mark == fields[x][i].mark ; i++){
            count++;
            if (count>=countToWin){
                return true;
            }
        }
        for (int i=y-1 ; i>=0 && fields[x][y].mark == fields[x][i].mark ; i--){
            count++;
            if (count>=countToWin){
                return true;
            }
        }

        // DIAGONAL \
        count = 1;
        for (int i=x+1 , j=y+1; i<size && j<size && fields[x][y].mark == fields[i][j].mark ; i++ , j++){
            count++;
            if (count>=countToWin){
                return true;
            }
        }
        for (int i=x-1 , j=y-1; i>=0 && j>=0 &&  fields[x][y].mark == fields[i][j].mark ; i-- , j--){
            count++;
            if (count>=countToWin){
                return true;
            }
        }

        // DIAGONAL /
        count = 1;
        for (int i=x+1 , j=y-1; i<size && j>=0 && fields[x][y].mark == fields[i][j].mark ; i++ , j--){
            count++;
            if (count>=countToWin){
                return true;
            }
        }
        for (int i=x-1 , j=y+1; i>=0 && j<size &&  fields[x][y].mark == fields[i][j].mark ; i-- , j++){
            count++;
            if (count>=countToWin){
                return true;
            }
        }
        return false;
    }

    public void restartGame(){

        PlayerFirst = !PlayerFirst;

        enemy.reset();
        tournsCount=0;
        game=true;

        isPlayerTurn = PlayerFirst;
        if(!PlayerFirst){
            try {
                enemy.MakeMove(controller.getFields(),size);
            } catch (ScriptException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void start(Stage stage) {
        primaryStage = stage;
        FXMLLoader loader = new FXMLLoader();
        loader.setLocation(getClass().getResource("FXML/Board.fxml"));

        try{

            double WindowSize=25+size*105;
            Parent root = loader.load();

            controller = loader.getController();
            controller.manager = this;
            controller.windowSize = WindowSize;

            primaryStage.setTitle(" Hallo window ");
            primaryStage.setScene(new Scene(root,WindowSize,WindowSize));
            primaryStage.show();

        }catch (Exception e){
            e.printStackTrace();
        }


        try {
            enemy = new EnemyAI();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (ScriptException e) {
            e.printStackTrace();
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }

        controller.createBoard(size);

        if(!PlayerFirst){
            try {
                enemy.MakeMove(controller.getFields(),size);
            } catch (ScriptException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            }
        }

    }

    static public void main(String... args){
       launch(args);
    }

}
