class Oscillator  {
	constructor(){
		this.angle = createVector(0, 0);
		this.velocity = createVector(random(-0.05, 0.1), random(-0.05, 0.1));
		this.amplitude = createVector(random(20, 100), random(20, 100));
		this.fill = 0;
		this.x = 1;
		this.y = 1;
	}
 
	oscillate()  {
		this.angle.add(this.velocity);
	}

	display(on)  {
		var xpos = sin(this.angle.x) * this.amplitude.x;
		var ypos = sin(this.angle.y) * this.amplitude.y;

		let color_string;

		if (on == true)
			color_string = 'black';
		else
			color_string = 'white';

		push();
		translate(this.x, this.y);

		// print(color_string);

		stroke(color_string);
		line(this.x, this.y, xpos, ypos);
		pop();
	}

	updatePosition(position)
	{
		if (position.x != -999 && position.y != -999)
		{
			this.x = position.x;
			this.y = position.y;
		}
	}

	updateColor()
	{

	}
}