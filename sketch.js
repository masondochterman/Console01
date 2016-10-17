'use strict';

///////////////////////////////////////////////////////////////////////////////
//                             Console 1                                     //
///////////////////////////////////////////////////////////////////////////////

//Image Variables
var homeImg, balanceImg, ballImg, pendulumSliderImg, joystickBackgroundImg, joystickImg, attrs;

//Image Variables for Wobble/States of Equilibrium
var leftTruckImg, rightTruckImg, leftTruckBall1Img, leftTruckBall2Img, leftTruckBall3Img, leftTruckBall4Img, 
    leftTruckBall5Img, leftTruckBall6Img, rightTruckBall1Img, rightTruckBall2Img, rightTruckBall3Img, 
    rightTruckBall4Img, rightTruckBall5Img, rightTruckBall6Img;

var attrs; //text attributes variable


//Wobble Scenes
var scene1,
    ballMC1,
    spaceMC1,
    bothMC1,
    bothMC2,
    spaceExpert1,
    ballExpert1,
    bothExpert1,
    congratScene,
    tryAgainScene;
    

var floor = Math.floor;
var stage = new Stage();

//Scenes for other games
var openingScene, titleScene, WobbleGame, CLGame, playCLScene, CLDropScene1, CLDropScene2, IPGame, IPTitleScene,
    IPDropScene, playIPScene, MazeGame, playMazeScene, MazeDropScene, ConsoleInstructionScene, threeBallCycleScene;

//Preloads the images to be used in Console
function preload() {
  homeImg = loadImage("/libs/images/home.png");
  balanceImg = loadImage("images/balance.png");
  ballImg = loadImage("images/ball.png");
  pendulumSliderImg = loadImage("images/invertedPendulumCircle.png");
  joystickBackgroundImg = loadImage("images/joyStickBackground.png");
  joystickImg = loadImage("images/joyStickCircle.png");
  
  leftTruckImg = loadImage("images/leftTruck.png");
  leftTruckBall1Img = loadImage("images/leftTruckBall1.png");
  leftTruckBall2Img = loadImage("images/leftTruckBall2.png");
  leftTruckBall3Img = loadImage("images/leftTruckBall3.png");
  leftTruckBall4Img = loadImage("images/leftTruckBall4.png");
  leftTruckBall5Img = loadImage("images/leftTruckBall5.png");
  leftTruckBall6Img = loadImage("images/leftTruckBall6.png");
  
  rightTruckImg = loadImage("images/rightTruck.png");
  rightTruckBall1Img = loadImage("images/rightTruckBall1.png");
  rightTruckBall2Img = loadImage("images/rightTruckBall2.png");
  rightTruckBall3Img = loadImage("images/rightTruckBall3.png");
  rightTruckBall4Img = loadImage("images/rightTruckBall4.png");
  rightTruckBall5Img = loadImage("images/rightTruckBall5.png");
  rightTruckBall6Img = loadImage("images/rightTruckBall6.png");
  
}


function setup() {
  resizeCanvas(windowWidth, windowHeight);
  initMenuVariables(); //defines global variables for console from Globals.js
  
  attrs = {fill:0, size:50, align:CENTER, style:NORMAL, leading:50};
  
  //create opening scene and game scenes
  openingScene = new ConsoleOpeningScene(openingSceneAction);
  WobbleGame = new SOESketch();
  CLGame = new CLSketch();
  IPGame = new IPSketch();
  MazeGame = new MazeSketch();
  
  var titleSceneButtons = ["Circle Ladder", "Inverted Pendulum", "Maze", "Wobble"];
  var titleSceneActions= [titleSceneCLAction, titleSceneIPAction, titleSceneMazeAction, titleSceneWobbleAction];
  var threeBallCycleButtonNames = ["Demo"];
  var threeBallCycleButtonActions = [threeBallCycleAction];
  
  titleScene = new ButtonsScene("Pick a Game", null, titleSceneButtons, titleSceneActions, homeAction, null);
  threeBallCycleScene = new ButtonsScene("Click Demo to cycle the balls", null, threeBallCycleButtonNames, threeBallCycleButtonActions, homeAction, null);
  ConsoleInstructionScene = new ConsoleInstructionScene(continueInstructionAction);
  
  //add various scenes to stage 
  stage.addScene('titleScene', titleScene);
  stage.addScene('ConsoleOpeningScene', openingScene);
  stage.addScene('WobbleGame', WobbleGame);
  stage.addScene("ConsoleInstructionScene", ConsoleInstructionScene);
  stage.addScene("threeBallCycleScene", threeBallCycleScene);
  
  

  


  
  //initially transition to opening scene
  stage.transitionTo('ConsoleOpeningScene');
}

function draw() {
  stage.draw();
}

//generic home action
function homeAction(){
  stage.transitionTo('ConsoleOpeningScene');
}

function openingSceneAction(){
  //stage.transitionTo('CLDropScene1');
  //stage.transitionTo('MazeDropScene');
  //stage.transitionTo('scene1');
  stage.transitionTo('ConsoleInstructionScene');
  console.log("Console 1--clicked");
}

///////////////////////////////////////////////////////////////////////////////
//                          Title Scene Actions                              //
///////////////////////////////////////////////////////////////////////////////

function titleSceneCLAction(){
  stage.transitionTo('CLDropScene1');
  console.log("called title CL Action");
}

function titleSceneIPAction(){
  stage.transitionTo('IPDropScene');
  console.log("called title IP Action");
}

function titleSceneMazeAction(){
  stage.transitionTo('MazeDropScene');
  console.log("called title Maze Action");
}

function titleSceneWobbleAction(){
  stage.transitionTo('scene1');
  console.log("called title Wobble Action");
}

function continueInstructionAction() {
  //ball action starts
  //get status from ball stop sensor when ball action over to start new game
  //BCSketch.checkBall(1, 'BPGTitleScene', STATE_CUPGAME);
  console.log("Start button clicked");
  stage.transitionTo('threeBallCycleScene');
}

function threeBallCycleAction()
{
	console.log("three ball cycle clicked");
	manager.changeState(STATE_BALLLOOPINGTEST);
	BALLLOOPINGTEST.master.events.threeBallCycle;
}

// all these are needed to handle touch/mouse events properly
window.touchStarted = stage.touchStarted.bind(stage);
window.touchMoved = stage.touchMoved.bind(stage);
window.touchEnded = stage.touchEnded.bind(stage);
window.mousePressed = stage.mousePressed.bind(stage);
window.mouseDragged = stage.mouseDragged.bind(stage);
window.mouseReleased = stage.mouseReleased.bind(stage);
