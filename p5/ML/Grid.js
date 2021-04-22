class Grid {

	constructor(){
		this.offsetX = 0;
		this.offsetY = 0;
		this.scale = 1;
	}

	draw () {
		fill(0);
		translate(windowWidth / 2, windowHeight / 2);

		for (let i = 20; i <= windowWidth / 2 - this.offsetX; i += 20){
			if (i % 100 == 0){
				stroke(126);
				strokeWeight(1);
				line(i + this.offsetX, -windowHeight / 2, i + this.offsetX, windowHeight / 2);
				text("" + i / 100 *  this.scale, i + this.offsetX, this.offsetY - 10);
			}
			else {
				stroke(200);
				strokeWeight(1);
				line(i + this.offsetX, -windowHeight / 2, i + this.offsetX, windowHeight / 2);
			}
		}

		for (let i = -20; i > -windowWidth / 2 - this.offsetX; i -= 20){
			if (i % 100 == 0){
				stroke(126);
				strokeWeight(1);
				line(i + this.offsetX, -windowHeight / 2, i + this.offsetX, windowHeight / 2);
				text("" + i / 100 *  this.scale, i + this.offsetX, this.offsetY - 10);
				
			}
			else {
				stroke(200);
				strokeWeight(1);
				line(i + this.offsetX, -windowHeight / 2, i + this.offsetX, windowHeight / 2);
			}
		}

		for (let i = 20; i <= windowHeight / 2 + this.offsetY; i += 20){
			if (i % 100 == 0){
				stroke(126);
				strokeWeight(1);
				line(-windowWidth / 2, -i + this.offsetY, windowWidth / 2, -i + this.offsetY);
				text("" + i / 100 * this.scale, this.offsetX + 20, -i + this.offsetY);
			}
			else{
				stroke(200);
				strokeWeight(1);
				line(-windowWidth / 2, -i + this.offsetY, windowWidth / 2, -i + this.offsetY);
			}
		}

		for (let i = -20; i > -windowHeight / 2 + this.offsetY; i -= 20){
			if (i % 100 == 0){
				stroke(126);
				strokeWeight(1);
				line(-windowWidth / 2, -i + this.offsetY, windowWidth / 2, -i + this.offsetY);
				text("" + i / 100 * this.scale, this.offsetX + 20, -i + this.offsetY);
			}
			else{
				stroke(200);
				strokeWeight(1);
				line(-windowWidth / 2, -i + this.offsetY, windowWidth / 2, -i + this.offsetY);
			}
		}

		stroke(0);
		strokeWeight(2);
		line(-windowWidth / 2, this.offsetY, windowWidth / 2, this.offsetY);
		line (this.offsetX, -windowHeight / 2, this.offsetX, windowHeight / 2);
		translate(-windowWidth / 2, -windowHeight / 2);
	}

}