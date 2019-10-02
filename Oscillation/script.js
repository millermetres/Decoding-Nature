var oscillators = new Array();
var mapPanel;
var position;
var drawOn;

function setup() {   
	createCanvas(windowWidth, windowHeight);
	mapPanel = new Map(windowWidth);
	drawOn = new DrawToggle();

	position = createVector(0, 0);

	smooth();
	noStroke();
	// Initialize all objects
	for (i = 0; i < 10; i++) {
		oscillators.push(new Oscillator());
	}
	background(255);  
}   

function draw() {     
  	//background(255);  
	mapPanel.render();
	drawOn.render();
	drawOn.getMousePos();
	position = mapPanel.getMousePos(position);

	for (i = 0; i < oscillators.length; i++) {
		oscillators[i].updatePosition(position);
		oscillators[i].oscillate();
		oscillators[i].display(drawOn.on);
	}
} 

