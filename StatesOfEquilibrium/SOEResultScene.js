'use strict';

///////////////////////////////////////////////////////////////////////////////
//                           Scene Definition                                //
///////////////////////////////////////////////////////////////////////////////

//creates try again/congrats scene 

//send scene the following paramaters: 
//title - title of the scene (String)
//description - description of the scene (String)
//buttonNames - array composed of the names for the desired number of buttons (String)
//buttonActions - array composed of the actions for the desired number of buttons (String)
//homeButtonAction - action for the home button (if you want one)
//nextButtonAction - action for the next button (if you want one)

function SOEResultScene(title, description, buttonNames, buttonActions, homeButtonAction, nextButtonAction) {
  ButtonsScene.call(this, title, description, buttonNames, buttonActions, homeButtonAction, nextButtonAction); //inherits ButtonsScene
  
  this.sceneLeft = null;
  this.nextScene = null;
}

_inherits(SOEResultScene, ButtonsScene);

//sets this.sceneLeft and this.nextScene to before/after scenes of results scene
SOEResultScene.prototype.setSceneSequence = function(sceneLeft, nextScene) {
  this.sceneLeft = sceneLeft;
  this.nextScene = nextScene;
}