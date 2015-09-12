// Selection.js

var Selection = {
	// selected tiles
	tiles: [],
	maxCircleSize: 2,
	lastValidLineType: ["moveUp", "up"],

	black: function(){
		for (var tile in this.tiles)
		{
			this.tiles[tile].setFill("rgba(0,0,0,1)");
		}
	},
	// Type is an intager:
	//  1 == line
	//  2 == circle
	//  3 == ring
	selectByType: function(gridStartPoint, gridDestinationPoint, type){
		if (type === 1)
		{
			this.selectLine(gridStartPoint, gridDestinationPoint);
		}
		else if (type === 2)
		{
			this.selectCircle(gridStartPoint, gridDestinationPoint);
		}
		else if (type === 3)
		{
			this.selectRing(gridStartPoint, gridDestinationPoint);
		}
	},
	selectLine: function(gridStartPoint, gridDestinationPoint){
		// Set first tile
		this.tiles[this.tiles.length] = GameMap.tiles[gridStartPoint.x][gridStartPoint.y];
		// Start with up direction
		var activePoint = GameMap.pixelCoordToGridCoord(this.tiles[0].center);
		var testPoint = new Point(activePoint.x, activePoint.y);
		var mainDirection = "moveUp";
		var secondaryDirection = "up";

		if (activePoint.x === gridDestinationPoint.x) // Vertical line
		{
			if (activePoint.y > gridDestinationPoint.y) // Line goes up
			{
				mainDirection = "moveUp";
				secondaryDirection = "up";
				this.lastValidLineType = [mainDirection, secondaryDirection];
			}
			else if (activePoint.y < gridDestinationPoint.y) // Line goeds down
			{
				mainDirection = "moveDown";
				secondaryDirection = "up";
				this.lastValidLineType = [mainDirection, secondaryDirection];
			}
		}
		else if (activePoint.y === gridDestinationPoint.y) //Left up, right down line
		{
			if (activePoint.x > gridDestinationPoint.x) // Left up
			{
				mainDirection = "moveLeft";
				secondaryDirection = "up";
				this.lastValidLineType = [mainDirection, secondaryDirection];
			}
			else if (activePoint.x < gridDestinationPoint.x) // Right down
			{
				mainDirection = "moveRight";
				secondaryDirection = "down";
				this.lastValidLineType = [mainDirection, secondaryDirection];
			}
		}
		else if (gridDestinationPoint.x - activePoint.x === activePoint.y - gridDestinationPoint.y) //Right up, left down line
		{
			if(activePoint.x < gridDestinationPoint.x) // Right up
			{
				mainDirection = "moveRight";
				secondaryDirection = "up";
				this.lastValidLineType = [mainDirection, secondaryDirection];
			}
			else if (activePoint.x > gridDestinationPoint.x) // Left down
			{
				mainDirection = "moveLeft";
				secondaryDirection = "down";
				this.lastValidLineType = [mainDirection, secondaryDirection];
			}
		}
		else
		{
			if (GameMap.changeSelection && Input.dragging)
			{
				mainDirection = this.lastValidLineType[0];
				secondaryDirection = this.lastValidLineType[1];
			}
		}

		// Now I need to add the selected tiles to the array
		do {
			testPoint = Navigation[mainDirection](testPoint, secondaryDirection);

			if (GameMap.validTile(testPoint))
			{
				this.tiles[this.tiles.length] = GameMap.tiles[testPoint.x][testPoint.y];
			}
		} while (GameMap.validTile(testPoint));
	},
	selectCircle: function(gridStartPoint, gridDestinationPoint){
		// Set the first selection
		this.tiles[this.tiles.length] = GameMap.tiles[gridStartPoint.x][gridStartPoint.y];
		var midPoint = GameMap.pixelCoordToGridCoord(this.tiles[0].center);

		// Max circle size (distance from origin)
		var distanceToPoint = HexagonalGridSystem.distance(midPoint, gridDestinationPoint);
		if (distanceToPoint > this.maxCircleSize) // Can not have a biger selection than the max
		{
			distanceToPoint = this.maxCircleSize;
		}
		else if (distanceToPoint === 0) // can not have only one tile selected
		{
			distanceToPoint = 1;
		}

		// Fill selection array according to size
		var numberOfRuns = distanceToPoint;
		for (var i = 0; i < numberOfRuns; i++)
		{
			this.addRingToSelection(midPoint, distanceToPoint);

			distanceToPoint--;
		}
	},
	selectRing: function(gridStartPoint, gridDestinationPoint){
		// Set the first selection
		this.tiles[this.tiles.length] = GameMap.tiles[gridStartPoint.x][gridStartPoint.y];
		var midPoint = GameMap.pixelCoordToGridCoord(this.tiles[0].center);

		// Max circle size (distance from origin)
		var distanceToPoint = HexagonalGridSystem.distance(midPoint, gridDestinationPoint);
		// console.log ("Distance = " + distanceToPoint);

		if (distanceToPoint < 2) // can only select rings that are 2 or more away.
		{
			distanceToPoint = 2;
		}

		this.addRingToSelection(midPoint, distanceToPoint);
	},
	addRingToSelection: function (ringMidPoint, distanceToPoint){
		// get the starting point
		var startPoint = new Point(ringMidPoint.x, ringMidPoint.y - distanceToPoint);
		var testPoint = new Point(startPoint.x, startPoint.y);

		if (GameMap.validTile(testPoint))
		{
			this.tiles[this.tiles.length] = GameMap.tiles[testPoint.x][testPoint.y];
		}

		var j = distanceToPoint;
		for (j = distanceToPoint; j > 0; j--)
		{
			testPoint = Navigation.moveLeft(testPoint, "down");
			if (GameMap.validTile(testPoint))
			{
				this.tiles[this.tiles.length] = GameMap.tiles[testPoint.x][testPoint.y];
			}
		}

		for (j = distanceToPoint; j > 0; j--)
		{
			testPoint = Navigation.moveDown(testPoint);
			if (GameMap.validTile(testPoint))
			{
				this.tiles[this.tiles.length] = GameMap.tiles[testPoint.x][testPoint.y];
			}
		}

		for (j = distanceToPoint; j > 0; j--)
		{
			testPoint = Navigation.moveRight(testPoint, "down");
			if (GameMap.validTile(testPoint))
			{
				this.tiles[this.tiles.length] = GameMap.tiles[testPoint.x][testPoint.y];
			}
		}

		for (j = distanceToPoint; j > 0; j--)
		{
			testPoint = Navigation.moveRight(testPoint, "up");
			if (GameMap.validTile(testPoint))
			{
				this.tiles[this.tiles.length] = GameMap.tiles[testPoint.x][testPoint.y];
			}
		}

		for (j = distanceToPoint; j > 0; j--)
		{
			testPoint = Navigation.moveUp(testPoint);
			if (GameMap.validTile(testPoint))
			{
				this.tiles[this.tiles.length] = GameMap.tiles[testPoint.x][testPoint.y];
			}
		}

		for (j = distanceToPoint; j > 0; j--)
		{
			testPoint = Navigation.moveLeft(testPoint, "up");
			if (GameMap.validTile(testPoint) && testPoint.x !== startPoint.x)
			{
				// console.log ("Returning to starting point.");
				this.tiles[this.tiles.length] = GameMap.tiles[testPoint.x][testPoint.y];
			}
		}
	},
	// Clear the current selection
	clearSelection: function(){
		this.tiles = [];
	}
};