'use strict';

///////////////////////////////////////////////////////////////////////////////
//                           Scene Definition                                //
///////////////////////////////////////////////////////////////////////////////

//creates scene for the hard level multiple choice in the both mode

//send scene the following paramaters: 
//spaceChoice1 - number of spaces for first multiple choice option (int)
//spaceChoice2 - number of spaces for the second multiple choice option (int)
//spaceChoice3 - number of spaces for the third multiple choice option (int)
//ballChoice1 - number of balls for first multiple choice option (int)
//ballChoice2 - number of balls for second multiple choice option (int)
//ballChoice3 - number of balls for third multiple choice option (int)
//spaceAnswer - the correct number of spaces for the left truck (int)
//ballAnswer - the correct number of balls for the left truck (int)
//rightTruckPosition - the given position of the right truck (int)
//rightTruckBallNumber - the given number of balls in right truck (int)
//sceneName -  the name of the scene (String)
//nextScene - the name of the scene transitioned to after a correct answer (String)

function SOEBothMCScene1(spaceChoice1, ballChoice1, spaceChoice2, ballChoice2, spaceChoice3, ballChoice3, spaceAnswer, ballAnswer, rightTruckPosition, rightTruckBallNumber, sceneName, nextScene) {
  
  Scene.call(this);
  
  //booleans to keep track of which button was last pressed
  this.bothMC1Choice1Pressed = false;
  this.bothMC1Choice2Pressed = false;
  this.bothMC1Choice3Pressed = false;
  
  //define scene variables
  this.currentBallNumber = 0;
  this.currentTruckPosition = 1;
  this.sceneName = sceneName;
  this.nextScene = nextScene;
  
  this.spaceChoice1 = spaceChoice1;
  this.ballChoice1 = ballChoice1;
  this.spaceChoice2 = spaceChoice2;
  this.ballChoice2 = ballChoice2;
  this.spaceChoice3 = spaceChoice3;
  this.ballChoice3 = ballChoice3;
  this.spaceAnswer = spaceAnswer;
  this.ballAnswer = ballAnswer;

  //create three multiple choice buttons with defined space/ball options
  this.MCButtons = [0, 0, 0];
  var MCButtonActions = [this.choice1ButtonAction.bind(this), this.choice2ButtonAction.bind(this), this.choice3ButtonAction.bind(this)];
  var MCButtonLabels = ["Space " + this.spaceChoice1 +", " + this.ballChoice1 + " Balls", "Space " + this.spaceChoice2 +", " + this.ballChoice2 + " Balls", "Space " + this.spaceChoice3 +", " + this.ballChoice3 + " Balls"];
  for(var i = 0; i < 3; i++)
  {
    this.MCButtons[i] = new TextButton(borderBufferDist + i*gap + i*buttonWidth, multipleChoiceY1, buttonWidth, buttonHeight, BLUE, MCButtonLabels[i], attrs, null);
    this.MCButtons[i].action = MCButtonActions[i];
    this.addActor(this.MCButtons[i]);
    
  }
  
  //create left truck images
  this.LeftTrucks = [0, 0, 0, 0];
  this.LeftTruckSyms = [0, 0, 0, 0];
  this.truckBallNumbers = [0, this.ballChoice1, this.ballChoice2, this.ballChoice3];
  for(var i = 0; i < 4; i++)
  {
    this.LeftTrucks[i] = new ImageLabel(TruckPositions[1], truckY, truckWidth, truckHeight, LeftTruckImages[this.truckBallNumbers[i]]);
    this.LeftTrucks[i].z = 3;
  }

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
  
  //add other actors
  this.addActor(this.nextButton);
  this.addActor(this.homeButton);
  this.addActor(this.balanceBeam);
  this.LeftTruckSyms[0] = this.addActor(this.LeftTrucks[0]);
  this.addActor(this.rightTruck);

  console.log("created BothMC1 scene");
}

_inherits(SOEBothMCScene1, Scene);

///////////////////////////////////////////////////////////////////////////////
//                      Multiple Choice Button Actions                       //
///////////////////////////////////////////////////////////////////////////////

