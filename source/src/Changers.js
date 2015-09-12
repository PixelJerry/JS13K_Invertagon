// Changers.js

// Requires Selection.js

var Changers = {
	active: false,
	visualHex: null,
	blockPosition: null,
	activeHexIndexs: null,
	menuWidth: 280,
	menuHeight: 100,
	buttonOffset: 10,
	buttonWidth: 0,
	buttonHeight: 0,
	mouseOverButton: 0,
	mouseOverSelectionPulse: 0,

	placedChangers: [],

	maxCircleSize: 2,

	availableChangers: [0,0,0], // lines, circles and rings

	menuColours: {
		blockFill: Colours.grey,
		blockStroke: Colours.white,
		buttonFill: Colours.darken(Colours.grey),
		buttonStroke: Colours.black
	},

	changerData: {
		colour: ["rgba(255,0,0,1)", "rgba(0,255,0,1)", "rgba(0,0,255,1)"],
		mainColour: "",
		secondaryColour: "",
		radius: Math.round(GameMap.hexRadius / 2.5),

		selectionIndex: -1,
		currentChangerType: 0,
		activeHexChangerIndex: -1,

		// selectionTestPoint: null
	},

	init: function(){
		this.buttonWidth = (this.menuWidth - (4 * this.buttonOffset)) / 3;
		this.buttonHeight = this.menuHeight - (2 * this.buttonOffset);
	},
	createMenu: function(){
		if (!this.active)
		{
			this.active = true;
			GameMap.setActiveHexagon(Input.mouseHexaGridPos);
			for (var hexTile in this.placedChangers)
			{
				var tileGridPos = GameMap.pixelCoordToGridCoord(this.placedChangers[hexTile].center);
				var activeHexGridPoint = GameMap.getActiveHexagonGridPoint();

				if (tileGridPos.x === activeHexGridPoint.x && tileGridPos.y === activeHexGridPoint.y)
				{
					console.log ("Changer index on active hex: " + hexTile);
					this.changerData.activeHexChangerIndex = parseInt(hexTile);
				}
			}

			this.setPosition();
		}
	},
	update: function(){
		this.mouseOverButton = 0;

		for (var i = 1; i <= 3; i++)
		{
			if (this.pointOverButton(Input.mousePosition, i))
			{
				this.mouseOverButton = i;
			}
		}
		this.pulseSelectedTiles();
	},
	draw: function(){
		this.drawChangers(MainGame.currentState);
		this.drawInvertorInfo(MainGame.currentState);
		
		if (this.active)
		{
			this.drawBlock(MainGame.currentState);
			this.drawButtons(MainGame.currentState);
		}
	},
	drawInvertorInfo: function(canvasID){
		// Show how many invertors are available

		// Use the following functions to draw these
		// drawIconType: function(type, centerPoint, canvasID, mainColour, secondaryColour)
		// drawButtonText: function(buttonNumber, textPoint, canvasID) //Text is aligned: right, bottom
		for (var i = 1; i <= 3; i++)
		{
			var yPos = (MainGame.stageHeight / 2) + ((i - 2) * 75);
			// yPos = (MainGame.stageHeight / 2);
			this.drawIconType(i, {x: 985, y: yPos}, canvasID, Colours.grey, Colours.darkGrey);// Colours.darkGrey, Colours.grey);
			this.drawButtonText(i, {x: 950, y: yPos + 11}, canvasID);
		}
	},
	drawBlock: function(canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		// Menu block
		ctx.strokeStyle = this.menuColours.blockStroke;
        ctx.fillStyle = this.menuColours.blockFill;
        ctx.lineWidth = 4;

		ctx.fillRect(this.blockPosition.x, this.blockPosition.y, this.menuWidth, this.menuHeight);
		ctx.strokeRect(this.blockPosition.x, this.blockPosition.y, this.menuWidth, this.menuHeight);
	},
	drawButtons: function(canvasID){
		// TODO: Refine this
		for (var i = 1; i <= 3; i++)
		{
			// mouse if over the buton and that type has available changers
			if (this.mouseOverButton === i && this.availableChangers[i - 1] > 0)
			{
				this.drawButton(canvasID, this.menuColours.buttonStroke, Colours.lightBurntGreen, i);
			}
			// No more of this type available, and there is a changer on active hex
			else if (this.availableChangers[i - 1] === 0 && this.changerData.activeHexChangerIndex >= 0)
			{
				// Clicking will give a changer back, and the mouse is over it
				if (this.placedChangers[this.changerData.activeHexChangerIndex].tileData.changerType === i &&
					this.mouseOverButton === i)
				{
					this.drawButton(canvasID, this.menuColours.buttonStroke, Colours.burntCyan, i);
				}
				// Clicking on the button will get one back but the mouse not over it
				else if (this.placedChangers[this.changerData.activeHexChangerIndex].tileData.changerType === i)
				{
					this.drawButton(canvasID, this.menuColours.buttonStroke, Colours.burntBlue, i);
				}
				// Clicking on the button will not get one back
				else
				{
					this.drawButton(canvasID, this.menuColours.buttonStroke, Colours.burntRed, i);
				}
			}
			// Clicking on the button will not get one back (Same situation as case above)
			else if (this.availableChangers[i - 1] === 0)
			{
				this.drawButton(canvasID, this.menuColours.buttonStroke, Colours.burntRed, i);
			}
			// Default button state
			else
			{
				this.drawButton(canvasID, this.menuColours.buttonStroke, Colours.burntGreen, i);
			}
		}
	},
	drawButton: function(canvasID, stokeColour, fillColour, buttonNumber){
		var ctx = document.getElementById(canvasID).getContext("2d");

		ctx.strokeStyle = stokeColour; //this.menuColours.buttonStroke;
        ctx.fillStyle = fillColour; //this.menuColours.buttonFill;
        ctx.lineWidth = 2;

		ctx.fillRect(this.blockPosition.x + this.buttonOffset + ((this.buttonOffset + this.buttonWidth) * (buttonNumber - 1)), this.blockPosition.y + this.buttonOffset, this.buttonWidth, this.buttonHeight);
		ctx.strokeRect(this.blockPosition.x + this.buttonOffset + ((this.buttonOffset + this.buttonWidth) * (buttonNumber - 1)), this.blockPosition.y + this.buttonOffset, this.buttonWidth, this.buttonHeight);

		var buttonCenter = {x: (this.blockPosition.x + this.buttonOffset + ((this.buttonOffset + this.buttonWidth) * (buttonNumber - 1))) + (this.buttonWidth / 2),
							y: (this.blockPosition.y + this.buttonOffset) + (this.buttonHeight / 2)};

		// Draw the button icon
		this.drawIconType(buttonNumber, buttonCenter, canvasID, Colours.white, Colours.grey);

		// Draw the text indicating the number of changers left to place
		this.drawButtonText(buttonNumber, {x: buttonCenter.x + this.buttonWidth / 2.15, y: buttonCenter.y + this.buttonHeight / 2.15}, canvasID);
	},
	drawButtonText: function(buttonNumber, textPoint, canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");

		ctx.font = "20px Arial";
		ctx.fillStyle = Colours.white;
		ctx.textAlign = "right";
		ctx.textBaseline = 'bottom';

		for (var i = 1; i <= 3; i++)
		{
			ctx.fillText(this.availableChangers[buttonNumber - 1], textPoint.x, textPoint.y);
		}
	},
	drawChangers: function(canvasID){
		// Creating the icons


		if (this.placedChangers.length > 0)
		{
			for (var hex in this.placedChangers)
			{
				this.drawIcon(this.placedChangers[hex], canvasID);
			}
		}
	},
	drawIcon: function (changer, canvasID){
		var ctx = document.getElementById(canvasID).getContext("2d");
		var drawColour = "rgba(255,255,255,1)";
		var secondaryColour = Colours.grey;

		if (!changer.tileData.changerActive)
		{
			drawColour = Colours.black;
			secondaryColour = Colours.darkGrey;
		}

		if (changer.tileData.changerType === 1)
		{
			this.drawLineIcon(changer.center, canvasID, drawColour, secondaryColour);
		}
		else if (changer.tileData.changerType === 2)
		{
			this.drawCircleIcon(changer.center, canvasID, drawColour, secondaryColour);
		}
		else if (changer.tileData.changerType === 3)
		{
			this.drawRingIcon(changer.center, canvasID, drawColour, secondaryColour);
		}
	},
	drawIconType: function(type, centerPoint, canvasID, mainColour, secondaryColour){
		if (type === 1)
		{
			this.drawLineIcon(centerPoint, canvasID, mainColour, secondaryColour);
		}
		else if (type === 2)
		{
			this.drawCircleIcon(centerPoint, canvasID, mainColour, secondaryColour);
		}
		else if (type === 3)
		{
			this.drawRingIcon(centerPoint, canvasID, mainColour, secondaryColour);
		}
	},
	drawLineIcon: function(centerPoint, canvasID, mainColour, secondaryColour){
		var ctx = document.getElementById(canvasID).getContext("2d");
		var centerHex = new Hexagon(this.changerData.radius, centerPoint.x, centerPoint.y);

		centerHex.setFill(mainColour);
		centerHex.setStroke(Colours.none);
		centerHex.draw(canvasID);

		ctx.fillStyle = secondaryColour;
		ctx.fillRect(centerHex.center.x - (this.changerData.radius / 2), centerHex.center.y - (this.changerData.radius * 1.65), centerHex.radius, centerHex.radius * 0.6);
	},
	drawCircleIcon: function(centerPoint, canvasID, mainColour, secondaryColour){
		var centerHex = new Hexagon(Math.round(this.changerData.radius * (2 / 3)), centerPoint.x, centerPoint.y);
		var centerHex2 = new Hexagon(Math.round(this.changerData.radius * (2 / 3)) * 2.5, centerPoint.x, centerPoint.y);

		centerHex2.setFill(secondaryColour);
		centerHex2.setStroke(Colours.none);
		centerHex2.draw(canvasID);

		centerHex.setFill(mainColour);
		centerHex.setStroke(Colours.none);
		centerHex.draw(canvasID);
	},
	drawRingIcon: function(centerPoint, canvasID, mainColour, secondaryColour){
		var centerHex = new Hexagon(Math.round(this.changerData.radius * (2 / 3)), centerPoint.x, centerPoint.y);
		var centerHex2 = new Hexagon(Math.round(this.changerData.radius * (2 / 3)) * 2, centerPoint.x, centerPoint.y);

		centerHex2.setFill(Colours.none);
		centerHex2.setStroke(secondaryColour, 6);
		centerHex2.draw(canvasID);

		centerHex.setFill(mainColour);
		centerHex.setStroke(Colours.none);
		centerHex.draw(canvasID);
	},
	onClick: function(){
		if (!this.active)
		{
			if (GameMap.validTile(Input.mouseHexaGridPos) && GameMap.tiles[Input.mouseHexaGridPos.x][Input.mouseHexaGridPos.y].visible)
			{
				// Create the menue
				this.createMenu();
			}
		}
		else
		{ // this.active === true
			if (!this.pointOverMenu(Input.mousePosition)) // Mouse not over this menu
			{
				this.destroyMenu();
			}
		}

		this.menuButtonClick();
	},
	menuButtonClick: function(){
		if (this.mouseOverButton !== 0)
		{
			this["button" + this.mouseOverButton]();

			this.clearPulsingTiles();
			var destroy = false;
			if (this.availableChangers[this.mouseOverButton - 1] > 0)
			{
				this.destroyMenu();
			}
		}
	},
	button1: function(){
		this.tryToPlace(1);
	},
	button2: function(){
		this.tryToPlace(2);
	},
	button3: function(){
		this.tryToPlace(3);
	},
	setChangerData: function(changerIndex, placerType, placerPoint){
		if (typeof placerPoint === "undefined")
		{
			placerPoint = GameMap.getActiveHexagonGridPoint();
		}
		this.placedChangers[changerIndex].tileData.changerType = placerType;
		this.placedChangers[changerIndex].tileData.changerPoint = placerPoint;
	},
	tryToPlace: function(type){
		//Get the place where we want to place the changer
		var gridPointToPlace = GameMap.getActiveHexagonGridPoint();

		// Store the index of the changer in this variable if needed
		var occupiedIndex = -1;
		var spotAvailable = true;
		var destroy = false;

		if (this.placedChangers.length > 0)
		{
			// there are changers on the board, check to see if there is one on the spot we want to use
			for (var hex in this.placedChangers)
			{
				var hexGridPoint = GameMap.pixelCoordToGridCoord(this.placedChangers[hex].center);
				if (gridPointToPlace.x === hexGridPoint.x && gridPointToPlace.y === hexGridPoint.y)
				{
					// Found a tile on the spot we want to use
					occupiedIndex = parseInt(hex);

					if (this.placedChangers[occupiedIndex].tileData.changerType === type) // The changer we want to place is the same as the one in this space
					{
						// simply remove this changer
						console.log ("Removing the changer of same type.");
						spotAvailable = false;
						this.remove(occupiedIndex);
						// Break out of the loop
						break;
					}
					else // The changer we want to place is of a different type, therefore replace it
					{
						if (this.availableChangers[type - 1] > 0)
						{
							// First remove the one in this spot
							this.remove(occupiedIndex);
							destroy = true;
						}
						else
						{
							this.destroyMenu();
							spotAvailable = false;
						}
						// Break out of the loop
						break;
					}
				}
			}
		}
		
		if (spotAvailable)
		{
			// The spot where we want to add the changer is open
			// Add the changer
			if (this.availableChangers[type - 1] > 0)
			{
				destroy = true;
			}
			this.place(type);
			if (destroy)
			{
				this.destroyMenu();
			}
		}


	},
	place: function(type){
		// check to see if there are any changers available
		if (this.availableChangers[type - 1] > 0)
		{
			// There are changers available, remove one
			this.availableChangers[type - 1]--;
			// Add a changer of that type to the active hex
			this.placedChangers[this.placedChangers.length] = new Hexagon(this.changerData.radius, GameMap.activeHex.center.x, GameMap.activeHex.center.y);
			this.placedChangers[this.placedChangers.length - 1].setFill(this.changerData.colour[type - 1]);
			this.placedChangers[this.placedChangers.length - 1].setStroke(Colours.darken(this.placedChangers[this.placedChangers.length - 1].getFill()), Math.floor(GameMap.hexRadius / 5));
			this.setChangerData(this.placedChangers.length - 1, type);
			// The changers are not active on placement and needs to be activated by dragging
			this.placedChangers[this.placedChangers.length - 1].tileData.changerActive = false;
		}
		else
		{
			console.log ("There are no more changers of type " + type + " available.");
		}
	},
	remove: function(index){
		if (index < 0 || index > this.placedChangers.length)
		{
			console.log ("ERROR: Changers.remove(" + index + "); - " + index + " is not a valid index.");
			return;
		}

		var updatedChangers = [];
		
		// invert this placer's influence area
		// Start by making the propper selection if the changer is active
		if (this.placedChangers[index].tileData.changerActive)
		{
			switch (this.placedChangers[index].tileData.changerType)
			{
				case 1:
					// line
					this.invertLine(this.placedChangers[index].tileData.changerPoint);
					break;
				case 2:
					// circle
					this.invertCircle(this.placedChangers[index].tileData.changerPoint);
					break;
				case 3:
					// ring
					this.invertRing(this.placedChangers[index].tileData.changerPoint);
					break;
				default:
					// ERROR
					console.log ("ERROR: " + this.placedChangers[index].tileData.changerType + " is not a valid placer type");
					break;
			}
		}

		// Now remove this hexagon from the list of changers
		if (this.placedChangers.length > 0)
		{
			var tempIndex = 0;
			for (var i = 0; i < this.placedChangers.length; i++)
			{
				if (i !== index)
				{
					updatedChangers[tempIndex] = this.placedChangers[i];
					tempIndex++;
				}
				console.log ("Lenght of the updated array: " + updatedChangers.length);
			}
		}

		this.availableChangers[this.placedChangers[index].tileData.changerType - 1]++;
		this.placedChangers = updatedChangers;
		console.log (this.placedChangers);
	},
	isChangerAt: function(testPoint){
		var changerFound = false;

		for (var changer in this.placedChangers)
		{
			var changerGridPoint = HexagonalGridSystem.pixelCoordToGridCoord(this.placedChangers[changer].center, GameMap.gridCenter, GameMap.hexRadius);

			if (testPoint.x === changerGridPoint.x && testPoint.y === changerGridPoint.y)
			{
				changerFound = true;
			}
		}

		return changerFound;
	},
	invertLine: function(gridPoint){
		Selection.selectLine(GameMap.getActiveHexagonGridPoint(), gridPoint);

		this.invertSelected();
		this.clearPulsingTiles();
	},
	invertCircle: function(gridPoint){
		Selection.selectCircle(GameMap.getActiveHexagonGridPoint(), gridPoint);

		this.invertSelected();
		this.clearPulsingTiles();
	},
	invertRing: function(gridPoint){
		Selection.selectRing(GameMap.getActiveHexagonGridPoint(), gridPoint);

		this.invertSelected();
		this.clearPulsingTiles();
	},
	updateSelection: function(placerToUpdatePoint){
		// Step one, get the placer
		var selectionType = "";
		var selectionFunction = "";

		if (this.changerData.currentChangerType === 1)
		{
			selectionType = "Line";
		}
		else if (this.changerData.currentChangerType === 2)
		{
			selectionType = "Circle";
		}
		else if (this.changerData.currentChangerType === 3)
		{
			selectionType = "Ring";
		}

		if (this.changerData.selectionIndex < 0)
		{
			for (var changer in this.placedChangers)
			{
				var changerPoint = GameMap.pixelCoordToGridCoord(this.placedChangers[changer].center);
				if (placerToUpdatePoint.x === changerPoint.x && placerToUpdatePoint.y === changerPoint.y)
				{
					this.changerData.selectionIndex = parseInt(changer);
					GameMap.setActiveHexagon(GameMap.pixelCoordToGridCoord(this.placedChangers[this.changerData.selectionIndex].center));
				}
			}

			this.changerData.currentChangerType = this.placedChangers[this.changerData.selectionIndex].tileData.changerType;

			if (this.changerData.currentChangerType === 1)
			{
				selectionType = "Line";
			}
			else if (this.changerData.currentChangerType === 2)
			{
				selectionType = "Circle";
			}
			else if (this.changerData.currentChangerType === 3)
			{
				selectionType = "Ring";
			}

			selectionFunction = "invert" + selectionType;
			if (this.placedChangers[this.changerData.selectionIndex].tileData.changerActive)
			{
				console.log (selectionFunction + " wil called");
				this[selectionFunction](this.placedChangers[this.changerData.selectionIndex].tileData.changerPoint);
			}

			Colours.startPulse();
		}

		selectionFunction = "select" + selectionType;
		this.clearPulsingTiles();
		// Check here
		// if (this.changerData.selectionTestPoint === null)
		// {
		// 	this.changerData.selectionTestPoint = this.placedChangers[this.changerData.selectionIndex].tileData.changerPoint;
		// }

		// if (GameMap.tiles[Input.mouseHexaGridPos.x][Input.mouseHexaGridPos.y].visible)
		// {
		// 	this.changerData.selectionTestPoint = Input.mouseHexaGridPos;
		// }

		// Selection[selectionFunction](GameMap.getActiveHexagonGridPoint(), this.changerData.selectionTestPoint);
		Selection[selectionFunction](GameMap.getActiveHexagonGridPoint(), Input.mouseHexaGridPos);

	},
	commitSelection: function(){
		// do the inversion and set data for changer
		if (this.changerData.currentChangerType === 1)
		{
			if (typeof Selection.tiles[1] !== "undefined")
			{
				var activePoint = GameMap.pixelCoordToGridCoord(Selection.tiles[0].center);
				var gridPoint = GameMap.pixelCoordToGridCoord(Selection.tiles[1].center);

				if (activePoint.x === gridPoint.x) // Vertical line
				{
					if (activePoint.y > gridPoint.y) // Line goes up
					{
						this.placedChangers[this.changerData.selectionIndex].tileData.changerPoint = Navigation.moveUp(activePoint);
					}
					else if (activePoint.y < gridPoint.y) // Line goeds down
					{
						this.placedChangers[this.changerData.selectionIndex].tileData.changerPoint = Navigation.moveDown(activePoint);
					}
				}
				else if (activePoint.y === gridPoint.y) //Left up, right down line
				{
					if (activePoint.x > gridPoint.x) // Left up
					{
						this.placedChangers[this.changerData.selectionIndex].tileData.changerPoint = Navigation.moveLeft(activePoint, "up");
					}
					else if (activePoint.x < gridPoint.x) // Right down
					{
						this.placedChangers[this.changerData.selectionIndex].tileData.changerPoint = Navigation.moveRight(activePoint, "down");
					}
				}
				else if (gridPoint.x - activePoint.x === activePoint.y - gridPoint.y) //Right up, left down line
				{
					if(activePoint.x < gridPoint.x) // Right up
					{
						this.placedChangers[this.changerData.selectionIndex].tileData.changerPoint = Navigation.moveRight(activePoint, "up");
					}
					else if (activePoint.x > gridPoint.x) // Left down
					{
						this.placedChangers[this.changerData.selectionIndex].tileData.changerPoint = Navigation.moveLeft(activePoint, "down");
					}
				}
			}
		}
		else
		{
			// this.setChangerData(this.changerData.selectionIndex, this.changerData.currentChangerType, this.changerData.selectionTestPoint);
			this.setChangerData(this.changerData.selectionIndex, this.changerData.currentChangerType, Input.mouseHexaGridPos);
		}

		this.invertSelected();
		Colours.stopPulse();
		this.clearPulsingTiles();
		this.placedChangers[this.changerData.selectionIndex].tileData.changerActive = true;

		this.changerData.selectionIndex = -1;
		this.changerData.currentChangerType = 0;
		GameMap.clearActiveHexagon();

		// this.changerData.selectionTestPoint = null;
	},
	invertSelected: function(){
		if (Selection.tiles.length > 0)
		{
			for (var tile in Selection.tiles)
			{
				Selection.tiles[tile].invertColour();
			}
		}
	},
	pulseSelectedTiles: function(){
		if (Selection.tiles.length > 0)
		{
			for (var tile in Selection.tiles)
			{
				if (tile == "0")
				{
					Selection.tiles[tile].tileData.pulseType = "white";
				}
				else
				{
					Selection.tiles[tile].tileData.pulseType = "grey";
				}
				Selection.tiles[tile].pulsing = true;
			}
		}
	},
	clearPulsingTiles: function(){
		if (Selection.tiles.length > 0)
		{
			for (var tile in Selection.tiles)
			{
				Selection.tiles[tile].pulsing = false;
			}

			Selection.clearSelection();
		}
	},
	pointOverMenu: function(testPoint){
		if (this.active)
		{
			if ((testPoint.x >= this.blockPosition.x && testPoint.x <= this.blockPosition.x + this.menuWidth) &&
				(testPoint.y >= this.blockPosition.y && testPoint.y <= this.blockPosition.y + this.menuHeight))
			{
				return true;
			}
		}

		return false;
	},
	pointOverButton: function(testPoint, buttonNumber){
		if (this.active)
		{
			var buttonPosX = this.blockPosition.x + this.buttonOffset + ((this.buttonOffset + this.buttonWidth) * (buttonNumber - 1));
			var buttonPosY = this.blockPosition.y + this.buttonOffset;

			if ((testPoint.x >= buttonPosX && testPoint.x <= buttonPosX + this.buttonWidth) &&
				(testPoint.y >= buttonPosY && testPoint.y <= buttonPosY + this.buttonHeight))
			{
				return true;
			}
		}

		return false;
	},
	setPosition: function(){
		this.activeHexIndexs = {row: Input.mouseHexaGridPos.x, col: Input.mouseHexaGridPos.y};
		this.blockPosition = HexagonalGridSystem.externalGridCoordToPixelCoord(Input.mouseHexaGridPos, GameMap.gridCenter, GameMap.hexRadius);

		if (this.blockPosition.x < this.menuWidth / 2)
		{
			this.blockPosition.x -= this.menuWidth * 0.25;
		}
		else if (this.blockPosition.x > MainGame.stageWidth - (this.menuWidth / 2))
		{
			this.blockPosition.x -= this.menuWidth * 0.75;
		}
		else
		{
			this.blockPosition.x -= this.menuWidth / 2;
		}

		if (this.blockPosition.y > GameMap.hexRadius * 4)
		{
			this.blockPosition.y -= this.menuHeight + GameMap.hexRadius;
		}
		else
		{
			this.blockPosition.y += GameMap.hexRadius;
		}
	},
	removeAllChangers: function(){
		this.placedChangers = [];
		var levelData = LevelData.getLevel(LevelBuilder.currentLevel);

		for (var i = 0; i < 3; i++)
		{
			this.availableChangers[i] = levelData.changers[i];
		}
	},
	destroyMenu: function()
	{
		if (this.active)
		{
			this.active = false;
			this.blockPosition = null;
			this.visualHex = null;
			GameMap.clearActiveHexagon();
			this.changerData.activeHexChangerIndex = -1;

			this.updateMouseOverStates();
		}
	},
	updateMouseOverStates: function(){
		// This function gets the roll over states of the tiles going when the menu is closed
		// Find the changer that is here
		var changerAt = -1;
		if (this.placedChangers.length > 0)
		{
			for (var changer in this.placedChangers)
			{
				var changerPoint = GameMap.pixelCoordToGridCoord(this.placedChangers[changer].center);
				if (this.activeHexIndexs.row === changerPoint.x && this.activeHexIndexs.col === changerPoint.y)
				{
					// Found the changer
					changerAt = parseInt(changer);
				}
			}
		}

		if (!GameMap.tiles[this.activeHexIndexs.row][this.activeHexIndexs.col].animating)
			GameMap.tiles[this.activeHexIndexs.row][this.activeHexIndexs.col].mouseOver = true;

		GameMap.onMouseOut(GameMap.tiles[this.activeHexIndexs.row][this.activeHexIndexs.col]);
		this.activeHexIndexs = null;

		// Animate hove over
		for (var row in GameMap.tiles)
		{
			for (var col in GameMap.tiles[row])
			{
				if (GameMap.tiles[row][col].mouseOver === true && !GameMap.tiles[row][col].animating)
				{
					GameMap.tiles[row][col].mouseOver = false;
					GameMap.onMouseOver(GameMap.tiles[row][col]);
				}
			}
		}
	}
};