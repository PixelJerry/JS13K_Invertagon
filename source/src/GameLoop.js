// GameLoop.js

function GameLoop()
{
    requestAnimation(GameLoop);

    MainGame.input();
    MainGame.update();
    MainGame.render();
}