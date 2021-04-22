class Pointer {

	constructor(ml, dimension, isPaintMouse){
		this.ml = ml;
		this.offsetX = 0;
		this.offsetY = 0;
		this.scale = 1;
		this.points = new Array();
		this.dimension = dimension;
		this.isPaintMouse = isPaintMouse;
	}

	draw(){
		stroke(0);
		strokeWeight(0);
		for (let point of this.points)
			point.draw();
		this.ml.train();
		if (this.isPaintMouse){
			fill(0);
			text("(" + this.convertPointX(mouseX) + ", " + this.convertPointY(mouseY) + ")", mouseX, mouseY - 10);
		}
	}

	convertPointX (x){
		x -= windowWidth / 2 + this.offsetX;
		x /= 100;
		x *= this.scale;
		return x.toFixed(6);
	}

	convertPointY (y){
		y -= windowHeight / 2 + this.offsetY;
		y /= 100;
		y *= -this.scale;
		return y.toFixed(6);
	}

	addPoint(){
		let point = new Point(this.convertPointX(mouseX), this.convertPointY(mouseY), 10, this.offsetX, this.offsetY, this.scale);
		this.points.push(point);

		this.ml.addSample(this.convertPointToSampleX(point), this.convertPointToSampleY(point));

		if (!this.ml.isStarted && this.points.length >= 2){
			this.ml.init();
			this.ml.isStarted = true;
		}
	}

	setDimension(dimension){
		this.dimension = dimension;

		this.resetML();
	}

	resetML(){
		this.ml.reset();

		for (let i = 0; i < this.points.length; i++)
			this.ml.addSample(this.convertPointToSampleX(this.points[i]), this.convertPointToSampleY(this.points[i]));

		this.ml.init();
	}

	convertPointToSampleX(point){
		let x = new Array();
		for (let i = 0; i < this.dimension + 1; i++)
			x.push(Math.pow(point.x / (10 * this.scale), i));
		return x;
	}

	convertPointToSampleY(point){
		let y = new Array();
		y.push(point.y / (10 * this.scale));
		return y;
	}

	setOffsets(offsetX, offsetY){
		this.offsetX = offsetX;
		this.offsetY = offsetY;

		for (let point of this.points){
			point.offsetX = offsetX;
			point.offsetY = offsetY;
		}
	}

	setScale(scale){
		this.scale = scale;

		for (let point of this.points){
			point.scale = scale;
		}

		this.resetML();
	}
}