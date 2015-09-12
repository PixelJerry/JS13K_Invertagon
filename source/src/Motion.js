// Motion.js

// TODO: This class needs some serious optimisation and refactoring
var Motion = {
    // TODO: New function - Need to test and optimize!!
    fillFade: function(objectToAnimate, colourToFadeTo, time)
    {
        if (objectToAnimate.requestId)
        {
            window.cancelAnimationFrame(objectToAnimate.requestId);
            objectToAnimate.requestId = undefined;
        }

        if (typeof time === "undefined")
        {
            time = 400;
        }

        objectToAnimate.animating = true;

        var start = null;

        var adjustmentRGB = rgbaStringToSet(objectToAnimate.getFill());
        var startRGB = rgbaStringToSet(objectToAnimate.getFill());
        var endRGB = rgbaStringToSet(colourToFadeTo);

        function step()
        {
            var progress;

            if (start === null)
            {
                start = MainGame.timeNow();
            }
            progress = MainGame.timeNow() - start;

            // ANIMATION IN HERE

            adjustmentRGB.r += Math.round(Motion.adjustValue(startRGB.r, endRGB.r, time));
            adjustmentRGB.g += Math.round(Motion.adjustValue(startRGB.g, endRGB.g, time));
            adjustmentRGB.b += Math.round(Motion.adjustValue(startRGB.b, endRGB.b, time));
            
            objectToAnimate.setFill(rgbaSetToString(adjustmentRGB));

            // ANIMATION FRAME END

            if (progress < time)
            {
                // Animation incomplete
                objectToAnimate.requestId = requestAnimation(step);
            }
            else
            {
                // Animation complete
                objectToAnimate.animating = false;
                objectToAnimate.setFill(colourToFadeTo);
                window.cancelAnimationFrame(objectToAnimate.requestId);
                objectToAnimate.requestId = undefined;
            }
        }

        objectToAnimate.requestId = requestAnimation(step);
    },
    strokeFade: function(objectToAnimate, colourToFadeTo, time)
    {
        if (objectToAnimate.requestId)
        {
            window.cancelAnimationFrame(objectToAnimate.requestId);
            objectToAnimate.requestId = undefined;
        }

        if (typeof time === "undefined")
        {
            time = 400;
        }

        objectToAnimate.animating = true;

        var start = null;

        var adjustmentRGB = rgbaStringToSet(objectToAnimate.getStrokeColour());
        var startRGB = rgbaStringToSet(objectToAnimate.getStrokeColour());
        var endRGB = rgbaStringToSet(colourToFadeTo);

        function step()
        {
            var progress;

            if (start === null)
            {
                start = MainGame.timeNow();
            }
            progress = MainGame.timeNow() - start;

            // ANIMATION IN HERE

            adjustmentRGB.r += Math.round(Motion.adjustValue(startRGB.r, endRGB.r, time));
            adjustmentRGB.g += Math.round(Motion.adjustValue(startRGB.g, endRGB.g, time));
            adjustmentRGB.b += Math.round(Motion.adjustValue(startRGB.b, endRGB.b, time));
            
            objectToAnimate.setStroke(rgbaSetToString(adjustmentRGB), objectToAnimate.getStrokeWidth());

            // ANIMATION FRAME END

            if (progress < time)
            {
                // Animation incomplete
                objectToAnimate.requestId = requestAnimation(step);
            }
            else
            {
                // Animation complete
                objectToAnimate.animating = false;
                objectToAnimate.setStroke(colourToFadeTo,  objectToAnimate.getStrokeWidth());
                window.cancelAnimationFrame(objectToAnimate.requestId);
                objectToAnimate.requestId = undefined;
            }
        }

        objectToAnimate.requestId = requestAnimation(step);
    },
    tileFade: function(objectToAnimate, fillColourToFadeTo, strokeColourToFadeTo, time)
    {
        if (objectToAnimate.requestId)
        {
            window.cancelAnimationFrame(objectToAnimate.requestId);
            objectToAnimate.requestId = undefined;
        }

        if (typeof time === "undefined")
        {
            time = 400;
        }

        objectToAnimate.animating = true;

        var start = null;

        var fillAdjustmentRGB = rgbaStringToSet(objectToAnimate.getFill());
        var fillStartRGB = rgbaStringToSet(objectToAnimate.getFill());
        var fillEndRGB = rgbaStringToSet(fillColourToFadeTo);

        var strokeAdjustmentRGB = rgbaStringToSet(objectToAnimate.getStrokeColour());
        var strokeStartRGB = rgbaStringToSet(objectToAnimate.getStrokeColour());
        var strokeEndRGB = rgbaStringToSet(strokeColourToFadeTo);

        function step()
        {
            var progress;

            if (start === null)
            {
                start = MainGame.timeNow();
            }
            progress = MainGame.timeNow() - start;

            // ANIMATION IN HERE

            fillAdjustmentRGB.r += Math.round(Motion.adjustValue(fillStartRGB.r, fillEndRGB.r, time));
            fillAdjustmentRGB.g += Math.round(Motion.adjustValue(fillStartRGB.g, fillEndRGB.g, time));
            fillAdjustmentRGB.b += Math.round(Motion.adjustValue(fillStartRGB.b, fillEndRGB.b, time));
            
            objectToAnimate.setFill(rgbaSetToString(fillAdjustmentRGB));

            strokeAdjustmentRGB.r += Math.round(Motion.adjustValue(strokeStartRGB.r, strokeEndRGB.r, time));
            strokeAdjustmentRGB.g += Math.round(Motion.adjustValue(strokeStartRGB.g, strokeEndRGB.g, time));
            strokeAdjustmentRGB.b += Math.round(Motion.adjustValue(strokeStartRGB.b, strokeEndRGB.b, time));
            
            objectToAnimate.setStroke(rgbaSetToString(strokeAdjustmentRGB), objectToAnimate.getStrokeWidth());

            // ANIMATION FRAME END

            if (progress < time)
            {
                // Animation incomplete
                objectToAnimate.requestId = requestAnimation(step);
            }
            else
            {
                // Animation complete
                objectToAnimate.animating = false;
                objectToAnimate.setFill(fillColourToFadeTo);
                objectToAnimate.setStroke(strokeColourToFadeTo,  objectToAnimate.getStrokeWidth());
                window.cancelAnimationFrame(objectToAnimate.requestId);
                objectToAnimate.requestId = undefined;
            }
        }

        objectToAnimate.requestId = requestAnimation(step);
    },
    adjustValue: function(startValue, endValue, time)
    {
        return (endValue - startValue) * (MainGame.lastFrameTime / time); 
    },
    adjustColour: function(currentValue, startValue, endValue, time){
        var adjustValue = rgbaStringToSet(currentValue); // How to adjust the colour
        var startColour = rgbaStringToSet(startValue);
        var endColour = rgbaStringToSet(endValue);

        adjustValue.r += Math.round(Motion.adjustValue(startColour.r, endColour.r, time));
        adjustValue.g += Math.round(Motion.adjustValue(startColour.g, endColour.g, time));
        adjustValue.b += Math.round(Motion.adjustValue(startColour.b, endColour.b, time));

        return rgbaSetToString(adjustValue);
    }
};