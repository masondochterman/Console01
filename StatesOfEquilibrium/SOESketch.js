'use strict';

//you have my sympathies 
///////////////////////////////////////////////////////////////////////////////
//                          Wobble - Game Definition                         //
///////////////////////////////////////////////////////////////////////////////

//balance beam image variables
var balanceBeamWidth, balanceBeamX, balanceBeamY, balanceBeamHeight;

//variables for x position of trucks
var numberOfSpaces, lengthOfSpaces, space1Position, space2Position, space3Position, space4Position, space5Position, 
    space6Position, space7Position, space8Position, space9Position, space10Position, space11Position, space12Position, 
    blankSpace1Position;

//truck image variables
var truckY, truckWidth, truckHeight;

//variables for button position
var gap, multipleChoiceY1, multipleChoiceY2,
    buttonWidth, buttonHeight;

//declare arrays for possible truck positions and the truck images
var TruckPositions, LeftTruckImages, RightTruckImages;

//even more variables
var MIN_BALL_NUM = 0;
var MAX_BALL_NUM = 6;

function SOESketch() {
  Scene.call(this);
  
  //Variable definitions for the game
  
  //multiple choice button variables
  gap = windowWidth / 9;
  buttonWidth = (windowWidth - 2 * borderBufferDist - 2 * gap) / 3;
  buttonHeight = buttonWidth / 2;
  multipleChoiceY1 = windowHeight / 1.6;
  multipleChoiceY2 = windowHeight / 1.2;
  
  //balance beam variables
  balanceBeamWidth = windowWidth - (2 * borderBufferDist);
  balanceBeamX = borderBufferDist;
  balanceBeamHeight = windowHeight / 3.5;
  balanceBeamY = floor(windowHeight / 3.5 + .5);
  
  //truck position variables/definitions
  numberOfSpaces = 14;
  lengthOfSpaces = floor((balanceBeamWidth/numberOfSpaces) + .5);
  
  //truck variables / related arrays
  truckY = windowHeight / 6; 
  truckWidth = 2 * lengthOfSpaces;
  truckHeight = windowHeight / 7;
  LeftTruckImages = [leftTruckImg, leftTruckBall1Img, leftTruckBall2Img, leftTruckBall3Img, leftTruckBall4Img, leftTruckBall5Img, leftTruckBall6Img];
  RightTruckImages = [rightTruckImg, rightTruckBall1Img, rightTruckBall2Img, rightTruckBall3Img, rightTruckBall4Img, rightTruckBall5Img, rightTruckBall6Img];
  
  TruckPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  //create all the x positions for truck placement on balance beam                  
  for(var i = 0; i < numberOfSpaces - 1; i ++) {
      if( i === 0) { //first position is 0...this position should never be used
          TruckPositions[i] = 0;
      }
      else {
          if(i < 7) { //calculate x positions for spaces 1-6
             TruckPositions[i] = balanceBeamX + (i - 1) * lengthOfSpaces; 
          }
          else if(i >= 7) { //calculate x positions for spaces 7-12 (taking into account blank space in the middle of beam)
             TruckPositions[i] = balanceBeamX + i * lengthOfSpaces;
          }    
      }
  }
  
  //arrays for defining buttons in title, congrats, and try again scenes
  var titleSceneButtons = ["Space", "Ball", "Both"];
  var titleSceneActions = [this.spaceAction.bind(this), this.ballAction.bind(this), this.bothAction.bind(this)];
  
  var tryAgainButtons = ["Back", "Skip", "Done"];
  var tryAgainActions = [this.tryAgainBackAction.bind(this), this.tryAgainSkipAction.bind(this), this.homeButtonAction.bind(this)];
  var congratsButtons = ["Next", "Done"];
  var congratsActions = [this.congratsNextAction.bind(this), this.homeButtonAction.bind(this)];
  
  //defines pick a mode + results scenes
  scene1 = new ButtonsScene("Wobble", "Pick a Mode", titleSceneButtons, titleSceneActions, this.homeButtonAction.bind(this), null);
  tryAgainScene = new SOEResultScene("Wobble", "Try Again", tryAgainButtons, tryAgainActions, this.homeButtonAction.bind(this), null);
  congratScene = new SOEResultScene("Wobble", "You're Correct", congratsButtons, congratsActions, this.homeButtonAction.bind(this), null);
  
  //define play scenes for game
  //Note: none of the current scenes contain correct situations/answers
  ballMC1 = new SOEBallMCScene1(2, 5, 6, 5, 1, 12, 4, 'ballMC1', 'ballExpert1');
  spaceMC1 = new SOESpaceMCScene1(1, 4, 5, 5, 4, 9, 2, 'spaceMC1', 'spaceExpert1');
  bothMC1 = new SOEBothMCScene1(2, 5, 3, 2, 1, 3, 3, 2, 10, 3, 'bothMC1', 'bothMC2');
  bothMC2 = new SOEBothMCScene2(5, 3, 4, 4, 2, 2, 4, 3, 10, 1, 'bothMC2', 'bothExpert1');
  spaceExpert1 = new SOESpaceExpertScene1(5, 4, 12, 2, 'spaceExpert1', 'ConsoleOpeningScene');
  ballExpert1 = new SOEBallExpertScene1(4, 3, 12, 2, 'ballExpert1', 'ConsoleOpeningScene');
  bothExpert1 = new SOEBothExpertScene1(3, 2, 12, 2, 'bothExpert', 'ConsoleOpeningScene');
  
  
  // Stage.addScene adds a scene with a particular name
  stage.addScene('scene1', scene1);
  stage.addScene('ballMC1', ballMC1);
  stage.addScene('spaceMC1', spaceMC1);
  stage.addScene('bothMC1', bothMC1);
  stage.addScene('bothMC2', bothMC2);
  stage.addScene('spaceExpert1', spaceExpert1);
  stage.addScene('ballExpert1', ballExpert1);
  stage.addScene('bothExpert1', bothExpert1);
  stage.addScene('congratScene', congratScene);
  stage.addScene('tryAgainScene', tryAgainScene);

}

_inherits(SOESketch, Scene);

///////////////////////////////////////////////////////////////////////////////
//                          Title Scene Actions                              //
///////////////////////////////////////////////////////////////////////////////

SOESketch.prototype.spaceAction = function() {
  stage.transitionTo('spaceMC1');
}

SOESketch.prototype.ballAction = function() {
  stage.transitionTo('ballMC1');
}
SOESketch.prototype.bothAction = function() {
  stage.transitionTo('bothMC1'); 
}

///////////////////////////////////////////////////////////////////////////////
//                          Try Again Scene Actions                          //
///////////////////////////////////////////////////////////////////////////////

SOESketch.prototype.tryAgainBackAction = function() {
   //transition to previous scene
   stage.transitionTo(tryAgainScene.sceneLeft);
 }
SOESketch.prototype.tryAgainSkipAction = function() {
   //transition to next scene
   stage.transitionTo(tryAgainScene.nextScene);
 }

///////////////////////////////////////////////////////////////////////////////
//                          Congrats Scene Actions                           //
///////////////////////////////////////////////////////////////////////////////

SOESketch.prototype.congratsNextAction = function() {
    //transition to next scene
    stage.transitionTo(congratScene.nextScene); 
 }
 
SOESketch.prototype.homeButtonAction = function() {
  stage.transitionTo('titleScene');
}
