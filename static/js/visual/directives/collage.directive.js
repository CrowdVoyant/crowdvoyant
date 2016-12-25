/**
* Collage directive
* @namespace crowdsource.visual.directives
*/
(function () {
  'use strict';

  angular
  .module('crowdsource.visual.directives')
  .directive('collage', collage);
  collage.$inject = ['Visual'];

  function collage(Visual) {
    return {
      restrict: 'AEC',
      template: '<div><canvas></canvas><div layout="row"><md-slider-container><span>Rotation</span><md-slider flex min="0" max="360" ng-model="angle" ng-change="onRotateChange();" aria-label="red" id="red-slider"></md-slider><md-input-container><input flex type="number" ng-model="angle" aria-label="red" aria-controls="red-slider"></md-input-container></md-slider-container><md-slider-container><span>Scale</span><md-slider flex min="0" max="100" ng-model="scale" ng-change="onScaleChange();" aria-label="red" id="red-slider"></md-slider><md-input-container><input flex type="number" ng-model="scale" aria-label="red" aria-controls="red-slider"></md-input-container></md-slider-container><md-input-container class="md-block"><label>Bottom Text</label><textarea ng-model="bottomCaption" ng-change="onbottomCaptionChange();" md-maxlength="150" rows="3" md-select-on-focus></textarea></md-input-container><md-input-container class="md-block"><label>Top Text</label><textarea ng-model="topCaption" ng-change="ontopCaptionChange();" md-maxlength="150" rows="3" md-select-on-focus></textarea></md-input-container></div><md-button class="md-raised md-primary" ng-click="Save()">Save</md-button></div>',
      replace : true,
      scope: {
        images: '='
      },
      link: function(scope, element, attribute) {
        //will hold all canvas references
        var stageBounds = { width: 500, height: 600, midX: null, midY: null }
        var stageUpdate = false; //tells stage when to update
        element[0].children[0].width = stageBounds.width;
        element[0].children[0].height = stageBounds.height;
        var gridImg, gridBitmap = null; //perspective plane
        var gridBounds;
        var topText;
        var bottomText;
        scope.bottomCaption = "Hello WOrld";
        scope.topCaption = "Hello World";
        var editItem; //reference to the bitmap being manipulated
        scope.angle = 0;
        scope.scale = 1;
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
          drawTopText();
          drawBottomText();

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

        function drawTopText(){
          topText = new createjs.Text("Hello World\n\n top text", "50px Arial", "#ff7700");
          topText.lineWidth = 400;
          topText.lineHeight = 22;
          topText.textBaseline = "top";
          topText.textAlign = "center";
          topText.y = 50;
          topText.x = (stageBounds.width)/2 ;

          scope.stage.addChild(topText);

          scope.stage.update();
        }

        function drawBottomText(){
          bottomText = new createjs.Text("Hello World\n\n bottom text", "50px Arial", "#ff7700");
          bottomText.lineWidth = 400;
          bottomText.lineHeight = 22;
          bottomText.textBaseline = "top";
          bottomText.textAlign = "center";
          var b = bottomText.getBounds();
          bottomText.y = stageBounds.height - b.height - 50;
          bottomText.x = (stageBounds.width)/2 ;

          scope.stage.addChild(bottomText);

          scope.stage.update();
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
            scope.angle = editItem.rotation;
            scope.scale = editItem.scaleX * 10;
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
            scope.scale = editItem.scaleX * 10;
          }
          scope.stage.update();

        }

        var addGlow = function(bitmap){
          bitmap.shadow = new createjs.Shadow("#ff0000", 0, 0, 5);
        }

        var removeGlow = function(bitmap){
          bitmap.shadow = null;
        }

        scope.onbottomCaptionChange = function(){
          bottomText.text = scope.bottomCaption;
          var b = bottomText.getBounds();
          bottomText.y = stageBounds.height - b.height - 50;

          scope.stage.update();

        }
        scope.ontopCaptionChange = function(){
          topText.text = scope.topCaption;
          var b = topText.getBounds();

          scope.stage.update();

        }
        scope.onRotateChange = function(){
          if (editItem != null && editItem.editable){
            editItem.rotation = scope.angle;
            scope.stage.update();
          }
        }
        scope.onScaleChange = function(){
          if (editItem != null && editItem.editable){
            editItem.scaleX = editItem.scaleY = scope.scale/10;
            scope.stage.update();
          }

        }



        scope.Save = function(){
          var image = convertCanvasToImage(scope.stage.canvas);
          
        }

        var convertCanvasToImage = function(canvas) {
          var image = new Image();
          image.src = canvas.toDataURL("image/png");
          return image;
        }


      }

    }
  }
})();
