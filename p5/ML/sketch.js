let models;

let offsetX = 0, offsetY = 0;

let scale = 1, dimension = 2;

let scaleInput, scaleButton;

let alfa = 0.001;

function setup() {
  createCanvas(windowWidth, windowHeight);

  scaleInput = createInput();
  scaleInput.position(30, 30);
  scaleInput.value(scale);

  scaleButton = createButton("Set Scale");
  scaleButton.position(scaleInput.x + scaleInput.width, 30);
  scaleButton.mousePressed(setScale);

  grid = new Grid();

  models = new Array();
  models.push(new Model(dimension, alfa, true));

  textAlign(CENTER, CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(250);
  grid.draw();
  
  for (let i = 0; i < models.length; i++)
    models[i].draw();
}

function mouseDragged(){
	offsetX -= (pmouseX - mouseX) * 0.5;
	offsetY -= (pmouseY - mouseY) * 0.5;

	grid.offsetY = offsetY;
	grid.offsetX = offsetX;

  for (let i = 0; i < models.length; i++)
    models[i].setOffsets(offsetX, offsetY);
}

function setScale(){
	scale = parseFloat(scaleInput.value());

	grid.scale = scale;
  for (let i = 0; i < models.length; i++)
    models[i].setScale(scale);
}

function keyPressed(){
  if (keyCode == 80)
    for (let i = 0; i < models.length; i++)
      models[i].addPoint();
}
