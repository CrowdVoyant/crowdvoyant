/**
* Collage directive
* @namespace crowdsource.visual.directives
*/
(function () {
  'use strict';

  angular
  .module('crowdsource.visual.directives')
  .directive('collage', collage);

  function collage() {
    return {
      restrict: 'AEC',
      template: '<div><canvas></canvas><md-slider flex min="0" max="360" ng-model="angle" ng-change="onRotateChange();" aria-label="Slider"></md-slider></div>',
      replace : true,
      scope: {
        images: '='
      },
      link: function(scope, element, attribute) {
        //will hold all canvas references
        var stageBounds = { width: 800, height: 600, midX: null, midY: null }
        var stageUpdate = false; //tells stage when to update
        element[0].children[0].width = stageBounds.width;
        element[0].children[0].height = stageBounds.height;
        var gridImg, gridBitmap = null; //perspective plane
        var gridBounds;
        var editItem; //reference to the bitmap being manipulated
        scope.angle = 10;
        initStage();

        function initStage(){

          if (scope.stage) {
            scope.stage.autoClear = true;
            scope.stage.removeAllChildren();
            scope.stage.update();
          } else {
            scope.stage = new createjs.Stage(element[0].children[0]);
          }
          stageBounds.midX = stageBounds.width/2;
          stageBounds.midY = stageBounds.height/2;



          if (createjs.Touch.isSupported()) {
            createjs.Touch.enable(stage);
          }

          // loadGrid();
          loadImage(scope.images[0].file);
          loadImage(scope.images[1].file);
        }

        function loadGrid(){
          gridImg = new Image();
          gridImg.src = "static/images/grid.png";
          gridImg.onload = drawGrid;
        }

        function drawGrid(event){
          gridBitmap = new createjs.Bitmap(event.target);
          scope.stage.addChild(gridBitmap);
          gridBounds = gridBitmap.getBounds();
          gridBounds.y = stageBounds.height - gridBounds.height;
          gridBitmap.x = 0;
          gridBitmap.y = gridBounds.y;
          scope.stage.update();
        }

        function loadImage(image_file){
          var im = new Image();
          im.src = image_file;
          im.onload = drawImage;
        }

        function drawImage(event){
          var image = new createjs.Bitmap(event.target);
          scope.stage.addChild(image);
          centerElement(image);
          addBitmapListeners(image);
          scope.stage.update();
        }

        function centerElement(el){
          el.regX = el.image.width >> 1;
          el.regY = el.image.height >> 1;
          el.x = stageBounds.width >> 1;
          el.y = stageBounds.height >> 1;
        }

        function addBitmapListeners(bitmap){
          bitmap.on("mousedown", onBitmapDown);
          bitmap.on('click',toggleBitmapManipulation);
          bitmap.on("pressmove",onDragBitmap);
          bitmap.on('pressup',onDragUp);
        }

        var onBitmapDown = function(e){
          //this.parent.addChild(this); //MH - will move to front of z order
          this.offset = {x: this.x - e.stageX, y: this.y - e.stageY};
        }
        var onDragBitmap = function(e){
          if (this.editable){
            this.dragging = true;
            this.x = e.stageX + this.offset.x;
            this.y = e.stageY + this.offset.y;
            scope.stage.update();
          }

        }
        var onDragUp = function(){
          this.dragging = false;
        }

        var toggleBitmapManipulation = function(e){
          if (editItem && editItem.id != this.id){ //we are switching to a new item
            editItem.editable = false;
            removeGlow(editItem);
            editItem = this;
            // console.log(scope.angle);

            scope.angle = editItem.rotation;
            // console.log(scope.angle);

            // console.log(editItem);

          }

          if (this.editable){ //item is editable if it has been selected
            if (!this.dragging){
              this.editable = false;
              removeGlow(this);
              editItem = null;
            }
          } else {
            editItem = this;
            this.editable = true;
            addGlow(this);
            scope.angle = editItem.rotation;

          }

          scope.stage.update();

        }

        var addGlow = function(bitmap){
          bitmap.shadow = new createjs.Shadow("#ff0000", 0, 0, 5);
        }

        var removeGlow = function(bitmap){
          bitmap.shadow = null;
        }

        scope.adjustSliderValues = function(){
          if(editItem){
          console.log(scope.angle);
          var rotangle = editItem.rotation;
          scope.angle = 0;
          console.log(scope.angle);
          }
        }
        scope.onRotateChange = function(){
          if (editItem != null && editItem.editable){
            editItem.rotation = scope.angle;
            console.log(scope.angle);

            scope.stage.update();
          }
      }


      }

    }
  }
})();
