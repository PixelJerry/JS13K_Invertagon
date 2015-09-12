// GameMap.js

var GameMap = {
	tiles: [],
	hexRadius: 45,
	boardSize: 8,
	activeHex: null,
	gridCenter: null,
	fillColour: null,
	lineColour: null,
	backButtonColour: null,

	stratDragPoint: new Point(999, 999),
	changeSelection: false,

	mouseOverDragTimer: null,
	mouseOverAnimTimer: new Hexagon(0,0,0).invertAnimTime + 20,

	loadingLevel: false,
	clearingLevel: true,
	fadeAlphaValue: 0,
	fadeTime: 300,

	showMenu: false,
	hintHex: new Hexagon(0, 0, 0),
	hintsToShow: 0,

	create: function(){
		console.log ("Testing create.");

		this.gridCenter = new Point ((MainGame.stageWidth / 2), (MainGame.stageHeight / 2));
		this.hexRadius = 45; // Redoing this as it was overwritten in the main menu

		// Create the board
		this.createBoard();
		Changers.removeAllChangers();

		// Set the hint hexagon styles
		this.hintHex.setRadius(this.hexRadius);
		this.hintHex.setFill(Colours.none);
		this.hintHex.setStroke(Colours.white, 3);

		if (LevelBuilder.currentLevel <= 5)
		{
			Message.startMessage();
		}

		this.clearBoard();
		LevelBuilder.build(LevelData.getLevel(LevelBuilder.currentLevel));
		for (var row in this.tiles)
		{
			for (var col in this.tiles[row])
			{
				if (this.tiles[row][col].getFill() !== Colours.darkGrey)
				{
					this.tiles[row][col].visible = true;
				}
			}
		}
		this.createBackground();
	},
	createBackground: function(){
		MainGame.clearBackground();

		var ctx = document.getElementById("background").getContext("2d");

		// Add black background colour
		ctx.fillStyle = Colours.black;
		ctx.fillRect(0, 0, MainGame.stageWidth, MainGame.stageWidth);

		// Add hexagons

		for (var row in this.tiles)
		{
			var hexToDraw = new Hexagon(40, 0, 0);

			for (var col in this.tiles[row])
			{
				if (parseInt(row) >= -8 && parseInt(row) <= 8)
				{
					var pixelCenter = HexagonalGridSystem.gridCoordToPixelCoord({x: parseInt(row), y: parseInt(col)}, this.gridCenter, this.hexRadius); //gridPoint, gridCenterPoint, radius
					if (pixelCenter.y > -this.hexRadius && pixelCenter.y < MainGame.stageHeight + this.hexRadius)
					{
						hexToDraw.center = pixelCenter;
						hexToDraw.radius = 40;
						hexToDraw.setFill(Colours.none);
						hexToDraw.setStroke(Colours.setAlpha(Colours.darkGrey, 0.65), 1);
						hexToDraw.draw("background");
					}
				}
			}
		}

		// Add target colour on sides
		var tempLevelData = LevelData.getLevel(LevelBuilder.currentLevel);
		if (tempLevelData.colours[0] === 1)
		{
			this.backButtonColour = Colours.setAlpha(Colours.red, 0.75);
		}
		else if (tempLevelData.colours[0] === 2)
		{
			this.backButtonColour = Colours.setAlpha(Colours.green, 0.75);
		}
		else if (tempLevelData.colours[0] === 3)
		{
			this.backButtonColour = Colours.setAlpha(Colours.blue, 0.75);
		}
	},
	createBoard: function(){
		this.fillColour = Colours.darkGrey;
		this.lineColour = Colours.darken(this.fillColour);

		var hexCount = 0;

		for (var i = -this.boardSize; i <= this.boardSize; i++){
			for (var j = -this.boardSize; j <= this.boardSize; j++)
			{
				var centPoint = HexagonalGridSystem.gridCoordToPixelCoord(new Point (i,j), this.gridCenter, this.hexRadius);
				if (typeof this.tiles[i] === "undefined")
				{
					this.tiles[i] = [];
				}
				//Create the entire board
				if ((centPoint.y > -this.hexRadius && centPoint.y < MainGame.stageHeight + this.hexRadius) && 
					(centPoint.x > -this.hexRadius && centPoint.x < MainGame.stageWidth + this.hexRadius))
				{
					this.tiles[i][j] = new Hexagon(this.hexRadius - Math.ceil(this.hexRadius / 10), centPoint.x, centPoint.y);
					this.tiles[i][j].setFill(this.fillColour);
					this.tiles[i][j].setStroke(this.lineColour, Math.floor(this.hexRadius / 10));

					// Hide the tiles on the edges
					if ((centPoint.y < this.hexRadius || centPoint.y > MainGame.stageHeight - this.hexRadius) || 
						(centPoint.x < this.hexRadius || centPoint.x > MainGame.stageWidth - this.hexRadius))
					{
						this.tiles[i][j].visible = false;
					}

					hexCount++;
				}
			}
		}

		console.log ("Hexagons: " + hexCount);
	},
	clearBoard: function(){
		for (var row in this.tiles)
		{
			for (var col in this.tiles[row])
			{
				this.tiles[row][col].visible = false;
				this.tiles[row][col].setFill(Colours.darkGrey);
				this.tiles[row][col].setStroke(Colours.darken(Colours.darkGrey), this.tiles[row][col].strokeWidth);

				this.tiles[row][col].tileData.inverted = false;
			}
		}
	},
	showBoard: function(){
		for (var row in this.tiles)
		{
			for (var col in this.tiles[row])
			{
				if (this.tiles[row][col].getFill() !== Colours.darkGrey)
				{
					this.tiles[row][col].visible = true;
				}
			}
		}
	},
	fade: function(){
		if (this.loadingLevel)
		{
			var ctx = document.getElementById(MainGame.currentState).getContext("2d");

			ctx.fillStyle = Colours.setAlpha(Colours.black, this.fadeAlphaValue);
			ctx.fillRect(0, 0, MainGame.stageWidth, MainGame.stageHeight);
		}
	},
	fadeCalculations: function(){
		if (this.loadingLevel)
		{
			Input.disableMouse();

			if (this.clearingLevel)
			{
				// Fading to black
				this.fadeAlphaValue += MainGame.lastFrameTime / this.fadeTime;

				if (this.fadeAlphaValue >= 1)
				{
					// Screen black
					this.fadeAlphaValue = 1;

					this.clearingLevel = false;
					this.clearBoard();
					Changers.removeAllChangers();
					LevelBuilder.nextLevel();
					this.createBackground();
					Tutorial.resetMessage();
					Message.startMessage();
					this.showBoard();
					this.hintsToShow = 0;
				}
			}
			else
			{
				// Fading to game from black
				this.fadeAlphaValue -= MainGame.lastFrameTime / this.fadeTime;

				if (this.fadeAlphaValue <= 0.001)
				{
					// Clear screen
					this.fadeAlphaValue = 0;
					
					this.clearingLevel = true;
					this.loadingLevel = false;
					Input.enableMouse();
				}
			}
		}
	},
	checkPrimary: function(){
		var allPrimaries = true;

		for (var row in this.tiles)
		{
			for (var col in this.tiles[row])
			{
				if (this.tiles[row][col].visible && this.tiles[row][col].tileData.inverted)
				{
					// Check for a primary colour
					allPrimaries = false;
					// console.log ("Wrong tile: (" + row + ", " + col + ")");
				}
			}
		}

		return allPrimaries;
	},
	update: function(){
		this.fadeCalculations();

		if (typeof this.tiles[Input.mouseHexaGridPos.x] !== "undefined")
		{
			if (typeof this.tiles[Input.mouseHexaGridPos.x][Input.mouseHexaGridPos.y] !== "undefined")
			{
				this.onMouseOver(this.tiles[Input.mouseHexaGridPos.x][Input.mouseHexaGridPos.y]);
			}
		}

		for (var hexRow in this.tiles)
		{
			for (var hex in this.tiles[hexRow])
			{
				if ((parseInt(hexRow) !== Input.mouseHexaGridPos.x || parseInt(hex) !== Input.mouseHexaGridPos.y) &&
					this.tiles[hexRow][hex].mouseOver === true)
				{
					this.onMouseOut(this.tiles[hexRow][hex]);
				}
			}
		}

		Colours.pulse(750);
		Changers.update();
	},
	render: function(canvasID){
		this.drawHints();

		for (var hexRow in this.tiles){
			for (var hex in this.tiles[hexRow])
			{
				this.tiles[hexRow][hex].draw(MainGame.currentState);
			}
		}

		Changers.draw();
		this.drawButtons();
		Tutorial.draw();
		Message.draw();
		this.fade();
		this.drawMenu();
	},
	drawButtons: function(){
		var ctx = document.getElementById(MainGame.currentState).getContext("2d");

		// Menu button
		if (Input.mousePosition.x > 0 && Input.mousePosition.x < 50 &&
			Input.mousePosition.y > 0 && Input.mousePosition.y < 50 &&
			!this.changeSelection && !Message.active)
		{
			ctx.strokeStyle = Colours.lighten(this.backButtonColour);
		}
		else
		{
			ctx.strokeStyle = this.backButtonColour;
		}
		ctx.lineWidth = 4;
		ctx.lineCap = "round";
		ctx.beginPath();
		ctx.moveTo(10,10);
		ctx.lineTo(40,10);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(10,20);
		ctx.lineTo(40,20);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(10,30);
		ctx.lineTo(40,30);
		ctx.stroke();

		// Hint button
		//        ctx.fillText(((LevelData.getLevel(LevelBuilder.currentLevel).hints.length / 2) - this.hintsToShow), MainGame.stageWidth / 2, 325);

		if (Input.mousePosition.x >= 934 && Input.mousePosition.x <= 1014 &&
			Input.mousePosition.y >= 10 && Input.mousePosition.y <= 50 &&
			!this.changeSelection && !Message.active)
		{
			ctx.fillStyle = Colours.lighten(Colours.setAlpha(this.backButtonColour, 1));
		}
		else
		{
			ctx.fillStyle = Colours.setAlpha(this.backButtonColour, 1);
		}
		ctx.strokeStyle = Colours.darken(Colours.setAlpha(this.backButtonColour, 1));

		ctx.strokeRect(934, 10, 80, 40);
		ctx.fillRect(934, 10, 80, 40);

		ctx.font = "bold 20px Arial";
		ctx.fillStyle = Colours.black;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		ctx.fillText("Hint (" + ((LevelData.getLevel(LevelBuilder.currentLevel).hints.length / 2) - this.hintsToShow) + ")", 974, 30);
	},
	drawMenu: function(){
		if (!this.showMenu)
		{
			return;
		}
		// Greyed out background
		var ctx = document.getElementById(MainGame.currentState).getContext("2d");

		// Grey background
		ctx.fillStyle = Colours.setAlpha(Colours.black, 0.7);
		ctx.fillRect(0, 0, MainGame.stageWidth, MainGame.stageWidth);

		// Block
		ctx.strokeStyle = Colours.setAlpha(Colours.grey, 0.5);
        ctx.fillStyle = Colours.setAlpha(Colours.darkGrey, 0.8);
        ctx.lineWidth = 3;

		ctx.fillRect(306, 75, 412, 375);
		ctx.strokeRect(306, 75, 412, 375);

		// Buttons
		ctx.fillStyle = Colours.setAlpha(Colours.blue, 0.5);
		if(Input.mousePosition.x >= 310 && Input.mousePosition.x <= 714)
		{
			if (Input.mousePosition.y >= 195 && Input.mousePosition.y <= 255) // Main menu
			{
				ctx.fillRect(310, 195, 404, 60);
			}
			else if (Input.mousePosition.y >= 270 && Input.mousePosition.y <= 330) // restart level
			{
				ctx.fillRect(310, 270, 404, 60);
			}
			else if (Input.mousePosition.y >= 345 && Input.mousePosition.y <= 405) // give me a hint
			{
				ctx.fillRect(310, 345, 404, 60);
			}
		}

		ctx.font = "50px Arial";
		ctx.fillStyle = Colours.white;
		ctx.textAlign = "center";
		ctx.textBaseline = 'top';

		ctx.fillText("level " + LevelBuilder.currentLevel + " of 15", MainGame.stageWidth / 2, 100);

		ctx.font = "40px Arial";

		ctx.fillText("main menu", MainGame.stageWidth / 2, 200);
		ctx.fillText("restart level", MainGame.stageWidth / 2, 275);
		ctx.fillText("resume game", MainGame.stageWidth / 2, 350);

	},
	drawHints: function(){
		//
		if (this.hintsToShow > 0)
		{
			for (var i = 1; i <= this.hintsToShow; i++)
			{
				console.log ("Show hint number " + this.hintsToShow);
				//externalGridCoordToPixelCoord: function(gridPoint, gridCenterPoint, radius)
				this.hintHex.center = HexagonalGridSystem.externalGridCoordToPixelCoord(LevelData.getHintPosition(i), this.gridCenter, this.hexRadius);
				this.hintHex.draw(MainGame.currentState);
			}
		}
	},
	onMouseOver: function(tile){
		if (!tile.mouseOver && !tile.animating)
        {
            tile.mouseOver = true;
            if (!Changers.active && !this.changeSelection && !Message.active && !this.showMenu)
            {
                Motion.strokeFade(tile, Colours.white, tile.animationTime / 2);
            }
        }
	},
	onMouseOut: function(tile){
		if (tile.mouseOver &&  !tile.animating)
        {
            tile.mouseOver = false;
            if (!Changers.active)
            {
                Motion.strokeFade(tile, Colours.darken(tile.getFill()), tile.animationTime);
            }
        }
	},
	onClick: function(tile){
		console.log (Input.mouseHexaGridPos);
		if (!Message.active && !this.showMenu)
		{
			if (Input.mousePosition.x > 0 && Input.mousePosition.x < 50 &&
				Input.mousePosition.y > 0 && Input.mousePosition.y < 50 && !this.showMenu)
			{
				// Main menu button
				// MainGame.startState("mainMenu");
				Changers.active = false;
				this.showMenu = true;
			}
			// Hint button
			else if (Input.mousePosition.x >= 934 && Input.mousePosition.x <= 1014 &&
					Input.mousePosition.y >= 10 && Input.mousePosition.y <= 50)
			{
				// Clicked on hint button
				console.log ("Give me a hint");
				this.hintsToShow++;

				if (LevelData.getHintPosition(this.hintsToShow).x === 99)
				{
					this.hintsToShow--;
				}

				this.showMenu = false;
			}

			Changers.onClick();
			// this.checkVictoryConditions();
		}
		else if (this.showMenu)
		{
			if(Input.mousePosition.x >= 310 && Input.mousePosition.x <= 714)
			{
				if (Input.mousePosition.y >= 195 && Input.mousePosition.y <= 255) // Main menu
				{
					MainGame.startState("mainMenu");
				}
				else if (Input.mousePosition.y >= 270 && Input.mousePosition.y <= 330) // restart level
				{
					LevelBuilder.currentLevel--;
					this.showMenu = false;
					this.loadNextLevel();
				}
				else if (Input.mousePosition.y >= 345 && Input.mousePosition.y <= 405) // resume game
				{
					this.showMenu = false;
				}
			}
		}
		else
		{
			Message.destroyMessage();
		}
		Tutorial.nextMessage();
	},
	onMouseDragStart: function(){
		this.mouseOverDragTimer = MainGame.timeNow();
		// console.log ("Start Drag");
		// This function needs to be greatly refined
		this.stratDragPoint.equals(Input.mouseHexaGridPos);

		// Is there a placer where the dragging started?
		if (Changers.isChangerAt(this.stratDragPoint) && !Changers.active)
		{
			// console.log ("Need to start playing with the selection");
			this.changeSelection = true;
		}
	},
	onMouseDrag: function(tile){
		// Is there a placer where the dragging started?
		if (this.changeSelection)
		{
			// console.log ("Changing selection");
			// First I need to invert the current influenced area
			Changers.updateSelection(this.stratDragPoint);
		}
		else
		{
			console.log ("Now Dragging");
		}

	},
	onMouseDragStop: function(){
		// console.log ("Stop Drag");
		if (this.changeSelection)
		{
			this.mouseOverDragTimer = MainGame.timeNow();
			Changers.commitSelection();
			this.changeSelection = false;
		}
		
		this.stratDragPoint = new Point(999, 999);
		
		this.checkVictoryConditions();
		Tutorial.nextMessage();
	},
	tileAtPoint: function(pixelPoint){
		var gridPoint = HexagonalGridSystem.pixelCoordToGridCoord(pixelPoint, this.gridCenter, this.hexRadius);

		if (this.validTile(gridPoint))
		{
			return this.tiles[gridPoint.x][gridPoint.y];
		}
		else
		{
			console.log ("ERROR: invalid tile at point, returnig null");
			return null;
		}
	},
	setActiveHexagon: function(gridPoint){
		if (this.validTile(gridPoint))
		{
			this.activeHex = this.tiles[gridPoint.x][gridPoint.y];
		}
		else
		{
			console.log ("ERROR: Could not set active hexagon at " + gridPoint.x + " ," + gridPoint.y);
		}
	},
	getActiveHexagonGridPoint: function(){
		if (this.activeHex !== null)
		{
			return this.pixelCoordToGridCoord(this.activeHex.center);
		}
	},
	clearActiveHexagon: function(){
		this.activeHex = null;
	},
	validTile: function(tileIndexPoint){
		if (typeof this.tiles[tileIndexPoint.x] !== "undefined")
		{
			if (typeof this.tiles[tileIndexPoint.x][tileIndexPoint.y] !== "undefined")
			{
				return true;
			}
		}

		return false;
	},
	pixelCoordToGridCoord: function(pixelPoint){
		return HexagonalGridSystem.pixelCoordToGridCoord(pixelPoint, this.gridCenter, this.hexRadius);
	},
	loadNextLevel: function(){
		if (LevelData.validLevel(LevelBuilder.currentLevel + 1))
		{
			this.loadingLevel = true;
		}
		else
		{
			// No more levels
			LevelBuilder.currentLevel = 1;
			Tutorial.completed = false;
			MainGame.startState("mainMenu");
		}
	},
	checkVictoryConditions: function(){
		if (this.checkPrimary())
		{
			console.log ("Victory conditions met - Level complete");
			// show notification
			// then on click load next level
			Message.completeMessage();
		}
	},
	deleteState: function() {
	this.tiles = [];
	this.hexRadius = 45;
	this.boardSize = 8;
	this.activeHex = null;
	this.gridCenter = null;
	this.fillColour = null;
	this.lineColour = null;

	this.stratDragPoint = new Point(999, 999);
	this.changeSelection = false;

	this.mouseOverDragTimer = null;
	this.mouseOverAnimTimer = new Hexagon(0,0,0).invertAnimTime + 20;

	this.loadingLevel = false;
	this.clearingLevel = true;
	this.frameDelayCount = 0;
	this.animClearRow = -7;
	this.animClearCol = 7;
	this.showMenu = false;
	this.hintsToShow = 0;
	}
};