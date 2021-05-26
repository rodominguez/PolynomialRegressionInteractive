class Model {

	/**
	Constructor for a new Model
	@author Rodrigo Dominguez
	@param {float} posX 	starting screen x position
	@param {float} posY		starting screen y position
	@param {float} dimension 	starting dimension
	@param {float} alfa		starting alfa
	@param {float} accuracy	starting target accuracy
	@param {bool} isPaintMouse	indicates to paint the mouse coordinates
	**/
	constructor(posX, posY, dimension, alfa, accuracy, isPaintMouse){
		this.offsetX = 0;
		this.offsetY = 0;
		this.scale = 1;

		this.posX = posX;
		this.posY = posY;
		this.dimension = dimension;
		this.alfa = alfa;
		this.accuracy = accuracy;

		this.ml = new ML(alfa, accuracy);
  		this.mlDrawer = new MLDrawer(this.ml, dimension, 350 + posX, 80 + posY);
  		this.pointer = new Pointer(dimension, isPaintMouse);
  		this.points = new Array();
  		this.ui();
	}

	/**
	Function that draws the model ui, the pointer and the each point
	@author	Rodrigo Dominguez
	**/
	draw(){
		fill(this.colorPicker.color());
		this.mlDrawer.draw();
		this.ml.train();
		this.pointer.draw();
		this.drawPoints();
	}

	/**
	Function that draws the points from the model into the screen
	@author	Rodrigo Dominguez
	**/
	drawPoints(){
		stroke(0);
		strokeWeight(0);
		for (let point of this.points)
			point.draw();
	}

	/**
	Function sets the new scale
	@author	Rodrigo Dominguez
	@param {float} scale 		new grid scale
	**/
	setScale(scale){
		this.scale = scale;
		this.mlDrawer.scale = scale;
		this.pointer.setScale(scale);
		for (let point of this.points){
			point.scale = scale;
		}

		this.resetML();
	}

	/**
	Function that sets new offsets
	@author	Rodrigo Dominguez
	@param {float} offsetX 		offset x to the grid center
	@param {float} offsetY 		offset y to the grid center
	**/
	setOffsets(offsetX, offsetY){
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.mlDrawer.offsetX = offsetX;
  		this.mlDrawer.offsetY = offsetY;

		this.pointer.setOffsets(offsetX, offsetY);

		for (let point of this.points){
			point.offsetX = offsetX;
			point.offsetY = offsetY;
		}
	}

	/**
	Function that adds a point at mouse position
	@author	Rodrigo Dominguez
	**/
	addPoint(){
		let point = new Point(this.convertPointX(mouseX), this.convertPointY(mouseY), 10, this.offsetX, this.offsetY, this.scale);
		this.points.push(point);

		//add new sample to ml object
		this.ml.addSample(this.convertPointToSampleX(point), this.convertPointToSampleY(point));

		if (!this.ml.isStarted && this.points.length >= 2){
			this.ml.init();
			this.ml.isStarted = true;
		}
	}

	/**
	Function that adds a point at x and y
	@author	Rodrigo Dominguez
	@param {float} x 	grid x position
	@param {float} y 	grid y position 
	**/
	addPointInput(){
		let x = parseFloat(this.pointXInput.value());
		let y = parseFloat(this.pointYInput.value());
		if (isNaN(x) || isNaN(y)) return;
		let point = new Point(x, y, 10, this.offsetX, this.offsetY, this.scale);
		this.points.push(point);

		//add new sample to ml object
		this.ml.addSample(this.convertPointToSampleX(point), this.convertPointToSampleY(point));

		if (!this.ml.isStarted && this.points.length >= 2){
			this.ml.init();
			this.ml.isStarted = true;
		}
	}

	/**
	Function that converts x grid coordinate into normalized x coordinate
	@author	Rodrigo Dominguez
	@param {float} point 	grid x coordinate
	**/
	convertPointToSampleX(point){
		let x = new Array();
		for (let i = 0; i < this.dimension + 1; i++)
			x.push(Math.pow(point.x / (10 * this.scale), i));
		return x;
	}

	/**
	Function that converts y grid coordinate into normalized y coordinate
	@author	Rodrigo Dominguez
	@param {float} point 	grid y coordinate
	**/
	convertPointToSampleY(point){
		let y = new Array();
		y.push(point.y / (10 * this.scale));
		return y;
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
	Function that restarts training
	@author	Rodrigo Dominguez
	**/
	resetML(){
		this.ml.reset();

		for (let i = 0; i < this.points.length; i++)
			this.ml.addSample(this.convertPointToSampleX(this.points[i]), this.convertPointToSampleY(this.points[i]));

		this.ml.init();
	}

	/**
	Function that sets the new alpha entered by the user
	@author	Rodrigo Dominguez
	**/
	setAlfa(){
	  this.alfa = parseFloat(this.alfaInput.value());

	  this.ml.alfa = this.alfa;
	}

	/**
	Function that sets all UI elements controlled by the model
	@author	Rodrigo Dominguez
	**/
	ui(){
		this.dimensionInput = createInput();
		this.dimensionInput.position(30 + this.posX, 60 + this.posY);
		this.dimensionInput.value(this.dimension + 1);

		this.alfaInput = createInput();
		this.alfaInput.position(30 + this.posX, 90 + this.posY);
		this.alfaInput.value(this.alfa);

		this.colorPicker = createColorPicker('#000000');
		this.colorPicker.position(30 + this.posX, 120 + this.posY);

		this.pointXInput = createInput();
		this.pointXInput.size(100);
		this.pointXInput.attribute('placeholder', 'x');
		this.pointXInput.position(30 + this.posX, 150 + this.posY);

		this.pointYInput = createInput();
		this.pointYInput.size(100);
		this.pointYInput.attribute('placeholder', 'y');
		this.pointYInput.position(150 + this.posX, 150 + this.posY);

		this.accuracyInput = createInput();
		this.accuracyInput.value(accuracy);
		this.accuracyInput.position(30 + this.posX, 180 + this.posY);

		let dimensionButton = createButton("Set Exponent");
		dimensionButton.position(this.dimensionInput.x + this.dimensionInput.width + this.posX + 10, 60 + this.posY);
		dimensionButton.mousePressed(() => {
			setDimension(this);
		});

	 	let alfaButton = createButton("Set Training Rate");
		alfaButton.position(this.alfaInput.x + this.alfaInput.width + this.posX + 10, 90 + this.posY);
		alfaButton.mousePressed(() =>{
			this.setAlfa();
		});

		let accuracyButton = createButton("Set Accuracy");
		accuracyButton.position(this.accuracyInput.x + this.accuracyInput.width + this.posX + 10, 180 + this.posY);
		accuracyButton.mousePressed(() =>{
			this.accuracy = parseFloat(this.accuracyInput.value());
			this.ml.accuracy = this.accuracy;
		});

		let currentModelButton = createButton("Select Model");
		currentModelButton.position(90 + this.posX, 120 + this.posY);
		currentModelButton.mousePressed(() => {
			setCurrentModel(this);
		});

		let restartButton = createButton("Restart");
		restartButton.position(90 + currentModelButton.width + 10, 120 + this.posY);
		restartButton.mousePressed(() => {
			this.ml.init();
			this.ml.accuracy = this.accuracy;
		});

		let addPointButton = createButton("Add Point");
		addPointButton.position(this.pointYInput.x + 120, 150 + this.posY);
		addPointButton.mousePressed(() => {
			this.addPointInput();
		});

		let removePointButton = createButton("Remove Point");
		removePointButton.position(this.pointYInput.x + 200, 150 + this.posY);
		removePointButton.mousePressed(() => {
			if (this.points.length > 2){
				this.points.pop();
				this.ml.removeSample();
			}
		});
	}
}

/**
Function that sets new dimension to a model
@author	Rodrigo Dominguez
@param	{Model} model 	model to apply new dimension
**/
function setDimension(model){
	  model.dimension = parseFloat(model.dimensionInput.value()) - 1;

	  if (model.dimension <= 0){
	    model.dimension = 1;
	    model.dimensionInput.value(model.dimension + 1);
	  }

	  model.pointer.setDimension(model.dimension);
	  model.mlDrawer.dimension = model.dimension;
	  model.resetML();
	}