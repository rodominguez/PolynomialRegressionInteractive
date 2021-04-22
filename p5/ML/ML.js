class ML {

	constructor(alfa){
		this.isStarted = false;
		this.x = new Array();
		this.y = new Array();
		this.alfa = alfa;
	}

	reset(){
		this.x.length = 0;
		this.y.length = 0;
		console.log(this.x);
	}

	init (){
		this.initWeights();
	}

	addSample(x, y){
		this.x.push(x);
		this.y.push(y);
	}

	evaluate(x){
		let res = new Array();

		for (let i = 0; i < this.weigths.length; i++){
			res.push(this.hypothesis(this.weigths[i], x));
		}

		return res;
	}

	train(){
		if (!this.isStarted) return;
		for (let i = 0; i < 1000; i++)
			this.weigths = this.GD();
	}

	GD () {
		let temp = this.copyWeights();
		for (let k = 0; k < this.weigths.length; k++){
			for (let j = 0; j < this.weigths[k].length; j++){
				let acum = 0, error = 0;
				for (let i = 0; i < this.x.length; i++){
					let prediction = this.hypothesis(this.weigths[k], this.x[i]);
					error = prediction - this.y[i][k];
					acum += error * this.x[i][j];
				}
				acum /= this.x.length;
				let step = acum * this.alfa;
				temp[k][j] = this.weigths[k][j] - step;
			}
		}

		return temp;
	}

	hypothesis(weigths, input){
		let res = 0;

		for (let i = 0; i < input.length; i++)
			res += weigths[i] * input[i];

		return res;
	}

	initWeights(){
		this.weigths = new Array();
		for (let i = 0; i < this.y[0].length; i++){
			this.weigths.push(this.randomWeightArray(this.x[0].length));
		}
	}

	randomWeightArray(size){
		let res = new Array();
		for (let i = 0; i < size; i++)
			res.push(Math.random());

		return res;
	}

	copyWeights(){
		let res = new Array();

		for (let i = 0; i < this.weigths.length; i++){
			res.push(new Array());
			for (let j = 0; j < this.weigths[i].length; j++){
				res[i].push(this.weigths[i][j]);
			}
		}

		return res;
	}
}