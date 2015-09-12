// MapNavigation.js

var Navigation = {
    moveUp: function(startingGridIndex, placeHolder){
        var destination = new Point(0, 0);

        destination.x = startingGridIndex.x;
        destination.y = startingGridIndex.y - 1;
        
        return destination;
    },
    moveDown: function(startingGridIndex, placeHolder){
        var destination = new Point(0, 0);

        destination.x = startingGridIndex.x;
        destination.y = startingGridIndex.y + 1;
        
        return destination;
    },
    moveLeft: function(startingGridIndex, directionPreference){
        var destination = new Point(0, 0);
        if (typeof directionPreference === "undefined")
        {
            directionPreference = "up";
        }

        if (directionPreference.indexOf("u") === 0)
        {
            // move up and left
            destination.x = startingGridIndex.x - 1;
            destination.y = startingGridIndex.y;
        }
        else
        {
            // move down and left
            destination.x = startingGridIndex.x - 1;
            destination.y = startingGridIndex.y + 1;
        }
        
        return destination;
    },
    moveRight: function(startingGridIndex, directionPreference){
        var destination = new Point(0, 0);

        if (typeof directionPreference === "undefined")
        {
            directionPreference = "up";
        }

        if (directionPreference.indexOf("u") === 0)
        {
            // move up and right
            destination.x = startingGridIndex.x + 1;
            destination.y = startingGridIndex.y - 1;
        }
        else
        {
            // move down and right
            destination.x = startingGridIndex.x + 1;
            destination.y = startingGridIndex.y;
        }
        
        return destination;
    },
    jumpLeft: function(startingGridIndex){
        var destination = this.moveLeft(startingGridIndex, "up");
        return this.moveLeft(destination, "down");
    },
    jumpRight: function(startingGridIndex){
        var destination = this.moveRight(startingGridIndex, "up");
        return this.moveRight(destination, "down");
    }
};