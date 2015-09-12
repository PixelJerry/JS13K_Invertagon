// Message.js

var Message = {
	active: false,
	boxTopLeft: new Point(162, 170),
	boxWidth: 700,
	boxHeight: 200,
	nextLevel: false,
	partTwo: false,

	displayMessage: function(messageString){
		// 
		if (!this.active)
		{
			this.active = true;
		}
	},
	destroyMessage: function(){
		if (!this.partTwo)
		{
			this.partTwo = true;
			return;
		}
		if (this.active)
		{
			this.active = false;

			if (this.nextLevel)
			{
				GameMap.loadNextLevel();
				this.nextLevel = false;
			}
		}
	},
	completeMessage: function(){
		this.displayMessage();

		this.nextLevel = true;
	},
	startMessage: function(){
		// Show this message at stage one
		if (LevelBuilder.currentLevel <= 4)
		{
			this.displayMessage();
		}
	},
	draw: function(){
		if (this.active)
		{
			this.drawBlock(MainGame.currentState);
			
			if (this.nextLevel)
			{
				if (LevelData.validLevel(LevelBuilder.currentLevel + 1))
				{
					this.drawLevelCompleteText(MainGame.currentState);
				}
				else
				{
					// Draw game complete message
					this.drawGameCompleteText(MainGame.currentState);
				}
			}
			else
			{
				this.drawStartMessage(MainGame.currentState);
			}
			
			this.drawClickNextText(MainGame.currentState);
		}
	},
	drawBlock: function(canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		// Grey background
		ctx.fillStyle = Colours.setAlpha(Colours.black, 0.7);
		ctx.fillRect(0, 0, MainGame.stageWidth, MainGame.stageWidth);

		// Menu block
		ctx.strokeStyle = Colours.setAlpha(Colours.grey, 0.5);
        ctx.fillStyle = Colours.setAlpha(Colours.darkGrey, 0.8);
        ctx.lineWidth = 3;

		ctx.fillRect(this.boxTopLeft.x, this.boxTopLeft.y, this.boxWidth, this.boxHeight);
		ctx.strokeRect(this.boxTopLeft.x, this.boxTopLeft.y, this.boxWidth, this.boxHeight);
	},
	drawLevelCompleteText: function(canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		ctx.font = "60px Arial";
		ctx.fillStyle = Colours.white;
		ctx.textAlign = "center";
		ctx.textBaseline = 'bottom';

		ctx.fillText("Well done!", MainGame.stageWidth / 2, this.boxTopLeft.y + (this.boxHeight / 2.5));

		ctx.font = "40px Arial";
		ctx.fillText("You have completed the level", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 3));
	},
	drawGameCompleteText: function(canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		ctx.font = "60px Arial";
		ctx.fillStyle = Colours.white;
		ctx.textAlign = "center";
		ctx.textBaseline = 'bottom';

		ctx.fillText("Congratulations!", MainGame.stageWidth / 2, this.boxTopLeft.y + (this.boxHeight / 2.5));

		ctx.font = "40px Arial";
		ctx.fillText("You have completed invertagon", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 3));
	},
	drawStartMessage: function(canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		// How to play
		ctx.font = "30px Arial";
		ctx.fillStyle = Colours.white;
		ctx.textAlign = "center";
		ctx.textBaseline = 'bottom';

		if (LevelBuilder.currentLevel === 1 && !this.partTwo)
		{
			ctx.fillText("Welcome to invertagon", MainGame.stageWidth / 2, this.boxTopLeft.y + (this.boxHeight / 4));

			ctx.font = "20px Arial";
			ctx.fillText("Note the colour of the hint button in the top right corner", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2));
			ctx.fillText("Match all tiles to the hint button colour to complete the level", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2.75));
		}
		else if (LevelBuilder.currentLevel === 1 && this.partTwo)
		{
			ctx.fillText("The line inverter", MainGame.stageWidth / 2, this.boxTopLeft.y + (this.boxHeight / 4));

			ctx.font = "20px Arial";
			ctx.fillText("The line inverter inverts all tiles in a straight line", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2));
			ctx.fillText("It can be pointed in any direction perpendicular to the hexagon's sides", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2.75));
		}
		else if (LevelBuilder.currentLevel === 2)
		{
			ctx.fillText("The circle inverter", MainGame.stageWidth / 2, this.boxTopLeft.y + (this.boxHeight / 4));

			ctx.font = "20px Arial";
			ctx.fillText("The circle inverter inverts all the tiles around it", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2));
			ctx.fillText("It can affect tiles around it up to two tiles away", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2.75));
		}
		else if (LevelBuilder.currentLevel === 3)
		{
			ctx.fillText("The ring inverter", MainGame.stageWidth / 2, this.boxTopLeft.y + (this.boxHeight / 4));

			ctx.font = "20px Arial";
			ctx.fillText("The ring inverter inverts tiles in a ring around it", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2));
			ctx.fillText("It can not affect the tiles directly next to it, but it has unlimited range", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2.75));
		}
		else if (LevelBuilder.currentLevel === 4)
		{
			ctx.fillText("Interacting with inverters", MainGame.stageWidth / 2, this.boxTopLeft.y + (this.boxHeight / 4));

			ctx.font = "20px Arial";
			ctx.fillText("Click on a placed inverter to remove or replace it", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2));
			ctx.fillText("For help, click on the hint button to show where an inverter should be placed", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 2.75));
			ctx.fillText("Good luck and have fun", MainGame.stageWidth / 2, this.boxTopLeft.y + ((this.boxHeight / 4) * 3.5));
		}
	},
	drawClickNextText: function(canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		ctx.font = "20px Arial";
		ctx.fillStyle = Colours.grey;
		ctx.textAlign = "right";
		ctx.textBaseline = 'bottom';

		ctx.fillText("Click to continue", this.boxTopLeft.x + this.boxWidth - 10, this.boxTopLeft.y + this.boxHeight - 10);
	}
};