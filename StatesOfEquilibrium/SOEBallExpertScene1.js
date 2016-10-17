'use strict';

///////////////////////////////////////////////////////////////////////////////
//                           Scene Definition                                //
///////////////////////////////////////////////////////////////////////////////

//creates scene for the expert level in the ball mode

//Send the scene the following paramaters: 
//answer - the correct number of balls for the left truck (int)
//leftTruckPosition - the given position of the left truck (int)
//rightTruckPosition - the given position of the right truck (int)
//rightTruckBallNumber - the given number of balls in right truck (int)
//sceneName -  the name of this scene (String)
//nextScene - the name of the scene transitioned to after a correct answer (String)

function SOEBallExpertScene1(ballAnswer, leftTruckPosition, rightTruckPosition, rightTruckBallNumber, sceneName, nextScene) {
  Scene.call(this);

  //define variables for scene
  this.currentBallNumber = 0;
  this.leftTruckPosition = leftTruckPosition; 
  this.rightTruckBallNumber = rightTruckBallNumber;
  this.rightTruckPosition = rightTruckPosition;
  this.ballAnswer = ballAnswer;
  this.sceneName = sceneName;
  this.nextScene = nextScene;
  
  
  this.LeftTrucks = [0, 0, 0, 0];
  this.LeftTruckSyms = [0, 0, 0, 0];
  for(var i = 0; i < 7; i++)
  {
    //defines the left trucks
    this.LeftTrucks[i] = new ImageLabel(TruckPositions[this.leftTruckPosition], truckY, truckWidth, truckHeight, LeftTruckImages[i]);
    this.LeftTrucks[i].z = 3;
  }
    
    //other actor definitions
    this.nextButton = new NextButton(this.nextButtonAction.bind(this));
    this.balanceBeam = new ImageLabel(balanceBeamX, balanceBeamY, balanceBeamWidth, balanceBeamHeight, balanceImg);
    this.homeButton = new HomeButton(this.homeButtonAction.bind(this));
  
    this.rightTruck = new ImageLabel(TruckPositions[this.rightTruckPosition], truckY, truckWidth, truckHeight, RightTruckImages[this.rightTruckBallNumber]);
    
    
    this.plusButton = new TextButton(windowWidth/2+buttonWidth/4, multipleChoiceY1+buttonHeight/4, buttonWidth/2, buttonHeight/2, BLUE, " + ",  {size: 90, leading: 90}, this.plusButtonAction.bind(this));
    this.minusButton = new TextButton(windowWidth/2 - (buttonWidth/4 + buttonWidth/2), multipleChoiceY1+buttonHeight/4, buttonWidth/2, buttonHeight/2, BLUE, " - ",  {size: 90, leading: 90}, this.minusButtonAction.bind(this) );
    //modifies text placement on plus/minus buttons
    this.plusButton.nudge[0] = 10;
    this.plusButton.nudge[1] = -5;
    this.minusButton.nudge[0] = 10;
    this.minusButton.nudge[1] = -10;
    
    this.numberLabel = new Label(windowWidth/2, multipleChoiceY1 + buttonHeight/2, " 0 ",  attrs);
    
    this.titleLabel = new Label(windowWidth/2, borderBufferDist, "Wobble", attrs);
    this.addActor(this.titleLabel);
  
    this.border = new BackgroundBorder();
    this.border.z = -1;
    
    //add actors to scene
    this.addActor(this.border);
    this.addActor(this.nextButton);
    this.addActor(this.homeButton);
    this.addActor(this.balanceBeam);
    this.LeftTruckSyms[0] = this.addActor(this.LeftTrucks[0]); //add actor and define sym so it can be removed
    this.addActor(this.rightTruck);
    this.addActor(this.plusButton);
    this.addActor(this.minusButton);
    this.addActor(this.numberLabel);

  
  
    console.log("created BallExpert1 scene");
}

_inherits(SOEBallExpertScene1, Scene);


