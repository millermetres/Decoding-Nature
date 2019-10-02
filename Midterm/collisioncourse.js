var movers = new Array();
var spawn = 500;


function setup() {
    smooth();
	noStroke();
    createCanvas(windowWidth, windowHeight);
    textSize(8);
    
    for (i = 0; i < spawn; i++)
    {
        movers.push(new Movers);
        //console.log(movers[i]);
    }
}


function draw() 
{
    background(255);

    for (i = 0; i < spawn; i++) 
    {
        movers[i].update();
        for (j = 0; j < spawn; j++)
		{
            if (i != j)
                movers[i].collide(movers[j]);
        }

        //if colliding, do not render
        if (this.collided)
        {
            continue;
        }

        movers[i].checkEdges();
        movers[i].render();
    }
    
    //reap dead particiles and replace with new particles
    for (i = 0; i < spawn; i++)
    {
        if ((!movers[i].alive && movers[i].death_anim_frame >= 50) || movers[i].collided)
        {
            movers.splice(i, 1);
            movers.push(new Movers);
        }
    }
}
