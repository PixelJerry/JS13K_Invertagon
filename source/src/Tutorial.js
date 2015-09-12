// Tutorial.js

var Tutorial = {
	boxTopLeft: new Point(25, 501),
	boxWidth: 974,
	boxHeight: 50,

	completed: false,
	currentMessage: 1,

	messages: ["Click on the tile in the middle to place an inverter there",
			   "Click on the left button in the menu to select a line inverter",
			   "Click on the middle button in the menu to select a circle inverter",
			   "Click on the right button in the menu to select a ring inverter",
			   "Click and drag on the inverter to change the tile colours",
			   "Try to change tile colours to match the hint button colour"],

	draw: function(){
		if (!this.completed)
		{
			this.drawBlock(MainGame.currentState);
			this.drawText(MainGame.currentState);
		}
	},
	drawBlock: function(canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		// Menu block
		ctx.strokeStyle = Colours.setAlpha(Colours.grey, 0.3);
        ctx.fillStyle = Colours.setAlpha(Colours.darkGrey, 0.5);
        ctx.lineWidth = 2;

        ctx.fillRect(this.boxTopLeft.x, this.boxTopLeft.y, this.boxWidth, this.boxHeight);
        ctx.strokeRect(this.boxTopLeft.x, this.boxTopLeft.y, this.boxWidth, this.boxHeight);
	},
	drawText: function(canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		ctx.font = "25px Arial";
		ctx.fillStyle = Colours.white;
		ctx.textAlign = "center";
		ctx.textBaseline = 'middle';

		ctx.fillText(this.messages[this.currentMessage - 1], MainGame.stageWidth / 2, this.boxTopLeft.y + (this.boxHeight / 2));
	},
	nextMessage: function(){
		//
		if (!this.completed)
		{
			if (this.currentMessage === 1 && Changers.active)
			{
				if (LevelBuilder.currentLevel === 1)
				{
					this.currentMessage = 2;
				}
				else if (LevelBuilder.currentLevel === 2)
				{
					this.currentMessage = 3;
				}
				else if (LevelBuilder.currentLevel === 3)
				{
					this.currentMessage = 4;
				}
			}
			if ((this.currentMessage === 2 || this.currentMessage === 3 || this.currentMessage === 4) && Changers.placedChangers.length > 0)
			{
				this.currentMessage = 5;
			}
			else if (this.currentMessage === 5 && Changers.placedChangers.length > 0)
			{
				this.currentMessage = 6;
			}
		}
	},
	resetMessage: function(){
		if (LevelBuilder.currentLevel <= 3)
		{
			this.currentMessage = 1;
		}
		else
		{
			this.completed = true;
		}
	}
};