"use strict";

var knobWidth, knobHeight;

///////////////////////////////////////////////////////////////////////////////
//                             Scene Definition                              //
///////////////////////////////////////////////////////////////////////////////

function CLPlayScene()
{
  Scene.call(this);
  
  knobWidth = (windowHeight - 2*borderBufferDist);
  knobHeight = knobWidth;
  

  this.knob = new Speedometer(windowWidth/2 - knobWidth/2,
                                   windowHeight/2 - knobHeight/2, knobWidth, knobHeight, 
                                   this.knobAction.bind(this), knobHeight/4, 1, 135, 45)
  this.knobLabel = new Label(windowWidth/2, windowHeight/2 + knobHeight/2 + 30, "Speed", {size: 40, leading: 40});
  
  this.nextButton = new NextButton(this.nextButtonAction.bind(this));
  this.homeButton = new HomeButton(this.homeButtonAction.bind(this));
  this.titleLabel = new Label(windowWidth/4, borderBufferDist, "Circle Ladder", attrs);
  
  this.border = new BackgroundBorder();
  this.border.z = -1;
  this.addActor(this.border);
  
  this.addActor(this.titleLabel);
  this.addActor(this.knobLabel);
  this.addActor(this.knob);
  this.addActor(this.nextButton);
  this.addActor(this.homeButton);
  
  console.log("created CL Play Scene");
}

_inherits(CLPlayScene, Scene);

//sends angle position values 
CLPlayScene.prototype.knobAction = function(angle) {
  console.log("called knob action, angle = " + angle);
  //send speed value: (angle - 135)*unit, unit = (10000/270)
}

CLPlayScene.prototype.resetScene = function() {
  this.knob.displayAngle = 135;
}

CLPlayScene.prototype.homeButtonAction = function() {
  stage.transitionTo('ConsoleOpeningScene').then(() => {this.resetScene()});
}

CLPlayScene.prototype.nextButtonAction = function() {
    stage.transitionTo('titleScene').then(() => {this.resetScene()});
  
}

