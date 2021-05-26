class Pointer {

	/**
	Constructor for a new Pointer
	@author Rodrigo Dominguez
	@param {float} dimension 	current dimension
	@param {float} isPaintMouse	indicates to paint the mouse coordinates
	**/
	constructor(dimension, isPaintMouse){
		this.offsetX = 0;
		this.offsetY = 0;
		this.scale = 1;
		this.dimension = dimension;
		this.isPaintMouse = isPaintMouse;
	}
	/**
	Function that draws the mouse coordinates on screen
	@author	Rodrigo Dominguez
	**/
	draw(){
		if (this.isPaintMouse){
			fill(0);
			strokeWeight(0);
			text("(" + this.convertPointX(mouseX) + ", " + this.convertPointY(mouseY) + ")", mouseX, mouseY - 10);
		}
	}

	/**
	Function that converts screen position x to grid position x
	@author	Rodrigo Dominguez
	@param {float} x 	screen x position
	@return {float}	 	grid x position
	**/
	convertPointX (x){
		x -= windowWidth / 2 + this.offsetX;
		x /= 100;
		x *= this.scale;
		return x.toFixed(6);
	}

	/**
	Function that converts screen position y to grid position y
	@author	Rodrigo Dominguez
	@param {float} y 	screen y position
	@return {float}	 	grid y position
	**/
	convertPointY (y){
		y -= windowHeight / 2 + this.offsetY;
		y /= 100;
		y *= -this.scale;
		return y.toFixed(6);
	}

	/**
	Function sets the new dimension
	@author	Rodrigo Dominguez
	@param {float} dimension 	new grid dimension
	**/
	setDimension(dimension){
		this.dimension = dimension;
	}

	/**
	Function sets the new offsets
	@author	Rodrigo Dominguez
	@param {float} offsetX 		offset x to the grid center
	@param {float} offsetY 		offset y to the grid center
	**/
	setOffsets(offsetX, offsetY){
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}

	/**
	Function sets the new scale
	@author	Rodrigo Dominguez
	@param {float} scale 		new grid scale
	**/
	setScale(scale){
		this.scale = scale;
	}
}