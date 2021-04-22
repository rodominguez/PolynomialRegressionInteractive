class Point {

	 constructor(x, y, diameter, offsetX, offsetY, scale){
	 	this.x = x;
	 	this.y = y;
	 	this.diameter = diameter;
	 	this.offsetX = offsetX;
	 	this.offsetY = offsetY;
	 	this.scale = scale;
	 }

	 draw(){
	 	ellipseMode(CENTER);
	 	circle(this.convertPointX(this.x), this.convertPointY(this.y), this.diameter);
	 }

	 convertPointX (x){
	 	x /= this.scale;
	 	x *= 100;
	 	x += windowWidth / 2 + this.offsetX;
	 	return Math.floor(x);
	}

	convertPointY (y){
		y /= -this.scale;
	 	y *= 100;
	 	y += windowHeight / 2 + this.offsetY;
	 	return Math.floor(y);
	}
}