// HexagonalGridSystem.js

//http://www.redblobgames.com/grids/hexagons
var HexagonalGridSystem = {
    calculateHexagonWidth: function(radius) {
        return radius * 2;
    },
    calculateHexagonHeight: function(radius) {
        return (Math.sqrt(3) / 2) * this.calculateHexagonWidth(radius);
    },
    gridCoordToPixelCoord: function(gridPoint, gridCenterPoint, radius) {
        return this.externalGridCoordToPixelCoord(gridPoint, gridCenterPoint, radius);
    },
    pixelCoordToGridCoord: function(pixelPoint, gridCenterPosition, radius) {
        return this.externalPixelCoordToGridCoord(pixelPoint, gridCenterPosition, radius);
    },
    externalGridCoordToPixelCoord: function(gridPoint, gridCenterPoint, radius) {
        if (typeof gridCenterPoint === "undefined")
        {
            gridCenterPoint = new Point(0, 0);
        }
        
        //http://www.redblobgames.com/grids/hexagons/#hex-to-pixel
        var pixelX = 0;
        var pixelY = 0;

        pixelX = radius * 3/2 * gridPoint.x;
        pixelY = radius * Math.sqrt(3) * (gridPoint.y + gridPoint.x / 2);

        return new Point(pixelX + gridCenterPoint.x, pixelY + gridCenterPoint.y);
    },
    externalPixelCoordToGridCoord: function(pixelPoint, gridCenterPosition, radius)
    {
        if (typeof gridCenterPosition === "undefined")
        {
            gridCenterPosition = new Point(0, 0);
        }

        pPoint = new Point(pixelPoint.x, pixelPoint.y);
        
        pPoint.x -= gridCenterPosition.x;
        pPoint.y -= gridCenterPosition.y;
        
        var axialPoint = new Point(0, 0);
        // Step 1: find Approximate Location
        axialPoint.x = (2 / 3) * pPoint.x / radius;
        axialPoint.y = ((1 / 3) * Math.sqrt(3) * pPoint.y - (1/3) * pPoint.x) / radius;
        
        // Step 2: Find the nearest hex (using hex rounding)
        // http://www.redblobgames.com/grids/hexagons/#rounding
        var roundedCoords = this.hexRound(this.convertAxialToCube(axialPoint));
        
        return this.convertCubeToAxial(roundedCoords);
    },
    distance: function(pointA, pointB){
        var cubeA = this.convertAxialToCube(pointA);
        var cubeB = this.convertAxialToCube(pointB);

        return this.cubeDistance(cubeA, cubeB);
    },
    cubeDistance: function(cubePointA, cubePointB){
        return (Math.abs(cubePointA.x - cubePointB.x) + Math.abs(cubePointA.y - cubePointB.y) + Math.abs(cubePointA.z - cubePointB.z)) / 2;
    },
    hexRound: function(inputCubePoint)
    {
        // http://www.redblobgames.com/grids/hexagons/#rounding
        var roundedPoint = {x: Math.round(inputCubePoint.x), y: Math.round(inputCubePoint.y), z: Math.round(inputCubePoint.z)};
        var pointDiff = {x: Math.abs(roundedPoint.x - inputCubePoint.x), y: Math.abs(roundedPoint.y - inputCubePoint.y), z: Math.abs(roundedPoint.z - inputCubePoint.z)};
        
        if (pointDiff.x > pointDiff.y && pointDiff.x > pointDiff.z)
        {
            roundedPoint.x = -roundedPoint.y - roundedPoint.z;
        }
        else if (pointDiff.y > pointDiff.z)
        {
            roundedPoint.y = -roundedPoint.x - roundedPoint.z;
        }
        else
        {
            roundedPoint.z = -roundedPoint.x - roundedPoint.y;
        }
        
        return roundedPoint;
    },
    convertAxialToCube: function(axialCoord){
        // Returns a cube coordinate point
        return {x: axialCoord.x, y: axialCoord.y, z: -axialCoord.x - axialCoord.y};
    },
    convertCubeToAxial: function(cubeCoord){
        // Returns an axial coordinate point
        return new Point(cubeCoord.x, cubeCoord.y);
    }
};