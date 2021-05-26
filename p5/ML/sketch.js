//Initial parameters
let models, currentModel;

let offsetX = 0, offsetY = 0;

let scale = 1, dimension = 1;

let scaleInput, scaleButton, addModelButton;

let alfa = 0.01, accuracy = 0.9;

let nextPos = 0;

/**
  Function that sets the initial values and objects of the application
  @author Rodrigo Dominguez
**/
function setup() {
  createCanvas(windowWidth, windowHeight);

  scaleInput = createInput();
  scaleInput.position(30, 30);
  scaleInput.value(scale);

  scaleButton = createButton("Set Scale");
  scaleButton.position(scaleInput.x + scaleInput.width + 10, 30);
  scaleButton.mousePressed(setScale);

  addModelButton = createButton("Add Model");
  addModelButton.position(windowWidth - 150, 30);
  addModelButton.mousePressed(addModel);

  grid = new Grid();

  models = new Array();
  models.push(new Model(0, nextPos, dimension, alfa, accuracy, true));
  currentModel = models[0];

  nextPos += 200;

  textAlign(CENTER, CENTER);
}

/**
  Function that resizes the canvas when the window is resized
  @author Rodrigo Dominguez
**/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  addModelButton.position(windowWidth - 150, 30);
}

/**
  Function that acts as the main loop and draws the entire application
  @author Rodrigo Dominguez
**/
function draw() {
  background(250);
  grid.draw();
  
  for (let i = 0; i < models.length; i++)
    models[i].draw();

  text("Press \"P\" to add a point.", windowWidth - 150, 80);
}

/**
  Function that updates the offsetX and offsetY when the mouse is dragged
  @author Rodrigo Dominguez
**/
function mouseDragged(){
	offsetX -= (pmouseX - mouseX) * 0.5;
	offsetY -= (pmouseY - mouseY) * 0.5;

	grid.offsetY = offsetY;
	grid.offsetX = offsetX;

  //Update offsets for every model
  for (let i = 0; i < models.length; i++)
    models[i].setOffsets(offsetX, offsetY);
}

/**
  Function that sets the new scale enterd by the user
  @author Rodrigo Dominguez
**/
function setScale(){
	scale = parseFloat(scaleInput.value());

	grid.scale = scale;

  //Update scale for every model
  for (let i = 0; i < models.length; i++)
    models[i].setScale(scale);
}

/**
  Function for interpreting the keys pressed by the user and taking action accordingly
  @author Rodrigo Dominguez
**/
function keyPressed(){
  if (keyCode == 80)
    currentModel.addPoint();
}

/**
  Function that creates a new model
  @author Rodrigo Dominguez
**/
function addModel(){
  models.push(new Model(0, nextPos, dimension, alfa, accuracy, false));
  nextPos += 200;
}

/**
  Function that selects to current model to be edited
  @author Rodrigo Dominguez
  @param {Model} model    new model to set selected
**/
function setCurrentModel(model){
  currentModel = model;
}