///////////////////////////////////////////////////////////////////////////////
//                         Plus/Minus Button Actions                         //
///////////////////////////////////////////////////////////////////////////////
SOEBallExpertScene1.prototype.plusButtonAction = function(){
  //when plus button clicked (if not already at max number of balls):
  //-change number label to reflect current number of balls in the left truck
  //-remove the last truck image
  //-add new truck image that indicates new/current number of balls
  //-redefine this.currentBallNumber to new ball number  
  if(this.currentBallNumber < MAX_BALL_NUM) {
    this.numberLabel.text = "" + (this.currentBallNumber + 1);
    this.removeActor(this.LeftTruckSyms[this.currentBallNumber]);
    this.LeftTruckSyms[this.currentBallNumber + 1] = this.addActor(this.LeftTrucks[this.currentBallNumber + 1]);
    this.LeftTruckSyms[this.currentBallNumber] = 0;
    this.currentBallNumber++; 
  }
}

SOEBallExpertScene1.prototype.minusButtonAction = function(){
  //when minus button clicked (if not already at min number of balls):
  //-change number label to reflect current number of balls in the left truck
  //-remove the last truck image
  //-add new truck image that indicates new/current number of balls
  //-redefine this.currentBallNumber to new ball number
  if(this.currentBallNumber > MIN_BALL_NUM) {
    this.numberLabel.text = "" + (this.currentBallNumber - 1);
    this.removeActor(this.LeftTruckSyms[this.currentBallNumber]);
    this.LeftTruckSyms[this.currentBallNumber - 1] = this.addActor(this.LeftTrucks[this.currentBallNumber - 1]);
    this.LeftTruckSyms[this.currentBallNumber] = 0;
    this.currentBallNumber--; 
  }
}

///////////////////////////////////////////////////////////////////////////////
//                             Reset Action                                  //
///////////////////////////////////////////////////////////////////////////////

SOEBallExpertScene1.prototype.resetScene = function() {
  
  //removes the current truck image
  if(this.LeftTruckSyms[0] != 0)
  {
    this.removeActor(this.LeftTruckSyms[0]);
  }
  else if(this.LeftTruckSyms[1] != 0)
  {
    this.removeActor(this.LeftTruckSyms[1]);
  }
  else if(this.LeftTruckSyms[2] != 0)
  {
    this.removeActor(this.LeftTruckSyms[2]);
  }
  else if(this.LeftTruckSyms[3] != 0)
  {
    this.removeActor(this.LeftTruckSyms[3]);
  }
  else if(this.LeftTruckSyms[4] != 0)
  {
    this.removeActor(this.LeftTruckSyms[4]);
  }
  else if(this.LeftTruckSyms[5] != 0)
  {
    this.removeActor(this.LeftTruckSyms[5]);
  }
  else if(this.LeftTruckSyms[6] != 0)
  {
    this.removeActor(this.LeftTruckSyms[6]);
  }
  
  //redefines truck images in array 
  for(var i = 1; i < 7; i++)
  {
    this.LeftTrucks[i] = new ImageLabel(TruckPositions[this.leftTruckPosition], truckY, truckWidth, truckHeight, LeftTruckImages[i]);
    this.LeftTrucks[i].z = 3;
  }
  
  //reset number label to zero and adds default left truck image 
  this.numberLabel.text = "0";
  this.LeftTruckSyms[0] = this.addActor(this.LeftTrucks[0]);
  
  for(var i = 1; i < 7; i++)
  {
    this.LeftTruckSyms[i] = 0;
  }

}

///////////////////////////////////////////////////////////////////////////////
//                            Next/Home Actions                              //
///////////////////////////////////////////////////////////////////////////////

SOEBallExpertScene1.prototype.homeButtonAction = function() {
  stage.transitionTo('scene1').then(() => {this.resetScene()});
}

SOEBallExpertScene1.prototype.nextButtonAction = function(){
  //send ball value + space value, run game, receive command to transition to either try again or congrats when done 
  if(this.currentBallNumber === this.ballAnswer)
  {
    //sends the congrat scene the current scene and next scene then transitions
    congratScene.setSceneSequence(this.sceneName, this.nextScene);
    stage.transitionTo('congratScene').then(() => {this.resetScene()});
  }
  else
  {
    //sends the try again scene the current scene and next scene then transitions
    tryAgainScene.setSceneSequence(this.sceneName, this.nextScene);
    stage.transitionTo('tryAgainScene').then(() => {this.resetScene()});

  }
}
