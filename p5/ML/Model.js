class Model {

	constructor(dimension, alfa, isPaintMouse){
		this.dimension = dimension;
		this.alfa = alfa;

		this.ml = new ML(alfa);
  		this.mlDrawer = new MLDrawer(this.ml, dimension, 350, 60);
  		this.pointer = new Pointer(this.ml, dimension, isPaintMouse);

		this.dimensionInput = createInput();
		this.dimensionInput.position(30, 60);
		this.dimensionInput.value(dimension + 1);

		this.alfaInput = createInput();
		this.alfaInput.position(30, 90);
		this.alfaInput.value(alfa);

		this.colorPicker = createColorPicker('#000000');
		this.colorPicker.position(30, 120);

		let dimensionButton = createButton("Set Dimension");
		dimensionButton.position(this.dimensionInput.x + this.dimensionInput.width, 60);
		dimensionButton.mousePressed(() => {
			setDimension(this);
		});

	 	let alfaButton = createButton("Set Training Rate");
		alfaButton.position(this.alfaInput.x + this.alfaInput.width, 90);
		alfaButton.mousePressed(this.setAlfa);
	}

	setAlfa(){
	  this.alfa = parseFloat(this.alfaInput.value());

	  this.ml.alfa = alfa;
	}

	draw(){
		fill(this.colorPicker.color());
		this.mlDrawer.draw();
		this.pointer.draw();
  		
	}

	setScale(scale){
		this.mlDrawer.scale = scale;
		this.pointer.setScale(scale);
	}

	setOffsets(offsetX, offsetY){
		this.mlDrawer.offsetX = offsetX;
  		this.mlDrawer.offsetY = offsetY;

		this.pointer.setOffsets(offsetX, offsetY);
	}

	addPoint(){
		this.pointer.addPoint();
	}
}

function setDimension(model){
	  model.dimension = parseFloat(model.dimensionInput.value()) - 1;

	  if (model.dimension <= 0){
	    model.dimension = 1;
	    model.dimensionInput.value(model.dimension + 1);
	  }

	  model.pointer.setDimension(model.dimension);
	  model.mlDrawer.dimension = model.dimension;
	}