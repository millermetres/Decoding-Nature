let walker;
let coords = []
let time = 0;

function setup() {
  createCanvas(320, 240);
  walker = new Walker();
  background(220);
}

function draw() {
  walker.step();
  walker.render();
}

class Walker {
    constructor() 
    {
      this.x = width / 2;
      this.y = height / 2;
      this.backtracking = false;
    }
  
    render() 
    {
      if (this.backtracking == true)
      {
          stroke(255, 0, 0);
      }
      else
      {
          coords.push(createVector(this.x, this.y));
          stroke(0);
      }
      
      point(this.x, this.y);
    }
  
    step()
    {
      let choice;
  
      let d = new Date()
      choice = d.getMilliseconds()
  
      if ((choice % 10 == 0 || choice % 10 == 9) && this.backtracking == false)
      {
          if (millis() - time > 5000)
          {
              this.backtracking = true;
              time = millis();
          }
      }
  
      if (coords.length == 0)
      {
          this.backtracking = false;
      }
  
      if (this.backtracking == true && coords.length != 0)
      {
          let coord = coords.pop();
        
          print(coord)
          this.x = coord.x;
          this.y = coord.y;
  
      }
      else
      {
          if (choice % 10 == 2 || choice % 10 == 5) 
          {
              this.x++;
          } else if (choice % 10 == 3 || choice % 10 == 7) {
              this.x--;
          } else if (choice % 10 == 1 || choice % 10 == 4) 
          {
              this.y++;
          } else {
              this.y--;
          }
      }
  
      this.x = constrain(this.x, 0, width - 1);
      this.y = constrain(this.y, 0, height - 1);
    }
  }