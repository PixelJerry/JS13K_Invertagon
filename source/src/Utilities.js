// Utilities.js

var requestAnimation = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

function createCanvas(width, heigth, canvasID, elementID){
    console.log ("Creating a new canvas element named " + canvasID);
    var newCanvas = document.createElement('canvas');
    //Making sure the canvas will render ontop of other canvases
    newCanvas.style.position = "absolute";
    
    newCanvas.id     = canvasID;
    newCanvas.width  = width;
    newCanvas.height = heigth;
    newCanvas.style.top = "0px";

    if (typeof elementID !== 'undefined')
    {
        document.getElementById(elementID).appendChild(newCanvas);
    }
    else
    {
        document.body.appendChild(newCanvas);
    }
}

function deleteCanvas(canvasID){
    if (canvasID !== null && document.getElementById(canvasID) !== null) //Will be null on startup
    {
        console.log ("Deleting the " + canvasID + " canvas element.");
        document.getElementById(canvasID).parentNode.removeChild(document.getElementById(canvasID));
    }
}

function rgbaStringToSet(rgbString) {
    var cleanString = rgbString.substring(rgbString.indexOf("(") +1, rgbString.lastIndexOf(")"));
    var rgbaValues = cleanString.split(",");

    var rgbaSet ={
        r: parseInt(rgbaValues[0]),
        g: parseInt(rgbaValues[1]),
        b: parseInt(rgbaValues[2]),
        a: parseFloat(rgbaValues[3])
    };

    return rgbaSet;
}

function rgbaSetToString(rgbaSet) {
    return "rgba(" + rgbaSet.r + "," + rgbaSet.g + "," + rgbaSet.b + "," + rgbaSet.a + ")";
}

function keepWithinRange(value, min, max)
{
    if (value < min)
    {
        value = min;
    }
    else if (value > max)
    {
        value = max;
    }

    return value;
}

var Point = function(pX, pY)
{
    if (typeof pX === "undefined")
    {
        this.x = null;
    }
    else
    {
        this.x = pX;
    }

    if (typeof pY === "undefined")
    {
        this.y = null;
    }
    else
    {
        this.y = pY;
    }
};

Point.prototype = {
    equals: function(otherPoint)
    {
        this.x = otherPoint.x;
        this.y = otherPoint.y;
    },
    set: function(pX, pY)
    {
        this.x = pX;
        this.y = pY;
    },
    distance: function(otherPoint)
    {
        return (Math.sqrt(Math.pow((this.x - otherPoint.x), 2) + Math.pow((this.y - otherPoint.y), 2)));
    }
};