'use strict';

///////////////////////////////////////////////////////////////////////////////
//                           Scene Definition                                //
///////////////////////////////////////////////////////////////////////////////

//creates scene for the easy level multiple choice in the ball mode

//send scene the following paramaters: 
//choice1 - number of balls for first multiple choice option (int)
//choice2 - number of balls for second multiple choice option (int)
//choice3 - number of balls for third multiple choice option (int)
//answer - the correct number of balls for the left truck (int)
//leftTruckPosition - the given position of the left truck (int)
//rightTruckPosition - the given position of the right truck (int)
//rightTruckBallNumber - the given number of balls in right truck (int)
//sceneName -  the name of the scene (String)
//nextScene - the name of the scene transitioned to after a correct answer (String)

function SOEBallMCScene1(choice1, choice2, choice3, answer, leftTruckPosition, rightTruckPosition, rightTruckBallNumber, sceneName, nextScene) {
  Scene.call(this);
  
  //booleans to keep track of which button was last pressed
  this.choice1Scene2Pressed = false;
  this.choice2Scene2Pressed = false;
  this.choice3Scene2Pressed = false;
  
  //define scene variables
  this.currentBallNumber = 0;
  this.choice1 = choice1;
  this.choice2 = choice2;
  this.choice3 = choice3;
  this.answer = answer;
  this.leftTruckPosition = leftTruckPosition;
  this.sceneName = sceneName;
  this.nextScene = nextScene;
  
  //create left truck images for scene
  this.LeftTrucks = [0, 0, 0, 0];
  this.LeftTruckSyms = [0, 0, 0, 0];
  this.truckBallNumbers = [0, this.choice1, this.choice2, this.choice3];
  for(var i = 0; i < 4; i++)
  {
    this.LeftTrucks[i] = new ImageLabel(TruckPositions[this.leftTruckPosition], truckY, truckWidth, truckHeight, LeftTruckImages[this.truckBallNumbers[i]]);
    this.LeftTrucks[i].z = 3;
  }
  
  //create three buttons for multiple choice
  var MCButtons = [0, 0, 0];
  var MCButtonActions = [this.scene2Choice1Action.bind(this), this.scene2Choice2Action.bind(this), this.scene2Choice3Action.bind(this)];
  var MCButtonLabels = [""+this.choice1, "" +this.choice2, "" +this.choice3];
  for(var i = 0; i < 3; i++)
  {
    MCButtons[i] = new TextButton(borderBufferDist + i*gap + i*buttonWidth, multipleChoiceY1, buttonWidth, buttonHeight, BLUE, MCButtonLabels[i], attrs, null);
    MCButtons[i].action = MCButtonActions[i];
    this.addActor(MCButtons[i]);
  }
  
  //create other actors
  this.nextButton = new NextButton(this.nextButtonAction.bind(this));
  this.balanceBeam = new ImageLabel(balanceBeamX, balanceBeamY, balanceBeamWidth, balanceBeamHeight, balanceImg);

  this.rightTruck = new ImageLabel(TruckPositions[rightTruckPosition], truckY, truckWidth, truckHeight, RightTruckImages[rightTruckBallNumber]);

  this.titleLabel = new Label(windowWidth/2, borderBufferDist, "Wobble", attrs);
  this.addActor(this.titleLabel);
  
  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.addActor(this.border);
  
  //add other actors
  this.homeButton = new HomeButton(this.homeButtonAction.bind(this));
  this.addActor(this.nextButton);
  this.addActor(this.homeButton);
  this.addActor(this.balanceBeam);
  this.LeftTruckSyms[0] = this.addActor(this.LeftTrucks[0]);
  this.addActor(this.rightTruck);


  console.log("created Ball MC1");
}

_inherits(SOEBallMCScene1, Scene);

///////////////////////////////////////////////////////////////////////////////
//                      Multiple Choice Button Actions                       //
///////////////////////////////////////////////////////////////////////////////
SOEBallMCScene1.prototype.scene2Choice1Action = function() {
  //when clicked (if not already selected):
  //-remove the last truck image
  //-add new truck image that indicates new/current number of balls
  //-redefine this.currentBallNumber to new ball number
  //-set booleans to show current button selection
  console.log("choice 1 called");
  if (this.choice1Scene2Pressed) {
    //do nothing (already been pressed)
  } else if (this.choice2Scene2Pressed) {
      this.removeActor(this.LeftTruckSyms[2]);
      this.LeftTruckSyms[2] = null;
      this.LeftTruckSyms[1] = this.addActor(this.LeftTrucks[1]);
  } else if (this.choice3Scene2Pressed) {
      this.removeActor(this.LeftTruckSyms[3]);
      this.LeftTruckSyms[3] = null;
      this.LeftTruckSyms[1] = this.addActor(this.LeftTrucks[1]);
  } else {
    
      if (this.LeftTruckSyms[0] != null) {
        this.removeActor(this.LeftTruckSyms[0]);
        this.LeftTruckSyms[0] = null;
      }
      this.LeftTruckSyms[1] = this.addActor(this.LeftTrucks[1]);
  }
  
  this.currentBallNumber = this.choice1;
  this.choice1Scene2Pressed = true;
  this.choice2Scene2Pressed = false;
  this.choice3Scene2Pressed = false;
}

