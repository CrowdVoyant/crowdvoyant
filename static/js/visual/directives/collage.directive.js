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
      template: "<canvas></canvas>",
      replace : true,
      scope: {
        clickHandler: "=",
        model: "=",
        selected: "="
      },
      link: function(scope, element, attribute) {
        //will hold all canvas references
        var stageBounds = { width: 800, height: 600, midX: null, midY: null }
        var stageUpdate = false; //tells stage when to update
        element[0].width = stageBounds.width;
        element[0].height = stageBounds.height;
        var gridImg, gridBitmap = null; //perspective plane

        initStage();

        function initStage(){

          if (scope.stage) {
            scope.stage.autoClear = true;
            scope.stage.removeAllChildren();
            scope.stage.update();
          } else {
            scope.stage = new createjs.Stage(element[0]);
          }


          if (createjs.Touch.isSupported()) {
            createjs.Touch.enable(stage);
          }

          loadGrid();
        }

        function loadGrid(){
          gridImg = new Image();
          gridImg.src = "static/images/grid.png";
          gridImg.onload = drawGrid;
        }

        function drawGrid(event){
          gridBitmap = new createjs.Bitmap(event.target);
          scope.stage.addChild(gridBitmap);
          scope.stage.update();


        }


      }

    }
  }
})();
