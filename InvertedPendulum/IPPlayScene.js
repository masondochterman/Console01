"use strict";

//variables for scene
var sliderX, sliderY, sliderWidth, sliderMin, sliderMax, sliderStartVal,
    disturbButtonX, disturbButtonY, disturbButtonWidth, disturbButtonHeight;
    
///////////////////////////////////////////////////////////////////////////////
//                             Scene Definition                              //
///////////////////////////////////////////////////////////////////////////////

function IPPlayScene()
{
  Scene.call(this);
  
  //define scene variables (slider)
  sliderWidth = (windowWidth - 2*borderBufferDist)/2;
  sliderX = windowWidth/2 - sliderWidth/2;
  sliderY = windowHeight/2 -floor(sliderWidth/15)/2;
  sliderMin = 0;
  sliderMax = 10;
  sliderStartVal = sliderMax/2;
  
  //define scene variables (disturb button)
  disturbButtonX = borderBufferDist;
  disturbButtonWidth = windowWidth/7;
  disturbButtonHeight = disturbButtonWidth/3;
  disturbButtonY = windowHeight - disturbButtonHeight/2 - borderBufferDist;
  
  //create actors for scene
  this.slider = new Slider(sliderX, sliderY, sliderWidth, sliderMin, sliderMax, sliderStartVal, this.sliderAction.bind(this));
  this.slider.sliderImage(pendulumSliderImg);
  this.disturbButton = new TextButton(disturbButtonX, disturbButtonY, disturbButtonWidth, disturbButtonHeight, "blue", "Disturb", attrs, this.disturbButtonAction.bind(this));
  
  this.nextButton = new NextButton(this.nextButtonAction.bind(this));
  this.homeButton = new HomeButton(this.homeButtonAction.bind(this));
  this.titleLabel = new Label(windowWidth/2, borderBufferDist, "Inverted Pendulum", attrs);
  
  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.addActor(this.border);
  
  //add actors for scene
  this.addActor(this.titleLabel);
  this.addActor(this.slider);
  this.addActor(this.disturbButton);
  this.addActor(this.nextButton);
  this.addActor(this.homeButton);
  
  console.log("created IP Play Scene");
}

_inherits(IPPlayScene, Scene);


///////////////////////////////////////////////////////////////////////////////
//                             Scene Actions                                 //
///////////////////////////////////////////////////////////////////////////////

//send position
IPPlayScene.prototype.sliderAction = function(position){
  
  console.log("called slider action, position = " + position);
  //send position: position*unit

}

//
IPPlayScene.prototype.disturbButtonAction = function(){
  
  console.log("called disturb button action");
  //call event to disturb the pendulum
}

IPPlayScene.prototype.resetScene = function() {
  this.slider.posVal = sliderStartVal;
  this.slider.fixPosition();
}

IPPlayScene.prototype.homeButtonAction = function(){
  stage.transitionTo('ConsoleOpeningScene').then(() => {this.resetScene()});
}

IPPlayScene.prototype.nextButtonAction = function(){
    stage.transitionTo('titleScene').then(() => {this.resetScene()});
  
}

