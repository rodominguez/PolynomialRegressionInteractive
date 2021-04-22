class MLDrawer {

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

	draw(){
		stroke(0);
		strokeWeight(0);
		if (this.ml.isStarted){
			for (let i = 0; i < windowWidth; i++){
				let x = this.convertPointX(i);
				let y = this.ml.evaluate(this.convertPointToSampleX(this.convertPointX(i)))[0];
				if (i == 0){
					//console.log(this.ml.weigths);
					//console.log(y);
				}
				stroke(0);
				circle(this.convertPointBackX(x), this.convertPointBackY(y), 2);
			}
			this.drawFunction();
		}
	}

	drawFunction(){
		let res = "";
		for (let i = 0; i < this.ml.weigths[0].length; i++){
			if (i != 0)
				res += " + "
			res += (this.ml.weigths[0][i] / Math.pow(10 * this.scale, i) * 10 * this.scale).toFixed(4) + "x^" + i;
		}

		this.function = res;
		textAlign(LEFT, CENTER);
		textSize(16);
		text(res, this.x, this.y+20)
		textAlign(CENTER, CENTER);
		textSize(12);
	}

	convertPointToSampleX(point){
		let x = new Array();
		for (let i = 0; i < this.dimension + 1; i++)
			x.push(Math.pow(point / (10 * this.scale), i));
		return x;
	}

	convertPointX (x){
		x -= windowWidth / 2 + this.offsetX;
		x /= 100;
		x *= this.scale;
		return x;
	}

	convertPointBackX (x){
	 	x /= this.scale;
	 	x *= 100;
	 	x += windowWidth / 2 + this.offsetX;
	 	return Math.floor(x);
	}

	convertPointBackY (y){
		y *= (10 * this.scale);
		y /= -this.scale;
	 	y *= 100;
	 	y += windowHeight / 2 + this.offsetY;
	 	return Math.floor(y);
	}
}

function copyFunction(drawer){
	let input = document.createElement('INPUT');
	let body = document.getElementsByTagName('body')[0];
	body.appendChild(input);
	input.setAttribute('value', drawer.function);
	input.select();

	document.execCommand("copy");

  	/* Alert the copied text */
  	//alert("Copied the text: " + drawer.function);

  	body.removeChild(input);
}