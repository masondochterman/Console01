"use strict";

///////////////////////////////////////////////////////////////////////////////
//                    Circle Ladder - Game Definition                        //
///////////////////////////////////////////////////////////////////////////////
function CLSketch()
{
  Scene.call(this);
  
  var dropSceneButtonName1 = ["Drop"];
  var dropSceneButtonAction1 = [this.ballDropAction1.bind(this)];
  
  //create scenes for game
  CLDropScene1 = new ButtonsScene("Circle Ladder", "Ball Drop 1", dropSceneButtonName1, dropSceneButtonAction1, this.homeButtonAction.bind(this), null);
  playCLScene = new CLPlayScene();
  
  //add scenes for game
  stage.addScene('playCLScene', playCLScene);
  stage.addScene('CLDropScene1', CLDropScene1);
  
  console.log("created CL Sketch");
}

_inherits(CLSketch, Scene);

CLSketch.prototype.ballDropAction1 = function(){
  console.log("called ball drop Action 1");
  stage.transitionTo("playCLScene");
  //send command to drop ball, receive command to transition to Circle Ladder game when ball finished 
}

CLSketch.prototype.homeButtonAction = function(){
  stage.transitionTo("ConsoleOpeningScene");
}
