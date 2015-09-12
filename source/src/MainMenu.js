// MainMenu.js

var MainMenu = {
	canvasElement: null,
	boardSize: 3,
	gridCenter: new Point(0,0),
	howToPlayCenterPoint: new Point(0,0),
	hexRadius: 130,
	tiles: [],
	buttonHexagons: [],
	moving: false,
	atMenu: true,
	moveSpeed: 75,
	maxSpeedX: 0,

	create: function() {
		console.log("Creating the Main Menu");
		this.canvasElement = document.getElementById(MainGame.currentState);

		this.gridCenter.x = MainGame.stageWidth / 2;
		this.gridCenter.y = MainGame.stageHeight * (3 / 4);

		GameMap.gridCenter = new Point(this.gridCenter.x, this.gridCenter.y);
		GameMap.hexRadius = this.hexRadius;

		this.howToPlayCenterPoint.x = this.gridCenter.x - MainGame.stageWidth * 1.1;
		this.howToPlayCenterPoint.y =  MainGame.stageHeight / 2;

		this.maxSpeedX =  ((this.howToPlayCenterPoint.x - this.gridCenter.x) / 2) + this.gridCenter.x;

		// Create the board for rendering and buttons
		var fillColour = Colours.none;
		var lineColour = Colours.setAlpha(Colours.darkGrey, 0.6);

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
					this.tiles[i][j] = new Hexagon(this.hexRadius - 5, centPoint.x, centPoint.y);
					this.tiles[i][j].setFill(fillColour);
					this.tiles[i][j].setStroke(lineColour, 2);
					hexCount++;
				}
			}
		}

		this.tiles[0][0].setStroke(Colours.white ,this.tiles[0][0].getStrokeWidth()); // Mid
		this.tiles[-1][0].setStroke(Colours.white ,this.tiles[-1][0].getStrokeWidth()); // Right
		this.tiles[1][-1].setStroke(Colours.white ,this.tiles[1][-1].getStrokeWidth()); // Left

		this.buttonHexagons[0] = new Hexagon(this.hexRadius - 15, this.tiles[0][0].center.x, this.tiles[0][0].center.y); // Mid
		this.buttonHexagons[1] = new Hexagon(this.hexRadius - 15, this.tiles[-1][0].center.x, this.tiles[-1][0].center.y); // Right
		this.buttonHexagons[2] = new Hexagon(this.hexRadius - 15, this.tiles[1][-1].center.x, this.tiles[1][-1].center.y); // Left
	},
	onClick: function()
	{
		if (!this.moving)
		{
			if (Input.mouseHexaGridPos.x === 1 && Input.mouseHexaGridPos.y === -1)
	  		{
	  			console.log ("Clicked on how to play");
	  			this.move();
	  		}
	  		else if (Input.mouseHexaGridPos.x === -1 && Input.mouseHexaGridPos.y === 0)
	  		{
	  			console.log ("Clicked on start game");
	  			MainGame.startState("gameBoard");
	  		}

	  		if (!this.atMenu)
	  		{
	  			if (Input.mousePosition.x >= 0 && Input.mousePosition.x <= MainGame.stageWidth * 0.1 &&
	  				Input.mousePosition.y >= MainGame.stageHeight * 0.1 && Input.mousePosition.y <= MainGame.stageHeight * 0.9)
	  			{
	  				this.move();
	  			}
	  		}
	  	}
	},
	update: function(){
		this.moveBoard();
	},
	render: function()
	{
		var ctx = this.canvasElement.getContext("2d");

		// Draw the background
		for (var row in this.tiles)
		{
			for (var col in this.tiles[row])
			{
				this.tiles[row][col].draw(MainGame.currentState);
			}
		}

		// Draw the Title
		ctx.font = "normal 95px Arial";
		ctx.textAlign="center";
		ctx.textBaseline = 'top';
		ctx.fillStyle = Colours.white;
		ctx.fillText("invertagon", this.gridCenter.x , 30);

		// Draw the buttons
		this.drawButtons(ctx);

		// Draw the how to play area
		this.drawHowToPlay(ctx);
	},
	drawButtons: function(ctx){
		this.buttonHexagons[0].setFill(Colours.blue);
		this.buttonHexagons[1].setFill(Colours.green);
		this.buttonHexagons[2].setFill(Colours.red);
		
		// Buttons
  		if (Input.mouseHexaGridPos.x === 1 && Input.mouseHexaGridPos.y === -1)
  		{
  			// how to play
			this.buttonHexagons[2].setFill(Colours.white);
  		}
  		else if (Input.mouseHexaGridPos.x === -1 && Input.mouseHexaGridPos.y === 0)
  		{
  			// Start
			this.buttonHexagons[1].setFill(Colours.white);
  		}

		for (var hex in this.buttonHexagons)
		{
			this.buttonHexagons[hex].draw(MainGame.currentState);
		}

		ctx.font = "normal 55px Arial";
		ctx.textAlign="center";
		ctx.textBaseline = 'middle';
		ctx.fillStyle = Colours.black;

		ctx.fillText("start", this.buttonHexagons[1].center.x , this.buttonHexagons[1].center.y - 35);
		ctx.fillText("game", this.buttonHexagons[1].center.x , this.buttonHexagons[1].center.y + 20);

		ctx.fillText("how", this.buttonHexagons[2].center.x , this.buttonHexagons[2].center.y - 35);
		ctx.fillText("to play", this.buttonHexagons[2].center.x , this.buttonHexagons[2].center.y + 20);

		// Credit
		ctx.font = "25px Arial";
		ctx.fillStyle = Colours.burntBlue;

		ctx.fillText("game by", this.buttonHexagons[0].center.x , this.buttonHexagons[0].center.y - 60);

		ctx.font = "bold 27px Arial";
		// ctx.fillStyle = Colours.black;

		ctx.fillText("Jeremy", this.buttonHexagons[0].center.x , this.buttonHexagons[0].center.y + -10);
		ctx.fillText("de Reuck", this.buttonHexagons[0].center.x , this.buttonHexagons[0].center.y + 25);
	},
	drawHowToPlay: function(ctx){
		var centerX = this.gridCenter.x - this.howToPlayCenterPoint.x + (MainGame.stageWidth / 2);
		// Heading
		ctx.font = "normal 75px Arial";
		ctx.textAlign="center";
		ctx.textBaseline = 'top';
		ctx.fillStyle = Colours.white;
		ctx.fillText("how to play",  centerX, MainGame.stageHeight * 0.05);

		// Text
		ctx.font = "normal 25px Arial";
		ctx.textAlign="center";
		ctx.textBaseline = 'top';
		ctx.fillText("The objective is to invert all secondary colours to primary colours",  centerX, MainGame.stageHeight * 0.25);

		ctx.fillText("This is done by placing and activating inverters on the board",  centerX, MainGame.stageHeight * 0.5);

		ctx.fillText("Click on a tile to open the quick-select menu",  centerX, MainGame.stageHeight * 0.75);
		ctx.fillText("From here you will be able to place or remove inverters",  centerX, MainGame.stageHeight * 0.8);

		ctx.fillText("Click and drag on a placed inverter to change its influence area",  centerX, MainGame.stageHeight * 0.85);

		// Draw colours
		var hex = new Hexagon (30, 0, MainGame.stageHeight * 0.4);
		hex.setStroke(Colours.none, 0);

		this.drawHex(hex, centerX - (MainGame.stageWidth * 0.16), "red");
		this.drawHex(hex, centerX - (MainGame.stageWidth * 0.2), "cyan");

		this.drawHex(hex, centerX + (MainGame.stageWidth * 0.02), "green");
		this.drawHex(hex, centerX - (MainGame.stageWidth * 0.02), "purple");

		this.drawHex(hex, centerX + (MainGame.stageWidth * 0.2), "blue");
		this.drawHex(hex, centerX + (MainGame.stageWidth * 0.16), "yellow");

		// Draw Icons
		//drawLineIcon: function(centerPoint, canvasID, mainColour, secondaryColour){
		Changers.drawLineIcon({x: centerX - (MainGame.stageWidth * 0.18), y: MainGame.stageHeight * 0.65}, MainGame.currentState, Colours.white, Colours.grey);
		Changers.drawCircleIcon({x: centerX, y: MainGame.stageHeight * 0.65}, MainGame.currentState, Colours.white, Colours.grey);
		Changers.drawRingIcon({x: centerX + (MainGame.stageWidth * 0.18), y: MainGame.stageHeight * 0.65}, MainGame.currentState, Colours.white, Colours.grey);

		// Back button
		ctx.fillStyle = Colours.red;
		if (!this.atMenu && !this.moving)
		{
			// ctx.fillRect(centerX + (MainGame.stageWidth * 0.4), MainGame.stageHeight * 0.1, /*width*/MainGame.stageWidth * 0.1, /*height*/MainGame.stageHeight * 0.8);
			if (Input.mousePosition.x >= 0 && Input.mousePosition.x <= MainGame.stageWidth * 0.1 &&
				Input.mousePosition.y >= MainGame.stageHeight * 0.1 && Input.mousePosition.y <= MainGame.stageHeight * 0.9)
			{
				ctx.fillStyle = Colours.white;
			}
		}
		ctx.fillRect(centerX - (MainGame.stageWidth * 0.5), MainGame.stageHeight * 0.1, /*width*/MainGame.stageWidth * 0.1, /*height*/MainGame.stageHeight * 0.8);

		ctx.fillStyle = Colours.black;
		ctx.font = "bold 50px Arial";
		ctx.textAlign="center";
		ctx.textBaseline = 'middle';

		ctx.save();
		// 	ctx.translate((MainGame.stageWidth * 0.4), MainGame.stageHeight * 0.5);
		ctx.rotate(-Math.PI/2);
		ctx.fillText("back to menu",  -(MainGame.stageWidth * 0.275), centerX - MainGame.stageHeight * 0.8);
		ctx.restore();
		//
	},
	drawHex: function(hex, xPoint, colour){
		hex.setFill(Colours[colour]);
		hex.center.x = xPoint;
		hex.draw(MainGame.currentState);
	},
	move: function(){
		this.moving = true;
	},
	moveBoard: function(){
		if (!this.moving)
		{
			return;
		}

		var movmentModifier = 1 - Math.abs(this.gridCenter.x - this.maxSpeedX) / (MainGame.stageWidth * 0.57);

		if (this.atMenu)
		{
			this.gridCenter.x -= this.moveSpeed * movmentModifier;
			GameMap.gridCenter.x = this.gridCenter.x;
		}
		else
		{
			this.gridCenter.x += this.moveSpeed * movmentModifier;
			GameMap.gridCenter.x = this.gridCenter.x;
		}



		if (this.atMenu) // moving towards the how to play area
		{
			if (this.gridCenter.x <= this.howToPlayCenterPoint.x)
			{
				this.gridCenter.x = this.howToPlayCenterPoint.x;
				GameMap.gridCenter.x = this.gridCenter.x;

				this.moving = false;
				this.atMenu = false;
			}
		}
		else
		{
			// Moving towards the main menu area
			if (this.gridCenter.x >= MainGame.stageWidth / 2)
			{
				this.gridCenter.x = MainGame.stageWidth / 2;
				GameMap.gridCenter.x = this.gridCenter.x;

				this.moving = false;
				this.atMenu = true;
			}
		}

		this.updateTilePositions();
	},
	updateTilePositions: function(){
		for (var row in this.tiles)
		{
			for (var col in this.tiles[row])
			{
				var centPoint = HexagonalGridSystem.gridCoordToPixelCoord(new Point (parseInt(row),parseInt(col)), this.gridCenter, this.hexRadius);
				//Move the hexagons
				this.tiles[row][col].center.x = centPoint.x;
				this.tiles[row][col].center.y = centPoint.y;

				if (parseInt(row) === 0 && parseInt(col) === 0)
				{
					this.buttonHexagons[0].center.x = centPoint.x;
					this.buttonHexagons[0].center.y = centPoint.y;
				}
				else if (parseInt(row) === -1 && parseInt(col) === 0)
				{
					this.buttonHexagons[1].center.x = centPoint.x;
					this.buttonHexagons[1].center.y = centPoint.y;
				}
				else if (parseInt(row) === 1 && parseInt(col) === -1)
				{
					this.buttonHexagons[2].center.x = centPoint.x;
					this.buttonHexagons[2].center.y = centPoint.y;
				}
			}
		}
	},
	deleteState: function() {
		this.canvasElement = null;
		this.boardSize = 3;
		this.gridCenter = new Point(0,0);
		this.hexRadius = 130;
		this.tiles = [];
		this.buttonHexagons = [];

		this.moving = false;
		this.atMenu = true;
		this.moveSpeed = 75;
		this.maxSpeedX = 0;
	}
};