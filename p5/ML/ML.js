class ML { //Machine Learning

	/**
	Constructor for a new ML object (Machine Learning)
	@author	Rodrigo Dominguez
	@param {float} alfa 		alfa value
	@param {float} accuracy		target accuracy value
	**/
	constructor(alfa, accuracy){
		this.isStarted = false;
		this.x = new Array();
		this.y = new Array();
		this.alfa = alfa;
		this.accuracy = accuracy;
		this.pastError = 0;
	}

	/**
	Function that resets the samples
	@author	Rodrigo Dominguez
	**/
	reset(){
		this.x.length = 0;
		this.y.length = 0;
	}

	/**
	Function that calls the weights to be initialized
	@author	Rodrigo Dominguez
	**/
	init (){
		this.initWeights();
		this.accuracy = accuracy;
	}

	/**
	Function that adds a sample for the model to use
	@author	Rodrigo Dominguez
	**/
	addSample(x, y){
		this.x.push(x);
		this.y.push(y);
	}

	/**
	Function that removes the last sample
	@author	Rodrigo Dominguez
	**/
	removeSample(){
		this.x.pop();
		this.y.pop();
	}

	/**
	Function that evaluates a given sample
	@author	Rodrigo Dominguez
	@param {float[]} x 		sample vector to evaluate
	@return {float[]} 		prediction vector
	**/
	evaluate(x){
		let res = new Array();

		for (let i = 0; i < this.weigths.length; i++){
			res.push(this.hypothesis(this.weigths[i], x));
		}

		return res;
	}

	/**
	Function that trains the model
	@author	Rodrigo Dominguez
	**/
	train(){
		if (!this.isStarted) return;
		if (this.isFitted()) return;

		//apply gradient descent 1000 times for every 'draw' loop iteration that train() is called
		for (let i = 0; i < 1000; i++)
			this.weigths = this.GD();
	}

	/**
	Function that evaluates if the model should continue training based on the target accuracy
	@author	Rodrigo Dominguez
	@return {bool} 		is the model fitted accurately
	**/
	isFitted (){
		let prediction, error, percentage, acum = 0;
		for (let j = 0; j < this.x.length; j++){
			for (let i = 0; i < this.weigths.length; i++){
				prediction = this.hypothesis(this.weigths[i], this.x[j]);
				error = Math.abs(prediction - this.y[j][i]);
				percentage = Math.abs(error / this.y[j][i]);
				acum += percentage;
			}
		}

		acum /= this.x.length;

		if (acum <= 1 - this.accuracy)
			return true;

		if (this.pastError == acum)
			return true;
		this.pastError = acum;

		return false;
	}

	/**
	Function that applies gradient descent to the weights and returns the new weights
	@author	Rodrigo Dominguez
	@return {float[][]} temp 	updated weights
	**/
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

	/**
	Function that calculates the hypothesis function being 'w1 * x1 + w2 * x2 ... wn * xn'
	@author	Rodrigo Dominguez
	@param {float[]} weights 	array with the weights
	@param {float[]} input 		array with the samples
	@return {float} res 		the result of the calculated hypthesis
	**/
	hypothesis(weigths, input){
		let res = 0;

		for (let i = 0; i < input.length; i++)
			res += weigths[i] * input[i];

		return res;
	}

	/**
	Function that initializes the weights with random values
	@author	Rodrigo Dominguez
	**/
	initWeights(){
		this.weigths = new Array();
		this.weigths.length = 0;
		for (let i = 0; this.y[0] != null && i < this.y[0].length; i++){
			this.weigths.push(this.randomWeightArray(this.x[0].length));
		}
	}

	/**
	Function that returns an array of a determined size with random values
	@author	Rodrigo Dominguez
	@param {int} size 	size of the array
	@return {float[]} 	array of size 'size' with random values
	**/
	randomWeightArray(size){
		let res = new Array();
		for (let i = 0; i < size; i++)
			res.push(Math.random());

		return res;
	}

	/**
	Function that duplicates the weights
	@author	Rodrigo Dominguez
	@return {float[][]} res 	new matrix with same values as the weights
	**/
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