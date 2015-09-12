//Hexagon.js

// http://www.redblobgames.com/grids/hexagons/
var Hexagon = function(radius, centerX, centerY)
{
    this.SIDES = 6;

    this.radius = radius;
    this.center = new Point(centerX, centerY);
    this.mouseOver = false;
    this.selected = false;
    this.pulsing = false;
    this.visible = true;

    this.width = this.radius * 2;
    this.height = (Math.sqrt(3) / 2) * this.width;

    this.strokeColour = "rgba(0,0,0,1)";
    this.fillColour = "rgba(128,128,128,1)";
    this.strokeWidth = 0.5;

    this.invertAnimTime = 150;

    this.tileData = {
        primaryColour: Colours.white,
        pulseType: "grey",
        inverted: false,

        changerType: -1,
        changerPoint: new Point(999, 999),
        changerActive: false
    };

    this.animationTime = 150;
};

Hexagon.prototype = {
    draw: function(canvasID)
    {
        if (!this.visible)
        {
            return;
        }

        var ctx = document.getElementById(canvasID).getContext("2d");

        ctx.beginPath();
        var angle = 2 * Math.PI / this.SIDES * 0;

        ctx.moveTo(this.center.x + this.radius * Math.cos(angle), this.center.y + this.radius * Math.sin(angle));

        for (var i = 1; i <= this.SIDES; i++)
        {
            angle = 2 * Math.PI / this.SIDES * i;
            ctx.lineTo(this.center.x + this.radius * Math.cos(angle), this.center.y + this.radius * Math.sin(angle));
        }

        ctx.strokeStyle = this.strokeColour;
        ctx.fillStyle = Colours.colourPulse.pulse(this, this.tileData.pulseType);
        ctx.lineWidth = this.strokeWidth;

        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    },
    setStroke: function(colour, lineWidth)
    {
        this.strokeColour = colour;
        this.strokeWidth = lineWidth;
    },
    setFill: function(colour)
    {
        this.fillColour = colour;
    },
    setColour: function(colour)
    {
        this.setFill(colour);
        this.setStroke(Colours.darken(colour), this.strokeWidth);
    },
    setRadius: function(newRadius) {
        this.radius = newRadius;
    },
    setCenter: function(newX, newY) {
        this.center.x = newX;
        this.center.y = newY;
    },
    setCenterFromPoint: function(newPoint) {
        this.setCenter(newPoint.x, newPoint.y);
    },
    setTileData: function(colour, invert){
        this.tileData.primaryColour = colour;
        this.tileData.inverted = invert;
    },
    invertColour: function(){
        if (this.visible)
        {
            this.tileData.inverted = !this.tileData.inverted;

            var newColour = this.tileData.primaryColour;
            if (this.tileData.inverted)
            {
                newColour = Colours.invertColour(this.tileData.primaryColour);
            }

            Motion.tileFade(this, newColour, Colours.darken(newColour), this.invertAnimTime);

            // this.fillColour = Colours.invertColour(this.fillColour);
            // this.strokeColour = Colours.darken(this.fillColour);
        }
    },
    getFill: function()
    {
        return this.fillColour;
    },
    getStrokeColour: function()
    {
        return this.strokeColour;
    },
    getStrokeWidth: function()
    {
        return this.strokeWidth;
    },
    calculateDimentions: function()
    {
        this.width = this.radius * 2;
        this.height = (Math.sqrt(3) / 2) * this.width;
    },
    getHeight: function()
    {
        return this.height;
    },
    getWidth: function()
    {
        return this.width;
    }
};