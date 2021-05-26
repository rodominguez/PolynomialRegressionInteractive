class Point {

	/**
	Constructor that creates a new Point
	@author	Rodrigo Dominguez
	@param {float} x 		x grid coordinate
	@param {float} y 		y grid coordinate
	@param {int} diameter	circle diameter
	@param {float} offsetX	current offset x 
	@param {float} offsetY 	current offset y
	@param {float} scale 	current scale 
	**/
	constructor(x, y, diameter, offsetX, offsetY, scale){
	 	this.x = x;
	 	this.y = y;
	 	this.diameter = diameter;
	 	this.offsetX = offsetX;
	 	this.offsetY = offsetY;
	 	this.scale = scale;
	}

	/**
	Function that draws the point
	@author	Rodrigo Dominguez
	**/
	draw(){
	 	ellipseMode(CENTER);
	 	circle(this.convertPointX(this.x), this.convertPointY(this.y), this.diameter);
	}

	/**
	Function that converts screen position x to grid position x
	@author	Rodrigo Dominguez
	@param {float} x 	screen x position
	@return {float}	 	grid x position
	**/
	convertPointX (x){
	 	x /= this.scale;
	 	x *= 100;
	 	x += windowWidth / 2 + this.offsetX;
	 	return Math.floor(x);
	}

	/**
	Function that converts screen position y to grid position y
	@author	Rodrigo Dominguez
	@param {float} y 	screen y position
	@return {float}	 	grid y position
	**/
	convertPointY (y){
		y /= -this.scale;
	 	y *= 100;
	 	y += windowHeight / 2 + this.offsetY;
	 	return Math.floor(y);
	}
}