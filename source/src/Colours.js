// Colours.js

var Colours = {
	white: "rgba(206,211,207,1)",
	lightGrey: "rgba(76,76,79,1)",
	grey: "rgba(131,131,141,1)",
	darkGrey: "rgba(43,43,47,1)",
	black: "rgba(22,23,27,1)",
	red: "rgba(251,72,102,1)",
	darkRed: "rgba(176,45,67,1)",
	green: "rgba(84,254,67,1)",
	darkGreen: "rgba(52,182,39,1)",
	blue: "rgba(51,195,251,1)",
	darkBlue: "rgba(29,125,163,1)",
	cyan: "rgba(86,248,199,1)",
	darkCyan: "rgba(30,157,119,1)",
	purple: "rgba(246,92,246,1)",
	darkPurple: "rgba(157,33,157,1)",
	yellow: "rgba(248,211,111,1)",
	darkYellow: "rgba(130,103,31,1)",
	burntGreen: "rgba(6,65,44,1)",
	lightBurntGreen: "rgba(9,103,73,1)",
	burntRed: "rgba(48,8,17,1)",
	burntCyan: "rgba(10,112,117,1)",
	burntBlue: "rgba(25,33,75,1)",
	none: "rgba(0, 0, 0, 0)",
	colourPulse: {
		lightening: true,
		pulsing: false,
		timer: null,
		white: "rgba(0,0,0,0)",
		grey: "rgba(0,0,0,0)",

		pulse: function(tile, colour){
			if (tile.pulsing && this.pulsing)
			{
				return this[colour];
			}
			
			return tile.getFill();
		}
	},

	init:function(){
		this.colourPulse.white = this.white;
		this.colourPulse.grey = this.grey;
	},
	// Fix these 2 functions - Inefective use of alpha!
	darken: function (colourValue){
		var colour = rgbaStringToSet(colourValue);
		var alpha = colour.a;

		for (var cValue in colour)
		{
			if (colour[cValue] > 128)
			{
				colour[cValue] -= 80;
			}
			else
			{
				colour[cValue] -= 40;
			}
		}

		colour.a = alpha;

		return rgbaSetToString(colour);
	},
	// Fix these 2 functions - Inefective use of alpha!
	lighten: function (colourValue){
		var colour = rgbaStringToSet(colourValue);
		var alpha = colour.a;

		for (var cValue in colour)
		{
			if (colour[cValue] > 128)
			{
				colour[cValue] += 25;
			}
			else
			{
				colour[cValue] += 35;
			}
		}

		colour.a = alpha;

		return rgbaSetToString(colour);
	},
	invertColour: function(colourValue){
		for (var col in this)
		{
			if (this[col] === colourValue)
			{
				var retCol = null;

				switch (col) {
				    case "red":
				        retCol = "cyan";
				        break;
				    case "cyan":
				        retCol = "red";
				        break;
				    case "green":
				        retCol = "purple";
				        break;
				    case "purple":
				        retCol = "green";
				        break;
				    case "blue":
				        retCol = "yellow";
				        break;
				    case "yellow":
				        retCol = "blue";
				        break;
				    default:
				    	retCol = "black";
				    	break;
				}
				return this[retCol];
			}
		}
		console.log ("ERROR: " + colourValue + " could not be inverted.");
	},
	setAlpha: function(colour, alpha){
		var colourIn = rgbaStringToSet(colour);
		
		colourIn.a = keepWithinRange(alpha, 0, 1);

		return rgbaSetToString(colourIn);
	},
	getAlpha: function(colour){
		var colourIn = rgbaStringToSet(colour);

		return colourIn.a;
	},
	startPulse: function(){
		if (!this.colourPulse.pulsing)
		{
			this.colourPulse.pulsing = true;
			this.colourPulse.timer = MainGame.timeNow();
			this.colourPulse.lightening = true;
		}
	},
	stopPulse: function(){
		this.colourPulse.pulsing = false;
		this.colourPulse.timer = null;
	},
	pulse: function(time){
		// if (!this.colourPulse.pulsing)
		// {
		// 	return;
		// }

		if (MainGame.timeNow() - this.colourPulse.timer > time)
		{
			if (this.colourPulse.lightening) // should be lightest
			{
				this.colourPulse.white = this.lighten(this.white);
				this.colourPulse.grey = this.lighten(this.grey);
			}
			else
			{
				this.colourPulse.white = this.darken(this.white);
				this.colourPulse.grey = this.darken(this.grey);
			}
			this.colourPulse.lightening = !this.colourPulse.lightening;
			this.colourPulse.timer = MainGame.timeNow();
		}

		if (this.colourPulse.lightening)
		{
			this.colourPulse.white = Motion.adjustColour(this.colourPulse.white, this.darken(this.white), this.lighten(this.white), time);
			this.colourPulse.grey = Motion.adjustColour(this.colourPulse.grey, this.darken(this.grey), this.lighten(this.grey), time);
		}
		else
		{
			this.colourPulse.white = Motion.adjustColour(this.colourPulse.white, this.lighten(this.white), this.darken(this.white), time);
			this.colourPulse.grey = Motion.adjustColour(this.colourPulse.grey, this.lighten(this.grey), this.darken(this.grey), time);
		}
	}
};