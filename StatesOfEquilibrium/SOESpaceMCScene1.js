'use strict';

///////////////////////////////////////////////////////////////////////////////
//                           Scene Definition                                //
///////////////////////////////////////////////////////////////////////////////

//creates scene for the easy level multiple choice in the space mode

//send scene the following paramaters: 
//choice1 - number of spaces for first multiple choice option (int)
//choice2 - number of spaces for the second multiple choice option (int)
//choice3 - number of spaces for the third multiple choice option (int)
//answer - the correct number of spaces for the left truck (int)
//rightTruckPosition - the given position of the right truck (int)
//rightTruckBallNumber - the given number of balls in right truck (int)
//sceneName -  the name of the scene (String)
//nextScene - the name of the scene transitioned to after a correct answer (String)

function SOESpaceMCScene1(choice1, choice2, choice3, answer, ballNumber, rightTruckPosition, rightTruckBallNumber, sceneName, nextScene) {
 
  Scene.call(this);
  
  //booleans to keep track of which button was last pressed
  this.spaceMC1Choice1Pressed = false;
  this.spaceMC1Choice2Pressed = false;
  this.spaceMC1Choice3Pressed = false;
  
  //scene variables
  this.sceneName = sceneName;
  this.nextScene = nextScene;
  
  this.choice1 = choice1;
  this.choice2 = choice2;
  this.choice3 = choice3;
  this.answer = answer;
  this.ballNumber = ballNumber;
  this.currentSpace = 1;

  //create three multiple choice buttons with defined space options
  var MCButtons = [0, 0, 0];
  var MCButtonActions = [this.choice1ButtonAction.bind(this), this.choice2ButtonAction.bind(this), this.choice3ButtonAction.bind(this)];
  var MCButtonLabels = [""+this.choice1, "" +this.choice2, "" +this.choice3];
  for(var i = 0; i < 3; i++)
  {
    MCButtons[i] = new TextButton(borderBufferDist + i*gap + i*buttonWidth, multipleChoiceY1, buttonWidth, buttonHeight, BLUE, MCButtonLabels[i], attrs, null);
    MCButtons[i].action = MCButtonActions[i];
    this.addActor(MCButtons[i]);
  }
  
  //add left truck actor with indicated number of balls
  this.leftTruck = new ImageLabel(TruckPositions[1], truckY, truckWidth, truckHeight, LeftTruckImages[this.ballNumber]);
  this.leftTruck.z = 3;
 
  //create other actors
  this.nextButton = new NextButton(this.nextButtonAction.bind(this));
  this.balanceBeam = new ImageLabel(balanceBeamX, balanceBeamY, balanceBeamWidth, balanceBeamHeight, balanceImg);
  this.rightTruck = new ImageLabel(TruckPositions[rightTruckPosition], truckY, truckWidth, truckHeight, RightTruckImages[rightTruckBallNumber]);
  this.homeButton = new HomeButton(this.homeButtonAction.bind(this));
  
  this.titleLabel = new Label(windowWidth/2, borderBufferDist, "Wobble", attrs);
  this.addActor(this.titleLabel);
   
  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.addActor(this.border);
  
  //add actors to scene
  this.addActor(this.nextButton);
  this.addActor(this.homeButton);
  this.addActor(this.balanceBeam);
  this.addActor(this.leftTruck);
  this.addActor(this.rightTruck);
  
  console.log("created SpaceMC1 scene");
}

_inherits(SOESpaceMCScene1, Scene);

///////////////////////////////////////////////////////////////////////////////
//                      Multiple Choice Button Actions                       //
///////////////////////////////////////////////////////////////////////////////

SOESpaceMCScene1.prototype.choice1ButtonAction = function() {
  //when clicked (if not already selected):
  //-animate truck image to move to new position
  //-redefine this.currentSpace to new position
  //-set booleans to show current button selection
  if(this.spaceMC1Choice1Pressed)
  {
    //do nothing (already selected)
  }
  else if(this.spaceMC1Choice2Pressed)
  {
    this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice1], truckY));
  }
  else if(this.spaceMC1Choice3Pressed)
  {
    this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice1], truckY));
  }
  else
  {
    this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice1], truckY));
  }
  
  this.currentSpace = this.choice1;
  this.spaceMC1Choice1Pressed = true;
  this.spaceMC1Choice2Pressed = false;
  this.spaceMC1Choice3Pressed = false;   
 }

SOESpaceMCScene1.prototype.choice2ButtonAction = function() {
  //when clicked (if not already selected):
  //-animate truck image to move to new position
  //-redefine this.currentSpace to new position
  //-set booleans to show current button selection
  if(this.spaceMC1Choice1Pressed)
  {
     this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice2], truckY));
  }
  else if(this.spaceMC1Choice2Pressed)
  {
     //do nothing (already selected)
  }
  else if(this.spaceMC1Choice3Pressed)
  {
     this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice2], truckY));
  }
  else
  {
     this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice2], truckY));
  } 
 
  this.currentSpace = this.choice2;
  this.spaceMC1Choice1Pressed  = false;
  this.spaceMC1Choice2Pressed  = true;
  this.spaceMC1Choice3Pressed  = false; 
}

SOESpaceMCScene1.prototype.choice3ButtonAction = function() {
   //when clicked (if not already selected):
   //-animate truck image to move to new position
   //-redefine this.currentSpace to new position
   //-set booleans to show current button selection
  if(this.spaceMC1Choice1Pressed)
  {
     this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice3], truckY));
  }
  else if(this.spaceMC1Choice2Pressed)
  {
     this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice3], truckY));
  }
  else if(this.spaceMC1Choice3Pressed)
  {
     //do nothing (already selected)
  }
  else
  {
     this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[this.choice3], truckY));
  }
  
  this.currentSpace = this.choice3;
  this.spaceMC1Choice1Pressed = false;
  this.spaceMC1Choice2Pressed = false;
  this.spaceMC1Choice3Pressed = true;  
}

///////////////////////////////////////////////////////////////////////////////
//                             Reset Action                                  //
///////////////////////////////////////////////////////////////////////////////

SOESpaceMCScene1.prototype.resetScene = function() {
  //move truck back to default position
  //reset booleans
  this.leftTruck.animate(this.leftTruck.animMoveTo(TruckPositions[1], truckY));

  this.spaceMC1Choice1Pressed = false;
  this.spaceMC1Choice2Pressed = false;
  this.spaceMC1Choice3Pressed = false;

}

///////////////////////////////////////////////////////////////////////////////
//                            Next/Home Actions                              //
///////////////////////////////////////////////////////////////////////////////

SOESpaceMCScene1.prototype.homeButtonAction = function() {
  stage.transitionTo('scene1').then(() => {this.resetScene()});
}

SOESpaceMCScene1.prototype.nextButtonAction = function() {
  //send ball value + space value, run game, receive command to transition to either try again or congrats when done
  if(this.currentSpace === this.answer)
  {
    //sends the congrat scene the current scene and next scene then transitions
    congratScene.setSceneSequence(this.sceneName, this.nextScene);
    stage.transitionTo('congratScene').then(() => {this.resetScene()});
  }
  else 
  {
    //sends the congrat scene the current scene and next scene then transitions
    tryAgainScene.setSceneSequence(this.sceneName, this.nextScene);
    stage.transitionTo('tryAgainScene').then(() => {this.resetScene()});
  }
}
