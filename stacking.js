let rectangle, rectangle1, rectangle2
let tri, tri1, tri2

function setup() {
  createCanvas(800, 600);

  rectangle = new DraggableRect(600, 400, 50, 175)
  rectangle1 = new DraggableRect(250, 400, 50, 175)
  rectangle2 = new DraggableRect(30, 500, 175, 40)

  tri = new DraggableTriangle(400, 550, 175) 
 
}

function draw() {
  background(0);

  rectangle.display()
  rectangle1.display()
  rectangle2.display()

  tri.display()
  
  strokeWeight(3)
  
  fill(0)
  stroke(255)
  rect(0,0,175,225)
  stroke(0)
  fill(0,200,300)
  triangle(50, 100, 87.5, 40, 125, 100);
  
  fill(300,100,200)
  rect(50,100,75,20)
  rect(50,120,25,75)
  rect(100,120,25,75)
 
if(rectangle.xCoords() > rectangle2.xCoords() + 120 && rectangle.xCoords() < rectangle2.xCoords() + 130 && rectangle.yCoords() > rectangle2.yCoords() + 40 && rectangle.yCoords() < rectangle2.yCoords() + 50 && rectangle1.xCoords() > rectangle2.xCoords() - 5 && rectangle1.xCoords() < rectangle2.xCoords() + 5 && rectangle1.yCoords() > rectangle2.yCoords() + 40 && rectangle1.yCoords() < rectangle2.yCoords() + 50 && tri.xCoords() < rectangle2.xCoords() + 5 && tri.xCoords() > rectangle2.xCoords() - 5 && tri.yCoords() < rectangle2.yCoords() + 5 && tri.yCoords() > rectangle2.yCoords() - 8){
  stroke('green')
} 
else{
  stroke('black')
}
}

class DraggableRect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
  }

  getMinimal() {
    if (this.height < this.width) return this.height;
    else return this.width;
  }

  drag() {
    if (dist(this.centerX, this.centerY, mouseX, mouseY) < this.getMinimal() / 2 && mouseIsPressed) {
      this.x = mouseX - this.width / 2;
      this.y = mouseY - this.height / 2;
      this.centerX = this.x + this.width / 2;
      this.centerY = this.y + this.height / 2;
    }
  }

  display() {
    this.drag();

    fill(300, 100, 200)
    rect(this.x, this.y, this.width, this.height);

    fill(50, 10, 200)
    circle(this.centerX, this.centerY, this.getMinimal());
  }
  
  xCoords(){
    return this.x
  }
  yCoords(){
    return this.y
  }
}



class DraggableTriangle {
  constructor(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.centroidX = this.x + length / 2;
    this.centroidY = this.y - length / 3;
  }

  drag() {
    if (dist(this.centroidX, this.centroidY, mouseX, mouseY) < this.length / 2 && mouseIsPressed) {
      this.x = mouseX - this.length / 2;
      this.y = mouseY + this.length / 3;
      this.centroidX = this.x + this.length / 2;
      this.centroidY = this.y - this.length / 3;
    }
  }

  display() {
    this.drag();

    fill(0,200,300)
    triangle(this.x, this.y, this.x + this.length / 2, this.y - this.length,
      this.x + this.length, this.y);

    fill(50, 10, 200)
    circle(this.centroidX, this.centroidY, this.length / 2);
  }
  
  xCoords(){
    return this.x
  }
  yCoords(){
    return this.y
  }
}