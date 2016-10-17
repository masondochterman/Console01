"use strict";

///////////////////////////////////////////////////////////////////////////////
//                     Inverted Pendulum - Game Definition                   //
///////////////////////////////////////////////////////////////////////////////
function IPSketch()
{
  Scene.call(this);
  
  var titleButtons = ["Play Game", "Demo"];
  var titleActions = [this.playAction.bind(this), this.demoAction.bind(this)];
  
  var dropSceneButton = ["Drop"];
  var dropSceneAction = [this.ballDropAction.bind(this)];
  
  //define scenes for game
  IPTitleScene = new ButtonsScene("Inverted Pendulum", "Pick a Mode", titleButtons, titleActions, this.homeButtonAction.bind(this), this.nextButtonAction.bind(this));
  IPDropScene = new ButtonsScene("Inverted Pendulum", "Drop the Ball", dropSceneButton, dropSceneAction, this.homeButtonAction.bind(this), null);
  playIPScene = new IPPlayScene();
  
  //add scenes for game
  stage.addScene('playIPScene', playIPScene);
  stage.addScene('IPTitleScene', IPTitleScene);
  stage.addScene('IPDropScene', IPDropScene);
  console.log("created IP Sketch");
}

_inherits(IPSketch, Scene);

IPSketch.prototype.playAction = function(){
  console.log("called play action");
  stage.transitionTo("playIPScene");
}

IPSketch.prototype.demoAction = function(){
  console.log("called demo action");
}

IPSketch.prototype.ballDropAction = function(){
  console.log("called ball drop Action");
  stage.transitionTo("IPTitleScene");
  //send command to drop ball, receive command to transition to Circle Ladder game when ball finished 
}


IPSketch.prototype.homeButtonAction = function(){
  stage.transitionTo("ConsoleOpeningScene");
}

IPSketch.prototype.nextButtonAction = function(){
  stage.transitionTo("playIPScene");
}