SOEBallMCScene1.prototype.scene2Choice2Action = function() {
  //when clicked (if not already selected):
  //-remove the last truck image
  //-add new truck image that indicates new/current number of balls
  //-redefine this.currentBallNumber to new ball number
  //-set booleans to show current button selection
  console.log("choice 2 called");
  if (this.choice3Scene2Pressed) {
    
      this.removeActor(this.LeftTruckSyms[3]);
      this.LeftTruckSyms[3] = null;
      this.LeftTruckSyms[2] = this.addActor(this.LeftTrucks[2]);
  } else if (this.choice2Scene2Pressed) {
      //do nothing (since already pressed)
  } else if (this.choice1Scene2Pressed) {
    
      this.removeActor(this.LeftTruckSyms[1]);
      this.LeftTruckSyms[1] = null;
      this.LeftTruckSyms[2] = this.addActor(this.LeftTrucks[2]);
  } else {
    
      if (this.LeftTruckSyms[0] != null) {
        this.removeActor(this.LeftTruckSyms[0]);
        this.LeftTruckSyms[0] = null;
      }
      this.LeftTruckSyms[2] = this.addActor(this.LeftTrucks[2]);
  }
  
  this.currentBallNumber = this.choice2;
  this.choice1Scene2Pressed = false;
  this.choice2Scene2Pressed = true;
  this.choice3Scene2Pressed = false;
}

SOEBallMCScene1.prototype.scene2Choice3Action = function() {
  //when clicked (if not already selected):
  //-remove the last truck image
  //-add new truck image that indicates new/current number of balls
  //-redefine this.currentBallNumber to new ball number
  //-set booleans to show current button selection
  console.log("choice 3 called");
  if (this.choice1Scene2Pressed) {
      this.removeActor(this.LeftTruckSyms[1]);
      this.LeftTruckSyms[1] = null;
      this.LeftTruckSyms[3] = this.addActor(this.LeftTrucks[3]);
  } else if (this.choice2Scene2Pressed) {
      this.removeActor(this.LeftTruckSyms[2]);
      this.LeftTruckSyms[2] = null;
      this.LeftTruckSyms[3] = this.addActor(this.LeftTrucks[3]);
  } else if (this.choice3Scene2Pressed) {
      //do nothing (since already pressed)
  } else {
      if (this.LeftTruckSyms[0] != null) {
        this.removeActor(this.LeftTruckSyms[0]);
        this.LeftTruckSyms[0] = null;
      }
      this.LeftTruckSyms[3] = this.addActor(this.LeftTrucks[3]);
  }
  
  this.currentBallNumber = this.choice3;
  this.choice1Scene2Pressed = false;
  this.choice2Scene2Pressed = false;
  this.choice3Scene2Pressed = true;
}

///////////////////////////////////////////////////////////////////////////////
//                             Reset Action                                  //
///////////////////////////////////////////////////////////////////////////////

SOEBallMCScene1.prototype.resetScene = function(){
  //when called:
  //-removes current truck
  //-sets truck sym to null
  //-recreates truck and adds it back into array
  //-adds default truck (truck w/ 0 balls) to scene
  if(this.choice2Scene2Pressed)
  {
     this.removeActor(this.LeftTruckSyms[2]);
     this.LeftTruckSyms[2] = null;
     this.LeftTrucks[2] = new ImageLabel(TruckPositions[this.leftTruckPosition], truckY, truckWidth, truckHeight, LeftTruckImages[this.choice2]);
     this.LeftTrucks[2].z = 3;
  }
  else if(this.choice1Scene2Pressed)
  {
     this.removeActor(this.LeftTruckSyms[1]);
     this.LeftTruckSyms[1] = null;
     this.LeftTrucks[1] = new ImageLabel(TruckPositions[this.leftTruckPosition], truckY, truckWidth, truckHeight, LeftTruckImages[this.choice1]);
     this.LeftTrucks[1].z = 3;
  }
  else if(this.choice3Scene2Pressed)
  {
     this.removeActor(this.LeftTruckSyms[3]); 
     this.LeftTruckSyms[3] = null;
     this.LeftTrucks[3] = new ImageLabel(TruckPositions[this.leftTruckPosition], truckY, truckWidth, truckHeight, LeftTruckImages[this.choice3]);
     this.LeftTrucks[3].z = 3;
  }
  this.LeftTruckSyms[0] = this.addActor(this.LeftTrucks[0]);
  
  this.choice1Scene2Pressed = false;
  this.choice2Scene2Pressed = false;
  this.choice3Scene2Pressed = false;
}

///////////////////////////////////////////////////////////////////////////////
//                            Next/Home Actions                              //
///////////////////////////////////////////////////////////////////////////////

SOEBallMCScene1.prototype.homeButtonAction = function() {
  stage.transitionTo('scene1').then(() => {this.resetScene()});
}

SOEBallMCScene1.prototype.nextButtonAction = function() {
  //send ball value + space value, run game, receive command to transition to either try again or congrats when done

  if (this.currentBallNumber === this.answer) {
      //sends the congrat scene the current scene and next scene then transitions
      congratScene.setSceneSequence(this.sceneName, this.nextScene);
      stage.transitionTo('congratScene').then(() => {this.resetScene()});
  } else {
      //sends the congrat scene the current scene and next scene then transitions
      tryAgainScene.setSceneSequence(this.sceneName, this.nextScene);
      stage.transitionTo('tryAgainScene').then(() => {this.resetScene()});
  }
}