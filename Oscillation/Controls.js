var map_clicked = false;
var button_clicked = false;


class Map
{
    constructor(width)
    {
      this.x = width - 100;
      this.y = 100;
    }

    render()
    {
      fill(138, 132, 132);
      rect(this.x, this.y, 80, 80);
    }

    getMousePos(position)
    {
      var mouse_x = mouseX;
      var mouse_y = mouseY;

      if (map_clicked == true && mouseX > this.x && mouseY > this.y)
      {  
        mouse_x = map(mouse_x, this.x, this.x + 80, 0, width - 200);
        mouse_y = map(mouse_y, this.y, this.y + 80, 0, height);
      }
      else
      {
        mouse_x = -999;
        mouse_y = -999;
      }

      var position = createVector(mouse_x, mouse_y);

      // print(position.x);
      // print(position.y);

      return position;
    }
}

class DrawToggle
{
	constructor()
	{
		this.x = width - 60;
      	this.y = 225;
		this.on = true;

	}

	render()
	{
		if (this.on == true)
		{
			fill('green');
		}
		else
		{
			fill('red');
		}

		ellipse(this.x, this.y, 25, 25);
	}

	getMousePos(position)
    {
      var mouse_x = mouseX;
      var mouse_y = mouseY;

      if (button_clicked == true)
      {  
        this.on = !(this.on);
		button_clicked = false;
      }
	}
}

function mousePressed()
{
    if (((mouseX > width - 100) && (mouseY < width)) && ((mouseY > 100) && mouseY < 180))
	{
		map_clicked = true;
	}
}

function mouseReleased()
{
    map_clicked = false;
    return false;
}

function keyPressed()
{
	if (key == ' ')
	{
		button_clicked = true;
	}

	return false;
}