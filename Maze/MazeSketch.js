"use strict";

///////////////////////////////////////////////////////////////////////////////
//                         Game Definition - Maze                            //
///////////////////////////////////////////////////////////////////////////////

function MazeSketch()
{
  Scene.call(this);
  
  var dropSceneButtons = ["Drop"];
  var dropSceneActions = [this.dropBallAction.bind(this)];
  
  //define scenes for game
  MazeDropScene = new ButtonsScene("Maze", "Drop the Ball", dropSceneButtons, dropSceneActions, this.homeButtonAction.bind(this), null);
  playMazeScene = new MazePlayScene();
  
  //add scenes to stage
  stage.addScene('playMazeScene', playMazeScene);
  stage.addScene('MazeDropScene', MazeDropScene);
  
  console.log("created Maze Sketch");
}

_inherits(MazeSketch, Scene);

///////////////////////////////////////////////////////////////////////////////
//                             Scene Actions                                 //
///////////////////////////////////////////////////////////////////////////////

MazeSketch.prototype.dropBallAction = function(){
  console.log("called drop ball action");
  stage.transitionTo("playMazeScene");
  //send command to drop ball, receive command to transition to Circle Ladder game when ball finished
}

MazeSketch.prototype.homeButtonAction = function(){
  stage.transitionTo("ConsoleOpeningScene");
}
