"use strict";

//variables for scene
var joystickSize, joystickX, joystickY;

///////////////////////////////////////////////////////////////////////////////
//                             Scene Definition                              //
///////////////////////////////////////////////////////////////////////////////

function MazePlayScene()
{
  Scene.call(this);
  
  //define variables for scene
  joystickSize = windowHeight - 2*borderBufferDist;
  joystickX = windowWidth/2 - joystickSize/2;
  joystickY = windowHeight/2 - joystickSize/2;
  
  //define actors for scene
  this.joystick = new Joystick(joystickX, joystickY, joystickSize, joystickSize, this.joystickAction.bind(this), joystickBackgroundImg, joystickImg);

  this.nextButton = new NextButton(this.nextButtonAction.bind(this));
  this.homeButton = new HomeButton(this.homeButtonAction.bind(this));
  this.titleLabel = new Label(windowWidth/4, borderBufferDist, "Navigate the Maze", attrs);
  
  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.addActor(this.border);
  
  //add actors to scene
  this.addActor(this.titleLabel);
  this.addActor(this.joystick);
  this.addActor(this.nextButton);
  this.addActor(this.homeButton);
  
  console.log("created Maze Play Scene");
}

_inherits(MazePlayScene, Scene);


///////////////////////////////////////////////////////////////////////////////
//                             Scene Actions                                 //
///////////////////////////////////////////////////////////////////////////////

MazePlayScene.prototype.joystickAction = function(x , y) {
   console.log("x position = " + x);
   console.log("y position = " + y);
   //send x and y values
}

MazePlayScene.prototype.resetScene = function() {
   this.joystick.resetJoystick();
}

MazePlayScene.prototype.homeButtonAction = function(){
  stage.transitionTo('ConsoleOpeningScene').then(() => {this.resetScene()});
}

MazePlayScene.prototype.nextButtonAction = function(){
    stage.transitionTo('titleScene').then(() => {this.resetScene()});
  
}

