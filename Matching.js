let rectangle, rectangle1, rectangle2
let tri, tri1, tri2

function setup() {
  createCanvas(800, 600);

  rectangle = new DraggableRect(30, 320, 100, 250)
  rectangle1 = new DraggableRect(500, 500, 50, 80)
  rectangle2 = new DraggableRect(430, 400, 300, 60)

  tri = new DraggableTriangle(170, 450, 100)
  tri1 = new DraggableTriangle(300, 500, 140)
  tri2 = new DraggableTriangle(700, 580, 70)


}

function draw() {
  background(0);

  fill(50, 50, 50)
  rect(30, 30, 100, 250)
  rect(150, 100, 300, 60)
  rect(250, 200, 50, 80)
  triangle(600, 200, 670, 60, 740, 200)
  triangle(350, 250, 385, 180, 420, 250)
  triangle(450, 280, 500, 180, 550, 280)

  rectangle.display()
  rectangle1.display()
  rectangle2.display()

  tri.display()
  tri1.display()
  tri2.display()

  stroke(255)
  strokeWeight(4)
  line(0, 300, 800, 300)

  textSize(28)
  strokeWeight(1)
  text("Drag each shape into ", 175, 50)
  strokeWeight(4)

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
    if (this.y + this.height < 300)
      stroke("green")
    else
      stroke("red")

  }

  display() {
    this.drag();

    fill(0, 100, 200)
    rect(this.x, this.y, this.width, this.height);

    fill(0, 100, 200)
    circle(this.centerX, this.centerY, this.getMinimal());
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
    if (this.y < 300)
      stroke("green")
    else
      stroke("red")
  }

  display() {
    this.drag();

    fill(100, 200, 0)
    triangle(this.x, this.y, this.x + this.length / 2, this.y - this.length,
      this.x + this.length, this.y);

    fill(100, 200, 0)
    circle(this.centroidX, this.centroidY, this.length / 2);
  }
}