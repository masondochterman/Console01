"use strict";

///////////////////////////////////////////////////////////////////////////////
//                           Scene Definition                                //
///////////////////////////////////////////////////////////////////////////////

//creates scene for the expert level in the both mode

//send scene the following paramaters: 
//ballAnswer - the correct number of balls for the left truck (int)
//spaceAnswer - the correct space position for the left truck (int)
//rightTruckPosition - the given position of the right truck (int)
//rightTruckBallNumber - the given number of balls in right truck (int)
//sceneName -  the name of the scene (String)
//nextScene - the name of the scene transitioned to after a correct answer (String)

function SOEBothExpertScene1(ballAnswer, spaceAnswer, rightTruckPosition, rightTruckBallNumber, sceneName, nextScene) {
    
    Scene.call(this);

    this.spaceAnswer = spaceAnswer;
    this.ballAnswer = ballAnswer;
    this.currentBallNumber = 0;
    this.sceneName = sceneName;
    this.nextScene = nextScene;

    this.nextButton = new NextButton(this.nextButtonAction.bind(this));
    this.balanceBeam = new ImageLabel(balanceBeamX, balanceBeamY, balanceBeamWidth, balanceBeamHeight, balanceImg);
    this.truckSlider = new SOESlider(TruckPositions[2], truckY, balanceBeamWidth/2 - 2*lengthOfSpaces, 1, 6, 1, this.sliderAction.bind(this), truckWidth, truckHeight);
    this.truckSlider.sliderImage(LeftTruckImages[0]);
    this.rightTruck = new ImageLabel(TruckPositions[rightTruckPosition], truckY, truckWidth, truckHeight, RightTruckImages[rightTruckBallNumber]);
    this.homeButton = new HomeButton(this.homeButtonAction.bind(this));
    
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
    this.addActor(this.border);
  
    this.addActor(this.nextButton);
    this.addActor(this.homeButton);
    this.addActor(this.balanceBeam);
    this.addActor(this.truckSlider);
    this.addActor(this.rightTruck);
    this.addActor(this.plusButton);
    this.addActor(this.minusButton);
    this.addActor(this.numberLabel);

  
  
    console.log("created BothExpert1 scene");
}

_inherits(SOEBothExpertScene1, Scene);

///////////////////////////////////////////////////////////////////////////////
//                         Plus/Minus Button Actions                         //
///////////////////////////////////////////////////////////////////////////////

SOEBothExpertScene1.prototype.plusButtonAction = function() {
  //when plus button clicked (if not already at max number of balls):
  //-redefine this.currentBallNumber to new ball number
  //-change number label to reflect current number of balls in the left truck
  //-reset truck slider image so that it indicates new/current number of balls  
  if(this.currentBallNumber < MAX_BALL_NUM) {
    this.currentBallNumber++; 
    this.numberLabel.text = "" + (this.currentBallNumber);
    this.truckSlider.sliderImage(LeftTruckImages[this.currentBallNumber]);
  }
}

SOEBothExpertScene1.prototype.minusButtonAction = function() {
  //when minus button clicked (if not already at min number of balls):
  //-redefine this.currentBallNumber to new ball number 
  //-change number label to reflect current number of balls in the left truck
  //-reset truck slider image so that it indicates new/current number of balls
  if(this.currentBallNumber > MIN_BALL_NUM) {
    this.currentBallNumber--; 
    this.numberLabel.text = "" + (this.currentBallNumber);
    this.truckSlider.sliderImage(LeftTruckImages[this.currentBallNumber]);
  }

}

///////////////////////////////////////////////////////////////////////////////
//                               Slider Action                               //
///////////////////////////////////////////////////////////////////////////////

SOEBothExpertScene1.prototype.sliderAction = function() { 
  console.log("Current Truck Position: " + this.truckSlider.posVal);
  
  
} 

///////////////////////////////////////////////////////////////////////////////
//                             Reset Action                                  //
///////////////////////////////////////////////////////////////////////////////

SOEBothExpertScene1.prototype.resetScene = function() {
  //reset slider to default position, truck image to default image with 0 balls, and label to read 0
  this.truckSlider.posVal = 1;
  this.truckSlider.fixPosition();
  this.truckSlider.sliderImage(LeftTruckImages[0]);
  this.numberLabel.text = "0";
}

///////////////////////////////////////////////////////////////////////////////
//                            Next/Home Actions                              //
///////////////////////////////////////////////////////////////////////////////

SOEBothExpertScene1.prototype.homeButtonAction = function() {
  stage.transitionTo('scene1').then(() => {this.resetScene()});
}

SOEBothExpertScene1.prototype.nextButtonAction = function() {
 //send ball value + space value, run game, receive command to transition to either try again or congrats when done 
  if(this.truckSlider.posVal === this.spaceAnswer && this.currentBallNumber === this.ballAnswer)
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