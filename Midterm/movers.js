var COLLISION_TYPES = ["elastic", "inelastic"]
var TENDENCIES = ["continue", "uturn", "flipx", "flipy"]

class Movers
{
    constructor()
    {
        this.radius = 4;
        this.alive = true;
        this.position = createVector(random(0, width), random(0, height)); //position
        this.velocity = createVector(random([-1, 1]), (random(-1, 1))); //speed
        this.c = [floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255))]; //color of particle
        this.collision_type = COLLISION_TYPES[floor(random(0, 2))]; //0 elastic, 1 inelastic
        this.time_to_live = floor(random(5000, 8000));
        this.birth_time = millis();
        this.direction_timer = 0;
        this.collided = false;
        this.death_anim_frame = 0;
        
        //fill tendencies
        this.tendencies = new Array();


        //each has a tendency to go in certain directions
        let inserter = random(0, 1);
        this.tendencies.push(inserter);
        let cumulative = 0;

        cumulative += inserter;

        //this loop condition should never happen because of the right side exclusivity of random(),
        //just being safe

        while (cumulative < 1)
        {
            inserter = random(0, 1 - cumulative);
            this.tendencies.push(inserter);
            cumulative += inserter;

            if (this.tendencies.length == 3)
                break;
        }

        //push last sum, 1 - cumulative so entire array adds up to 1.0
        if (this.tendencies.length == 3)
            this.tendencies.push(1 - cumulative);

        //if length is less than 3, fill the rest of the array with zeros, again, just being safe
        if (this.tendencies.length < 3)
        {
            while (this.tendencies.length < 4)
                this.tendencies.push(0);
        }
    }

    //bounce off edges
    checkEdges()
    {
        if (this.position.x > width) 
        {
            this.position.x = width;
            this.velocity.x *= -1;
        } 
        else if (this.position.x < 0) 
        {
            this.velocity.x *= -1;
            this.position.x = 0;
        }
        
        if (this.position.y > height) 
        {
            this.velocity.y *= -1;
            this.position.y = height;
        }
        else if (this.position.y < 0)
        {
            this.position.y = 0;
            this.velocity.y *= -1;
        }
    }

    update()
    {

        //randomize direction
        let direction = getDirection(TENDENCIES, this.tendencies);

        //slow down, mark as dead
        if (millis() - this.birth_time >= this.time_to_live)
        {
            this.alive = false;
            this.velocity.x = 0.1;
            this.velocity.y = 0.1;
            
            return;
        }

        //switch direction after random period of time
        if (millis() - this.direction_timer > random([1000, 1500, 2000, 2500, 3000]))
        {
            if (direction == "continue")
            {
                console.log();
            }
            else if (direction == "uturn")
            {
                this.velocity.x = -this.velocity.x;
                this.velocity.y = -this.velocity.y;
            }
            else if (direction == "flipx")
                this.velocity.x = -this.velocity.x;
            else
                this.velocity.y = -this.velocity.y;

            this.direction_timer = millis();
        }

        //update position
        this.position.add(this.velocity);
    }

    //check collisions
    collide(other)
    {
        if (this.alive == false || other.alive == false || this.collided == true || other.collided == true)
            return;

        var dx = other.position.x - this.position.x;
        var dy = other.position.y - this.position.y;

        //distance between positions
        let d = sqrt((dx * dx) + (dy * dy));

        if (d < (this.radius * 1.5)) //colliding
        {
            if (this.collision_type == "elastic")
            {
                if (other.collision_type == "elastic")
                {
                    this.velocity.x = -this.velocity.x * 0.75;
                    this.velocity.y = -this.velocity.y * 0.75;

                    other.velocity.x = -other.velocity.x * 0.75;
                    other.velocity.y = -other.velocity.y * 0.75;

                    //subtract/multiply color
                    let c = subtractColorValues(this.c, other.c);

                    this.c = c;
                    other.c = c;
                }
                else
                {
                    this.collided = true; //merge balls into two

                    other.velocity.x += (this.velocity.x * 0.9);
                    other.velocity.y += (this.velocity.x * 0.9);

                    //add colors
                    let c = blendColorValues(this.c, other.c);

                    print (c);

                    this.c = c;
                    other.radius = (other.radius + this.radius) * 0.75; //add radius
                    other.c = c;
                }
            }
            else
            {
                this.collided = true

                other.velocity.x += (this.velocity.x * 0.9);
                other.velocity.y += (this.velocity.y * 0.9);

                let c = blendColorValues(this.c, other.c);

                this.c = c;
                other.radius = (other.radius + this.radius) * 0.75; //add radius
                other.c = c;
            }
        }
    }

    //reap then render
    render()
    {
        if (this.alive)
        {
            fill(this.c[0], this.c[1], this.c[2]);
            ellipse(this.position.x, this.position.y, this.radius, this.radius);
        }
        else
        {
            fill(this.c[0], this.c[1], this.c[2]);
            //stroke(this.c[0], this.c[1], this.c[2]);

            text('KO', this.position.x, this.position.y);

            this.death_anim_frame += 1;
        }
    }
}


//custom random function, account for weights
function getDirection(list, weight) {
    var total_weight = 1;
     
    var num = random(0, total_weight);
    var weight_sum = 0;
    //console.log(random_num)
     
    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];         
        if (num <= weight_sum) {
            return list[i];
        }
    }
}


//mix the two colors
function blendColorValues(a, b)
{
    c = new Array(((a[0] + b[0])/4) % 240, ((a[1] + b[1])/4) % 240, ((a[2]+b[2])/4) % 240);
    return c;
}

//subtract the two colors
function subtractColorValues(a, b)
{
    c = new Array(abs((a[0] - b[0])/4) % 240, abs((a[1] - b[1])/4) % 240, abs((a[2] - b[2])/4) % 2);
    return c;
}

