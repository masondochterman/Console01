'use strict';
//it's a joystick...it combines parts of the wheel and touch pad actors
function Joystick(x, y, width, height, onChange, img1, img2) {
  Actor.call(this, x, y, width, height);
  this.onChange = onChange;
  this.backgroundImg = img1;
  this.joystickImg = img2;
  this.joystickSize = width/2.5;
  this.currentTouchX = 0 + width/2;
  this.currentTouchY = 0 + height/2;
}

_inherits(Joystick, Actor);

Joystick.prototype.draw = function() {
  
  image(this.backgroundImg, 0 , 0 , this.width, this.height);
  
  image(this.joystickImg, this.currentTouchX - this.joystickSize/2, this.currentTouchY - this.joystickSize/2, this.joystickSize, this.joystickSize);
};

function _isInEllipse(x, y, width, height) {
  return ((x * x) / (0.25 * width * width)) + ((y * y) / (0.25 * height * height)) < 1;
}

Joystick.prototype.inTouchPad = function inTouchPad(t) {
  var relX = t.x - this.width / 2;
  var relY = t.y - this.height / 2;
  
  if (_isInEllipse(relX, relY, this.width-this.joystickSize, this.height - this.joystickSize)) {
     return 0;
    }
  else if(_isInEllipse(relX, relY, this.width, this.height)) {
    return 1;
  }
  else {
    return -1;
  }
};

Joystick.prototype.inJoystick = function inJoystick(cur, last) {
   var relX = cur.x - this.width / 2;
   var relY = cur.y - this.height / 2;
  if (_isInEllipse(last.x, last.y, this.joystickSize, this.joystickSize)) {
     return true;
    }
  else {
    return false;
  }
};

Joystick.prototype.resetJoystick = function() {
  this.currentTouchX = 0 + this.width/2;
  this.currentTouchY = 0 + this.height/2;
}

Joystick.prototype.touchStarted = function touchStarted(t) {
  return t;
};

Joystick.prototype.touchMoved = function touchMoved(cur, last) {
/*   console.log("x = " + cur.x);
  console.log("y = " + cur.y); */
  var touchLocation = this.inTouchPad(cur);
  
  // if(!this.inJoystick(cur, last))
  // {
  //   return last;
  // }
    if(touchLocation === 0)
    {
     var deltaX = cur.x - last.x,
          deltaY = cur.y - last.y;
      this.onChange(deltaX, deltaY);
      this.currentTouchX = cur.x ;
      this.currentTouchY = cur.y ;
	  this.onChange(this.currentTouchX, this.currentTouchY);
      return cur;
    }
    else if(touchLocation === 1)
    {
      var curAngle = atan2(cur.y - this.width/2, cur.x - this.height/2);
      this.currentTouchX =  ((this.width/2 - this.joystickSize/2) * cos(curAngle)) + this.width/2;
      this.currentTouchY = ((this.width/2 - this.joystickSize/2) * sin(curAngle)) + this.height/2;
      this.onChange(this.currentTouchX, this.currentTouchY);
	  return cur;
      
    }
    else if(touchLocation === -1)
    {
	  this.onChange(this.currentTouchX, this.currentTouchY);
      return last;
    }
};

