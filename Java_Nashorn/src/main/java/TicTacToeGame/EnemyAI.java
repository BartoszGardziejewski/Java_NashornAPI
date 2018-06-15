package TicTacToeGame;

import jdk.nashorn.api.scripting.JSObject;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collection;

public class EnemyAI {

    Invocable invocable;
    private int difficulty;
    String script;

    private boolean firsMove=true;

    public void setDifficulty(int level) throws FileNotFoundException, ScriptException {
        difficulty = level;
        switch (difficulty){
            case 0:
                script="easyAI";
                break;
            case 1:
                script="mediumAI";
                break;
            case 2:
                script="hardAI";
                break;

            default:
                script="easyAI";

        }
        ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
        engine.eval(new FileReader(getClass().getResource("JS/"+script+".js").getFile()) );
        invocable = (Invocable) engine;

    }

    public EnemyAI() throws FileNotFoundException, ScriptException, NoSuchMethodException {

        setDifficulty(0);

    }

    public void MakeMove(GameField[][] fields, int size) throws ScriptException, NoSuchMethodException {
        ArrayList<Integer> result = new ArrayList();

        if(firsMove) {
            JSObject obj = (JSObject) invocable.invokeFunction("AIFirstMove", new Board(fields), size);
            Collection colle = obj.values();
            for (Object o : colle) {
                result.add(((Double) o).intValue());
            }
            firsMove = false;

        }else {
            JSObject obj = (JSObject) invocable.invokeFunction("AIMiddleMove", new Board(fields), size);
            Collection colle = obj.values();
            for (Object o : colle) {
                result.add(((Double) o).intValue());
            }
        }


        fields[result.get(0)][result.get(1)].enemyMove();

    }

    public void reset(){
        firsMove = true;
    }

}
