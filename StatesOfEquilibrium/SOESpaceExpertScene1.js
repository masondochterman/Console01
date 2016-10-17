'use strict';

///////////////////////////////////////////////////////////////////////////////
//                           Scene Definition                                //
///////////////////////////////////////////////////////////////////////////////

//creates scene for the expert level in the space mode

//send scene the following paramaters: 
//leftTruckBallNumber - number of balls for the left truck (int)
//answer - the correct number of spaces for the left truck (int)
//rightTruckPosition - the given position of the right truck (int)
//rightTruckBallNumber - the given number of balls in right truck (int)
//sceneName -  the name of the scene (String)
//nextScene - the name of the scene transitioned to after a correct answer (String)

function SOESpaceExpertScene1(leftTruckBallNumber, answer, rightTruckPosition, rightTruckBallNumber, sceneName, nextScene) {
    
    Scene.call(this);
    
    //define scene variables
    this.leftTruckBallNumber = leftTruckBallNumber;
    this.spaceAnswer = answer;
    
    this.sceneName = sceneName;
    this.nextScene = nextScene;
    
    //create actors
    this.nextButton = new NextButton(this.nextButtonAction.bind(this));
    this.balanceBeam = new ImageLabel(balanceBeamX, balanceBeamY, balanceBeamWidth, balanceBeamHeight, balanceImg);
    this.truckSlider = new SOESlider(TruckPositions[2], truckY, balanceBeamWidth/2 - 2*lengthOfSpaces, 1, 6, 1, this.sliderAction.bind(this), truckWidth, truckHeight);
    this.truckSlider.sliderImage(LeftTruckImages[this.leftTruckBallNumber]);
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
    this.addActor(this.truckSlider);
    this.addActor(this.rightTruck);
  
  
    console.log("created SpaceExpert1 scene");
}

_inherits(SOESpaceExpertScene1, Scene);

///////////////////////////////////////////////////////////////////////////////
//                               Slider Action                               //
///////////////////////////////////////////////////////////////////////////////

SOESpaceExpertScene1.prototype.sliderAction = function() {
  console.log("Current Truck Position: " + this.truckSlider.posVal);
}

///////////////////////////////////////////////////////////////////////////////
//                             Reset Action                                  //
///////////////////////////////////////////////////////////////////////////////

SOESpaceExpertScene1.prototype.resetScene = function() {
   //reset slider to default position
   this.truckSlider.posVal = 1;
   this.truckSlider.fixPosition();
}

///////////////////////////////////////////////////////////////////////////////
//                            Next/Home Actions                              //
///////////////////////////////////////////////////////////////////////////////

SOESpaceExpertScene1.prototype.homeButtonAction = function() {
  stage.transitionTo('scene1').then(() => {this.resetScene()});
}

SOESpaceExpertScene1.prototype.nextButtonAction = function(){
  //send ball value + space value, run game, receive command to transition to either try again or congrats when done
  if(this.truckSlider.posVal === this.spaceAnswer)
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
