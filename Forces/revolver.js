var G = 0.4;

class Planet
{
    constructor(Mass, X, Y)
    {
        this.mass = Mass;
        this.position = createVector(X, Y);
        this.velocity = createVector(1, 0);
        this.acceleration = createVector(0, 0);
    }

    applyForce(force)
    {
        force.div(this.mass);
        this.acceleration.add(force);
    }

    attract(planet)
    {
        let force = p5.Vector.sub(this.position, planet.position);
        let d = p5.Vector.mag(force);

        d = constrain(d, 5.0, 25.0);                          

        force.normalize();                              
        let strength = (G * this.mass * planet.mass) / (d * d);
        force.mult(strength);
        return force;
    }

    render()
    {
        ellipse(this.position.x, this.position.y, 25, 25);
    }

    update()
    {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
}

class Sun
{
    constructor()
    {
        this.mass = 30;
        this.position = createVector(width/2, height/2);
    }


    render()
    {
        stroke(0);
        fill(175,200);
        ellipse(this.position.x, this.position.y, 75, 75);
    }
  
    attract(planet)
    {
        let force = p5.Vector.sub(this.position, planet.position);
        let d = p5.Vector.mag(force);
        d = constrain(d, 5.0, 25.0);                          
        
        force.normalize();                              
        let strength = (G * this.mass * planet.mass) / (d * d);
        force.mult(strength);
        return force;
    }
}


var p = new Array();
var s;
var force;

function setup()
{
    createCanvas(500, 500);
    
    for (i = 0; i < 5; i++)
    {
        p.push(new Planet(random(0.5, 1), random(width), random(height)));
    }

    s = new Sun();
}

function draw()
{
    background(255);

    // force = s.attract(p);
    // p.applyForce(force);
    // p.update();
    
    // s.render();
    // p.render();

    s.render();

    for (i = 0; i < p.length; i++)
    {
        for (j = 0; j < p.length; j++)
        {
            if (i != j)
            {
                var force = p[j].attract(p[i]);
                force.add(s.attract(p[i]));
                p[i].applyForce(force);
            }
        }

        p[i].update();
        p[i].render();
    }

}