SOEBothMCScene1.prototype.choice1ButtonAction = function() {
  //when clicked (if not already selected):
  //-disable other buttons
  //-remove the last truck image
  //-add new truck image that indicates new/current number of balls to last position
  //-animate truck image to move to new position
  //-redefine this.currentBallNumber and this.currentTruckPosition to new ball number/position
  //-set booleans to show current button selection
  if (this.bothMC1Choice1Pressed) {
      //do nothing (already selected)
  } else if (this.bothMC1Choice2Pressed) {
    
      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[2]);
      this.LeftTruckSyms[2] = null;
      this.LeftTrucks[1].x = TruckPositions[this.spaceChoice2];
      this.LeftTruckSyms[1] = this.addActor(this.LeftTrucks[1]);
      
  } else if (this.bothMC1Choice3Pressed) {
    
      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[3]);
      this.LeftTruckSyms[3] = null;
      this.LeftTrucks[1].x = TruckPositions[this.spaceChoice3];
      this.LeftTruckSyms[1] = this.addActor(this.LeftTrucks[1]);
  } else {
    
      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[0]);
      this.LeftTruckSyms[0] = null;
      this.LeftTrucks[1].x = TruckPositions[1];
      this.LeftTruckSyms[1] = this.addActor(this.LeftTrucks[1]);
  }
  
  this.LeftTrucks[1].animate(this.LeftTrucks[1].animMoveTo(TruckPositions[this.spaceChoice1], truckY)).then(() => {this.enableAllButtons()});
  this.currentBallNumber = this.ballChoice1;
  this.currentTruckPosition = this.spaceChoice1;
  this.bothMC1Choice1Pressed = true;
  this.bothMC1Choice2Pressed = false;
  this.bothMC1Choice3Pressed = false;
}

SOEBothMCScene1.prototype.choice2ButtonAction = function() { //space three, two balls
  //when clicked (if not already selected):
  //-disable other buttons
  //-remove the last truck image
  //-add new truck image that indicates new/current number of balls to last position
  //-animate truck image to move to new position
  //-redefine this.currentBallNumber and this.currentTruckPosition to new ball number/position
  //-set booleans to show current button selection
  if (this.bothMC1Choice1Pressed) {
    
      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[1]);
      this.LeftTruckSyms[1] = null;
      this.LeftTrucks[2].x = TruckPositions[this.spaceChoice1]; 
      this.LeftTruckSyms[2] = this.addActor(this.LeftTrucks[2]);

  } else if (this.bothMC1Choice2Pressed) {
      //do nothing (already )
  } else if (this.bothMC1Choice3Pressed) {
    
      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[3]);
      this.LeftTruckSyms[3] = null;
      this.LeftTrucks[2].x = TruckPositions[this.spaceChoice3];
      this.LeftTruckSyms[2] = this.addActor(this.LeftTrucks[2]);

  } else {

      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[0]);
      this.LeftTruckSyms[0] = null;
      this.LeftTrucks[2].x = TruckPositions[1];
      this.LeftTruckSyms[2] = this.addActor(this.LeftTrucks[2]);

  }
  
  this.LeftTrucks[2].animate(this.LeftTrucks[2].animMoveTo(TruckPositions[this.spaceChoice2], truckY)).then(() => {this.enableAllButtons()});
  this.currentBallNumber = this.ballChoice2;
  this.currentTruckPosition = this.spaceChoice2;
  this.bothMC1Choice1Pressed = false;
  this.bothMC1Choice2Pressed = true;
  this.bothMC1Choice3Pressed = false;
}

SOEBothMCScene1.prototype.choice3ButtonAction = function() { 
  //when clicked (if not already selected):
  //-disable other buttons
  //-remove the last truck image
  //-add new truck image that indicates new/current number of balls to last position
  //-animate truck image to move to new position
  //-redefine this.currentBallNumber and this.currentTruckPosition to new ball number/position
  //-set booleans to show current button selection
  if (this.bothMC1Choice1Pressed) {
    
      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[1]);
      this.LeftTruckSyms[1] = null;
      this.LeftTrucks[3].x = TruckPositions[this.spaceChoice1];
      this.LeftTruckSyms[3] = this.addActor(this.LeftTrucks[3]);

  } else if (this.bothMC1Choice2Pressed) {

      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[2]);
      this.LeftTruckSyms[2] = null;
      this.LeftTrucks[3].x = TruckPositions[this.spaceChoice2];
      this.LeftTruckSyms[3] = this.addActor(this.LeftTrucks[3]);

  } else if (this.bothMC1Choice3Pressed) {
      //do nothing (already selected)
  } else {

      this.disableAllButtons();
      this.removeActor(this.LeftTruckSyms[0]);
      this.LeftTruckSyms[0] = null;
      this.LeftTrucks[3].x = TruckPositions[1];
      this.LeftTruckSyms[3] = this.addActor(this.LeftTrucks[3]);

  }
  
  this.LeftTrucks[3].animate(this.LeftTrucks[3].animMoveTo(TruckPositions[this.spaceChoice3], truckY)).then(() => {this.enableAllButtons()});
  this.currentBallNumber = this.ballChoice3;
  this.currentTruckPosition = this.spaceChoice3;
  this.bothMC1Choice1Pressed = false;
  this.bothMC1Choice2Pressed = false;
  this.bothMC1Choice3Pressed = true;
}

