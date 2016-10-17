'use strict';
//this is a modification of the Slider actor to fit the needs of Wobble
function SOESlider(x, y, width, mini, maxi, defVal, onChange, imgWidth, imgHeight) {
    // call the "super" constructor
    Slider.call(this, x, y, width, mini, maxi, defVal, onChange);
    
    this.unit = width / (maxi - mini);//diff
    this.height = imgHeight; //diff
    this.iconWidth = imgWidth;
    this.iconHeight = imgHeight;
    this.fixPosition();

}

_inherits(SOESlider, Slider);


SOESlider.prototype.draw = function draw() {
    //fill(125);
    //rect(0, this.height / 2 - this.barHeight / 2, this.width, this.barHeight, 100);
    
    // textSize(windowWidth / 55);
    // text(this.posVal.toString(), this.position - this.circleRadius / 3.75, this.height + this.iconHeight/2);
    
    strokeWeight(5);
    //draw lines under current space number on the balance beam
    if(this.posVal == 1)
    {
      line(-15, this.height + this.iconHeight/2, 20,this.height + this.iconHeight/2);
    }
    else if(this.posVal == 2)
    {
      line(this.unit-15, this.height + this.iconHeight/2, this.unit + 20,this.height + this.iconHeight/2);
    }
    else if(this.posVal == 3)
    {
      line(2*this.unit-15, this.height + this.iconHeight/2, 2*this.unit + 20,this.height + this.iconHeight/2);
    }
    else if(this.posVal == 4)
    {
      line(3*this.unit-15, this.height + this.iconHeight/2, 3*this.unit + 20,this.height + this.iconHeight/2);
    }
    else if(this.posVal == 5)
    {
      line(4*this.unit-15, this.height + this.iconHeight/2, 4*this.unit + 20,this.height + this.iconHeight/2);
    }
    else if(this.posVal == 6)
    {
      line(5*this.unit-15, this.height + this.iconHeight/2, 5*this.unit + 20,this.height + this.iconHeight/2);
    }
        
    image(this.sliderIcon, this.position - this.iconWidth/2, 0, this.iconWidth, this.iconHeight);
};

SOESlider.prototype.boundsCheck = function boundsCheck(touch) {
    return touch.x <= this.position + this.iconWidth/2
        && touch.x >= this.position - this.iconWidth/2
        && touch.y <= this.iconHeight
        && touch.y >= 0-this.iconHeight;
};

SOESlider.prototype.fixPosition = function fixPosition() {
    this.position = (this.posVal - this.mini) * this.unit;
};

SOESlider.prototype.update = function update(touch) {
    this.position = touch.x;
    if (this.position < 0) {
        this.position = 0;
    } else if (this.position > this.width) {
        this.position = this.width;
    }
    this.posVal = this.mini + round(this.position / this.unit);
    if ( this.onChange != null )
    {
        this.onChange(this.posVal);
    }
};

