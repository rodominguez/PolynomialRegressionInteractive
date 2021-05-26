class MLDrawer {

	/**
	Constructor for a new MLDrawer (Machine Learning Drawer)
	@author Rodrigo Dominguez
	@param {ML} ml 				Machine Learning object assigned to model
	@param {float} dimension 	current dimension
	@param {float} x 			starting x drawing position (for drawing equation)
	@param {float} y 			starting y drawing position (for drawing equation)
	**/
	constructor(ml, dimension, x, y){
		this.ml = ml;
		this.dimension = dimension;
		this.offsetX = 0;
		this.offsetY = 0;
		this.scale = 1;
		this.x = x;
		this.y = y;
		this.function = "";

		let copyButton = createButton("Copy");
		copyButton.position(this.x, this.y - 30);
		copyButton.mousePressed(() => {
			copyFunction(this);
		});
	}

	/**
	Function that draws the predicted solution and the written function
	@author	Rodrigo Dominguez
	**/
	draw(){
		stroke(0);
		strokeWeight(0);
		if (this.ml.isStarted){
			this.drawPredictedSolution();
			this.drawFunction();
		}
	}

	/**
	Function that draws the predicted solution
	@author	Rodrigo Dominguez
	**/
	drawPredictedSolution(){
		for (let i = 0; i < windowWidth; i++){
			let x = this.convertPointX(i);
			let y = this.ml.evaluate(this.convertPointToSampleX(this.convertPointX(i)))[0];
			stroke(0);
			circle(this.convertPointBackX(x), this.convertPointBackY(y), 2);
		}
	}

	/**
	Function that draws the written prediction function
	@author	Rodrigo Dominguez
	**/
	drawFunction(){
		let res = "";
		for (let i = 0; i < this.ml.weigths[0].length; i++){
			if (i != 0)
				res += " + "
			res += (this.ml.weigths[0][i] / Math.pow(10 * this.scale, i) * 10 * this.scale).toFixed(6) + "x^" + i;
		}

		this.function = res;
		textAlign(LEFT, CENTER);
		textSize(16);
		text(res, this.x, this.y+20)
		textAlign(CENTER, CENTER);
		textSize(12);
	}

	/**
	Function that converts x grid coordinate into normalized x coordinate
	@author	Rodrigo Dominguez
	@param {float} point 	grid x coordinate
	**/
	convertPointToSampleX(point){
		let x = new Array();
		for (let i = 0; i < this.dimension + 1; i++)
			x.push(Math.pow(point / (10 * this.scale), i));
		return x;
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
		return x;
	}

	/**
	Function that converts normalized x position back to screen position
	@author	Rodrigo Dominguez
	@param {float} x 	normalized x position
	@return {float}	 	screen x position
	**/
	convertPointBackX (x){
	 	x /= this.scale;
	 	x *= 100;
	 	x += windowWidth / 2 + this.offsetX;
	 	return Math.floor(x);
	}

	/**
	Function that converts normalized y position back to screen position
	@author	Rodrigo Dominguez
	@param {float} y 	normalized y position
	@return {float}	 	screen y position
	**/
	convertPointBackY (y){
		y *= (10 * this.scale);
		y /= -this.scale;
	 	y *= 100;
	 	y += windowHeight / 2 + this.offsetY;
	 	return Math.floor(y);
	}
}

/**
Function that copies the function displayed on screen into the clipboard
@author	Rodrigo Dominguez
@param {MLDrawer} drawer 	drawer from which to copy the function
**/
function copyFunction(drawer){
	let input = document.createElement('INPUT');
	let body = document.getElementsByTagName('body')[0];
	body.appendChild(input);
	input.setAttribute('value', drawer.function);
	input.select();

	document.execCommand("copy");

  	body.removeChild(input);
}