var x;
var r = 0;
var g = 0;
var b = 0;

function setup() {
  createCanvas(400, 400);
  x = millis();
}

function draw() {
  background(220);
  fill(r, g, b);
  ellipse(width/2, height/2, 50, 50);
  
  if (millis() - x > 500) //every half a second
  {
    x = millis();
    r = (r + 15) % 255; //add 15 to each color value, wrap around at 255
    g = (g + 15) % 255;
    b = (b + 15) % 255;
  }
}