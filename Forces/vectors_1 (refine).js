let bouncer;
let clicked = false;


//bouncer class
class Bouncer
{
    //initialize with zero velocity and in the middle of the canvas
    constructor()
    {
        this.velocity = createVector(0, 0);
        this.position = createVector(width/2, height/2);
    }

    //draw simple circle
    render()
    {
        ellipse(this.position.x, this.position.y, 50, 50);
    }

    //updates the velocity every loop
    updateVelocity()
    {
        //just for testing
        print(this.velocity.x);
        print(this.velocity.y);

        if (clicked == true)
        {   //depending on the region in which the ball is clicked, increase velocity in specific direction
            if ((mouseX > this.position.x && mouseX < this.position.x + 50) && (mouseY < this.position.y && mouseY > this.position.y - 50))
            {
                this.velocity.add(-2.5, 2.5);
                print("down left");
            }
            else if((mouseX > this.position.x - 50 && mouseX < this.position.x) && (mouseY < this.position.y && mouseY > this.position.y - 50))
            {
                this.velocity.add(2.5, 2.5);
                print("down right");
            }
            else if ((mouseX > this.position.x - 50 && mouseX < this.position.x) && (mouseY > this.position.y && mouseY < this.position.y + 50))
            {
                this.velocity.add(2.5, -2.5);
                print("up right");
            }
            else if ((mouseX > this.position.x && mouseX < this.position.x + 50) && (mouseY > this.position.y && mouseY < this.position.y + 50))
            {
                this.velocity.add(-2.5, -2.5);
                print("up left");
            } //if clicked in middle, stop
            else if (mouseX == this.position.x && mouseX == this.position.y)
            {
                this.velocity.x = 0;
                this.velocity.y = 0;
                print("stop");
            }
        }

        //account for "friction" in the air
        this.velocity.mult(0.99);
    }

    //check if ball has gone out of bounds, if so just redirect
    checkWalls()
    {
        if (this.position.x + 50 >= width || this.position.x - 50 <= 0)
        {
            this.velocity.x *= -1;
        }

        if (this.position.y + 50 >= height || this.position.y - 50 <= 0)
        {
            this.velocity.y *= -1;
        }
    }

    //update position of ball
    updatePosition()
    {
        this.position.add(this.velocity);
    }
}


function mousePressed()
{
    clicked = true;
    return false;
}

function mouseReleased()
{
    clicked = false;
    return false;
}


function setup()
{
    createCanvas(500, 500);
    bouncer = new Bouncer();
}


function draw()
{
    background(255);
    bouncer.render();
    bouncer.updateVelocity();
    bouncer.updatePosition();
    bouncer.checkWalls();
}