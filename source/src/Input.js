// Input.js

var Input = {
    mouseEnabled: true,
    mouseOffset: new Point(0, 0),
    mousePosition: new Point(0, 0),
    mouseHexaGridPos: new Point(999, 999),
    startDragPosition: new Point(0, 0),
    mouseOver: false,
    mouseDown: false,
    dragStartTime: 0,
    dragStartTimer: 1000,
    dragStartMouseMoveDistance: 12,
    dragging: false,

    createInput: function() {
        console.log("Creating input.");

        this.addMouseListeners(MainGame.currentState);
    },
    addMouseListeners: function(canvasID)
    {
        console.log ("Adding mouse listiners to " + canvasID);
        if (canvasID === null || document.getElementById(canvasID) === null)
        {
            return;
        }
        document.getElementById(canvasID).addEventListener('mousedown', this.onMouseDown, false);
        document.getElementById(canvasID).addEventListener('mouseup', this.onMouseUp, false);
        document.getElementById(canvasID).addEventListener('mouseover', this.onMouseOver, false);
        document.getElementById(canvasID).addEventListener('mouseout', this.onMouseOut, false);
        document.getElementById(canvasID).addEventListener('mousemove', this.updateMousePosition, false);
    },
    removeMouseListeners: function(canvasID)
    {
        console.log ("Removing mouse event listiners from " + canvasID);
        if (canvasID === null || document.getElementById(canvasID) === null)
        {
            return;
        }
        document.getElementById(canvasID).removeEventListener('mousedown', this.onMouseDown, false);
        document.getElementById(canvasID).removeEventListener('mouseup', this.onMouseUp, false);
        document.getElementById(canvasID).removeEventListener('mouseover', this.onMouseOver, false);
        document.getElementById(canvasID).removeEventListener('mouseout', this.onMouseOut, false);
        document.getElementById(canvasID).removeEventListener('mousemove', this.updateMousePosition, false);
    },
    onClick: function(event){
        if (Input.dragging)
        {
            Input.onMouseDragStop(event);
        }
        else
        {
            if (typeof MainGame.states[MainGame.currentState].onClick !== "undefined")
            {
                MainGame.states[MainGame.currentState].onClick();
            }
        }
    },
    onMouseDragStart: function(event){
        Input.dragging = true;
        if (typeof MainGame.states[MainGame.currentState].onMouseDragStart !== "undefined")
        {
            MainGame.states[MainGame.currentState].onMouseDragStart();
        }
    },
    onMouseDragStop: function(event){
        //Drag here
        if (typeof MainGame.states[MainGame.currentState].onMouseDragStop !== "undefined")
        {
            MainGame.states[MainGame.currentState].onMouseDragStop();
        }
    },
    onMouseDown: function(event){
        Input.dragStartTime = MainGame.timeNow();
        Input.mouseDown = true;
        Input.startDragPosition.equals(Input.mousePosition);
    },
    onMouseUp: function(event){
        if ((MainGame.timeNow() - Input.dragStartTime) <= Input.dragStartTimer)
        {
            Input.onClick(event);
        }
        else
        {
            Input.onMouseDragStop(event);
        }

        Input.mouseDown = false;
        Input.dragging = false;
    },
    updateMousePosition: function(event){
        if (Input.mouseEnabled)
        {
            if (Input.mouseOver)
            {
                Input.mousePosition.x = event.clientX  - Input.mouseOffset.x;
                Input.mousePosition.y = event.clientY - Input.mouseOffset.y;
                Input.mouseHexaGridPos = HexagonalGridSystem.pixelCoordToGridCoord(Input.mousePosition, GameMap.gridCenter, GameMap.hexRadius);
            }

            if (Input.mouseDown && !Input.dragging)
            {
                if ((MainGame.timeNow() - Input.dragStartTime) > Input.dragStartTimer || 
                Input.startDragPosition.distance(Input.mousePosition) > Input.dragStartMouseMoveDistance)
                {
                    console.log (Input.startDragPosition.distance(Input.mousePosition));
                    Input.onMouseDragStart();
                }
            }

            if (Input.dragging)
            {
                // mouseDrag
                if (typeof MainGame.states[MainGame.currentState].onMouseDrag !== "undefined")
                {
                    MainGame.states[MainGame.currentState].onMouseDrag();
                }
            }
        }
    },
    disableMouse: function(){
        if (Input.mouseEnabled)
        {
            Input.mouseEnabled = false;

            Input.mousePosition.x = -999;
            Input.mousePosition.y = -999;

            Input.mouseHexaGridPos.x = -999;
            Input.mouseHexaGridPos.y = -999;
        }
    },
    enableMouse: function(){
        if (!Input.mouseEnabled)
        {
            Input.mouseEnabled = true;
            // Input.updateMousePosition();
        }
    },
    onMouseOver: function(){
        Input.mouseOver = true;
        Input.calculateOffset();
    },
    onMouseOut: function(){
        Input.mouseOver = false;
    },
    calculateOffset: function(){
        this.mouseOffset.x = document.getElementById(MainGame.currentState).offsetLeft;
        this.mouseOffset.y = document.getElementById(MainGame.currentState).offsetTop;
    }
};