///////////////////////////////////////////////////////////////////////////////
//                        Disable/Enable Actions                             //
///////////////////////////////////////////////////////////////////////////////

SOEBothMCScene1.prototype.disableAllButtons = function() {
 for(var i = 0; i < 3; i++)
 {
    this.MCButtons[i].disable();
 }
}

SOEBothMCScene1.prototype.enableAllButtons = function() {
  for(var i = 0; i < 3; i++)
  {
    this.MCButtons[i].enable();
  }
}

///////////////////////////////////////////////////////////////////////////////
//                             Reset Action                                  //
///////////////////////////////////////////////////////////////////////////////

SOEBothMCScene1.prototype.resetScene = function() {
  //Based on last selected button:
  //-remove truck image
  //-re-add removed truck image to array
  //-set default truck x position to default position
  //-add default truck image to scene
  //-reset booleans
  if (this.bothMC1Choice1Pressed)  {
     this.removeActor(this.LeftTruckSyms[1]);
     this.LeftTruckSyms[1] = null;
     this.LeftTrucks[1] = new ImageLabel(TruckPositions[1], truckY, truckWidth, truckHeight, LeftTruckImages[this.truckBallNumbers[1]]);
     this.LeftTrucks[1].z = 3;
  }
  else if(this.bothMC1Choice2Pressed)  {
     this.removeActor(this.LeftTruckSyms[2]);
     this.LeftTruckSyms[2] = null;
     this.LeftTrucks[2] = new ImageLabel(TruckPositions[1], truckY, truckWidth, truckHeight, LeftTruckImages[this.truckBallNumbers[2]]);
     this.LeftTrucks[2].z = 3;
  }
  else if(this.bothMC1Choice3Pressed)  {
     this.removeActor(this.LeftTruckSyms[3]);
     this.LeftTruckSyms[3] = null;
     this.LeftTrucks[3] = new ImageLabel(TruckPositions[1], truckY, truckWidth, truckHeight, LeftTruckImages[this.truckBallNumbers[3]]);
     this.LeftTrucks[3].z = 3;
  }
  this.LeftTrucks[0].x = TruckPositions[1];
  this.LeftTruckSyms[0] = this.addActor(this.LeftTrucks[0]);
  
  this.bothMC1Choice1Pressed = false;
  this.bothMC1Choice2Pressed = false;
  this.bothMC1Choice3Pressed = false;
}

///////////////////////////////////////////////////////////////////////////////
//                            Next/Home Actions                              //
///////////////////////////////////////////////////////////////////////////////

SOEBothMCScene1.prototype.homeButtonAction = function() {
  stage.transitionTo('scene1').then(() => {this.resetScene()});
}

SOEBothMCScene1.prototype.nextButtonAction = function() {
//send ball value + space value, run game, receive command to transition to either try again or congrats when done
  if (this.currentBallNumber === this.ballAnswer && this.currentTruckPosition === this.spaceAnswer) {
      //sends the congrat scene the current scene and next scene then transitions
      congratScene.setSceneSequence(this.sceneName, this.nextScene);
      stage.transitionTo('congratScene').then(() => {this.resetScene()});
  } else {
      //sends the try again scene the current scene and next scene then transitions
      tryAgainScene.setSceneSequence(this.sceneName, this.nextScene);
      stage.transitionTo('tryAgainScene').then(() => {this.resetScene()});
  }
}

