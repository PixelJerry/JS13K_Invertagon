// Level.js

var LevelData = {
	_1: {
		changers: [1, 0, 0],
		tiles: [0, 0, 0, 1, 0, -3, 0, -2, 0, -1, 1, 0, 1, -3, 1, -2, 1, -1, 2, -3, 2, -2, 2, -1, -2, 0, -2, 1, -2, -1, -1, 0, -1, 1, -1, -2, -1, -1],
		colours: [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
		hints: [0, -1]
	},
	_2: {
		changers: [0, 1, 0],
		tiles: [0, 0, 0, 1, 0, 2, 0, 3, 0, -3, 0, -2, 0, -1, 1, 0, 1, 1, 1, 2, 1, -3, 1, -2, 1, -1, 2, 0, 2, 1, 2, -3, 2, -2, 2, -1, 3, 0, 3, -3, 3, -2, 3, -1, -3, 0, -3, 1, -3, 2, -3, 3, -2, 0, -2, 1, -2, 2, -2, 3, -2, -1, -1, 0, -1, 1, -1, 2, -1, 3, -1, -2, -1, -1],
		colours: [2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1],
		hints: [0, 0]
	},
	_3: {
		changers: [0, 0, 1],
		tiles: [0, 0, 0, 1, 0, 2, 0, 3, 0, -3, 0, -2, 0, -1, 1, 0, 1, 1, 1, 2, 1, -3, 1, -2, 1, -1, 2, 0, 2, 1, 2, -3, 2, -2, 2, -1, 3, 0, 3, -3, 3, -2, 3, -1, -3, 0, -3, 1, -3, 2, -3, 3, -2, 0, -2, 1, -2, 2, -2, 3, -2, -1, -1, 0, -1, 1, -1, 2, -1, 3, -1, -2, -1, -1],
		colours: [3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0],
		hints: [0, 0]
	},
	_4: {
		changers: [3, 0, 0],
		tiles: [0, 0, 0, 1, 0, 2, 0, -2, 0, -1, 1, 0, 1, 1, 1, 2, 1, -2, 1, -1, 2, 0, 2, 1, 2, -1, 3, 0, 3, -2, 3, -1, 4, -2, 4, -1, -4, 2, -4, 3, -3, 1, -3, 2, -3, 3, -2, 1, -2, 2, -2, 3, -1, 0, -1, 1, -1, 2, -1, 3, -1, -1],
		colours: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
		hints: [0, 1, -1, 2, 1, 1]
	},
	_5: {
		changers: [0, 2, 0],
		tiles: [0, 0, 0, 1, 0, 2, 0, 3, 0, -3, 0, -2, 0, -1, 1, 0, 1, 1, 1, 2, 1, -3, 1, -2, 1, -1, 2, 0, 2, 1, 2, -3, 2, -2, 2, -1, 3, 0, 3, -3, 3, -2, 3, -1, 4, -3, 4, -2, 4, -1, -3, 0, -3, 1, -3, 2, -3, 3, -2, 0, -2, 1, -2, 2, -2, 3, -2, -1, -1, 0, -1, 1, -1, 2, -1, 3, -1, -2, -1, -1],
		colours: [2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1, 2, 0, 2, 1, 2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1],
		hints: [0, 0, 2, -1]
	},
	_6: {
		changers: [0, 0, 2],
		tiles: [0, 0, 0, 1, 0, 2, 0, -2, 0, -1, 1, 0, 1, 1, 1, 2, 1, -3, 1, -2, 1, -1, 2, 0, 2, 1, 2, 2, 2, -4, 2, -3, 2, -2, 2, -1, 3, 0, 3, 1, 3, -4, 3, -3, 3, -2, 3, -1, 4, 0, 4, -4, 4, -3, 4, -2, 4, -1, 5, -4, 5, -3, 5, -2, 5, -1, -5, 2, -5, 3, -4, 1, -4, 2, -4, 3, -3, 0, -3, 1, -3, 2, -3, 3, -2, 0, -2, 1, -2, 2, -2, 3, -2, -1, -1, 0, -1, 1, -1, 2, -1, -1],
		colours: [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 0, 3, 1, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0],
		hints: [2, -1, -2, 1]
	},
	_7: {
		changers: [1, 0, 1],
		tiles: [0, 0, 0, 1, 0, 2, 0, 3, 0, -3, 0, -1, 1, 0, 1, 2, 1, -3, 1, -1, 2, 1, 2, -3, 2, -2, 3, 0, 3, -3, 3, -2, 3, -1, 4, -4, 5, -5, -5, 5, -4, 4, -3, 0, -3, 1, -3, 2, -3, 3, -2, 0, -2, 3, -2, -1, -1, 0, -1, 1, -1, 3, -1, -2],
		colours: [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
		hints: [0, 0, -4, 4]
	},
	_8: {
		changers: [2, 0, 2],
		tiles: [0, 0, 0, 2, 0, -2, 1, 0, 1, 1, 1, -2, 1, -1, 2, 0, 2, 1, 2, -3, 2, -2, 3, 0, 3, 1, 3, -4, 3, -3, 4, 0, 4, -4, 4, -2, -4, 0, -4, 2, -4, 4, -3, 0, -3, 3, -3, 4, -3, -1, -2, 0, -2, 2, -2, 3, -2, -1, -1, 0, -1, 1, -1, 2, -1, -1],
		colours: [2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1],
		hints: [-4, 2, 4, -2, -3, 3, 3, 0]
	},
	_9: {
		changers: [2, 2, 1],
		tiles: [0, 0, 0, 1, 0, 2, 0, -2, 0, -1, 1, 0, 1, 1, 1, -2, 1, -1, 4, 0, 4, -4, 5, 0, 5, -5, -5, 0, -5, 5, -4, 0, -4, 4, -1, 0, -1, 1, -1, 2, -1, -1],
		colours: [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1],
		hints: [0, 0, 0, -2, 0, 2, -5, 5, 5, 0]
	},
	_10: {
		changers: [1, 1, 1],
		tiles: [0, 0, 0, 1, 0, 2, 0, -2, 0, -1, 1, -2, 2, -4, 2, -2, 2, -1, 3, -4, 4, -4, 4, -3, 4, -2, -4, 2, -4, 3, -4, 4, -3, 4, -2, 1, -2, 2, -2, 4, -1, 2],
		colours: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
		hints: [0, 0, -4, 4, 4, -4]
	},
	_11: {
		changers: [2, 1, 1],
		tiles: [0, 1, 0, -1, 1, -2, 2, -3, 3, 0, 3, -4, 3, -1, 4, -3, 4, -2, 4, -1, 5, -4, 5, -3, -4, 1, -4, 3, -3, 0, -3, 2, -2, 0, -2, 1, -2, 2, -2, 3, -2, -1, -1, 0, -1, 2],
		colours: [2, 1, 2, 0, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 1, 2, 1],
		hints: [-2, 1, 4, -2, -2, 3, 2, -3]
	},
	_12: {
		changers: [2, 1, 1],
		tiles: [0, 1, 0, -1, 1, 0, 1, 1, 1, -2, 1, -1, 2, -3, 2, -1, 3, -2, 3, -1, 4, -1, -5, 1, -5, 2, -5, 3, -5, 4, -4, 0, -4, 1, -4, 3, -4, 4, -3, 0, -3, 3, -3, 4, -3, -1, -2, 1, -1, 0, -1, 1],
		colours: [3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1],
		hints: [-2, 1, -4, 1, -4, 3, 2, -1]
	},
	_13: {
		changers: [2, 2, 1],
		tiles: [0, 0, 0, 1, 0, -1, 1, 0, 1, 1, 1, -2, 1, -1, 2, 0, 2, -2, 2, -1, 3, 1, 3, -4, 4, 0, 4, -4, 4, -3, 4, -1, -4, 0, -4, 1, -4, 3, -4, 4, -3, 4, -3, -1, -2, 0, -2, 1, -2, 2, -1, 0, -1, 1, -1, 2, -1, -1],
		colours: [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
		hints: [0, 0, -2, 1, 2, -1, -4, 0, 4, -4]
	},
	_14: {
		changers: [0, 1, 3],
		tiles: [0, 0, 0, 1, 0, 2, 0, 3, 0, -3, 1, 1, 1, 2, 1, -3, 1, -2, 1, -1, 2, 1, 2, -3, 2, -2, 2, -1, 3, 0, 3, -3, 3, -2, 3, -1, -3, 0, -3, 1, -3, 2, -3, 3, -2, 0, -2, 1, -2, 3, -2, -1, -1, 0, -1, 2, -1, 3, -1, -2, -1, -1],
		colours: [2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
		hints: [0, 0, -3, 0, 3, -3, 0, 3]
	},
	_15: {
		changers: [2, 2, 1],
		tiles: [0, 0, 0, 2, 0, 3, 0, -3, 0, -2, 1, 1, 1, -2, 2, 0, 2, 1, 2, -3, 2, -2, 2, -1, 3, 0, 3, -3, 4, 1, 4, -5, 5, 0, 5, -5, 5, -4, 5, -1, -5, 0, -5, 1, -5, 4, -5, 5, -4, 5, -4, -1, -3, 0, -3, 3, -2, 0, -2, 1, -2, 2, -2, 3, -2, -1, -1, 2, -1, -1],
		colours: [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 1, 3, 1, 3, 0, 3, 1, 3, 1, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1, 3, 0, 3, 0, 3, 0, 3, 1, 3, 1, 3, 1, 3, 1],
		hints: [0, 0, 0, -2, 0, 2, -5, 5, 5, 0]
	},


	getLevel: function(level){
		if (this.validLevel(level))
		{
			return this["_" + level];
		}
		else
		{
			console.log ("Level " + level + " does not exist, loading level 1 data.");
			return this._1;
		}
	},
	validLevel: function(levelNumber){
		if (typeof this[["_" + levelNumber]] !== "undefined")
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	getHintPosition: function(hintNumber){
		// get current level data
		var currentLevelData = this.getLevel(LevelBuilder.currentLevel);
		var hintPosition = new Point(99, 99);
		var hintIndex = (hintNumber - 1) * 2;

		if (typeof currentLevelData.hints[hintIndex] !== "undefined")
		{
			hintPosition.x = currentLevelData.hints[hintIndex];
			hintPosition.y = currentLevelData.hints[hintIndex +1];
		}

		return hintPosition;
	},

};

var LevelBuilder = {
	editColour: Colours.darkGrey,
	currentLevel: 1,

	build: function(levelData){
		// Build the level with this data
		for (var i = 0; i < levelData.tiles.length; i += 2)
		{
			this.setTile({x: levelData.tiles[i], y: levelData.tiles[i + 1]}, {col: levelData.colours[i], inv: levelData.colours[i + 1]});
		}

		for (var i2 = 0; i2 < 3; i2++)
		{
			Changers.availableChangers[i2] = levelData.changers[i2];
		}
	},
	report: function(){
		// report positions
		var positions = [];
		var colours = [];

		for (var row in GameMap.tiles)
		{
		    for (var col in GameMap.tiles[row])
		    {
		        if (GameMap.tiles[row][col].visible && GameMap.tiles[row][col].getFill() !== Colours.darkGrey)
		        {
		            positions[positions.length] = parseInt(row);
		            positions[positions.length] = parseInt(col);

		            var colourCode = this.getColourCode(GameMap.tiles[row][col].getFill());
		            colours[colours.length] = colourCode.col;
		            colours[colours.length] = colourCode.inv;
		        }
		    }
		}

		console.log ("-- Positions --");
		console.log (positions);

		console.log ("-- Colours --");
		console.log (colours);
	},
	setTile: function(gridPoint, colourCode){
		if (typeof GameMap.tiles[gridPoint.x] === "undefined")
		{
			console.log ("Creating tile array");
			GameMap.tiles[gridPoint.x] = [];
		}

		// get the colour from code
		var colourToSet = Colours.red;
		var inverted = false;

		if (colourCode.inv === 1)
		{
			inverted = true;
		}
		
		if (colourCode.col === 2)
		{
			colourToSet = Colours.green;
		}
		else if (colourCode.col === 3)
		{
			colourToSet = Colours.blue;
		}

		if (colourCode.inv === 0) // false
		{
			GameMap.tiles[gridPoint.x][gridPoint.y].tileData.inverted = false;
			GameMap.tiles[gridPoint.x][gridPoint.y].setFill(colourToSet);
			GameMap.tiles[gridPoint.x][gridPoint.y].setStroke(Colours.darken(colourToSet), GameMap.tiles[gridPoint.x][gridPoint.y].strokeWidth);
		}
		else
		{
			GameMap.tiles[gridPoint.x][gridPoint.y].tileData.inverted = true;
			GameMap.tiles[gridPoint.x][gridPoint.y].setFill(Colours.invertColour(colourToSet));
			GameMap.tiles[gridPoint.x][gridPoint.y].setStroke(Colours.darken(Colours.invertColour(colourToSet)), GameMap.tiles[gridPoint.x][gridPoint.y].strokeWidth);
		}

		// GameMap.tiles[gridPoint.x][gridPoint.y].visible = true;
		GameMap.tiles[gridPoint.x][gridPoint.y].tileData.primaryColour = colourToSet;
	},
	getColourCode: function(colour){
		// col is colour, RGB represented by 1, 2 and 3
		// inv is wether or not the colour is inverted. 0 false, 1 true
		var colourCombo = {col: -1, inv: -1};

		switch (colour){
			case Colours.red:
			    colourCombo.col = 1;
			    colourCombo.inv = 0;
			    break;
			case Colours.green:
			    colourCombo.col = 2;
			    colourCombo.inv = 0;
			    break;
		    case Colours.blue:
			    colourCombo.col = 3;
			    colourCombo.inv = 0;
			    break;
		    case Colours.cyan:
			    colourCombo.col = 1;
			    colourCombo.inv = 1;
			    break;
		    case Colours.purple:
			    colourCombo.col = 2;
			    colourCombo.inv = 1;
			    break;
		    case Colours.yellow:
			    colourCombo.col = 3;
			    colourCombo.inv = 1;
			    break;
		}

		return colourCombo;
	},
	nextLevel: function(){
		this.currentLevel++;

		if (typeof LevelData["_" + this.currentLevel] === "undefined")
		{
			console.log ((this.currentLevel - 1) + " was the last level.");
			// Go to main menu
			MainGame.startState("mainMenu");
		}
		else
		{
			this.build(LevelData.getLevel(LevelBuilder.currentLevel));
		}
	}
};