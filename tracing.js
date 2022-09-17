let x = 200;
let y = 0;
let inc = 0.003;
let start = 0;
let score = 0;
let verticesY = [];
let lineCanvas;
let shouldDraw = false;
let finishedTracing = false;
let lastMouseX = 0;

function setup() {
  createCanvas(800, 600);
  lineCanvas = createGraphics(800, 600);
  lineCanvas.clear();
}

function draw() {
  background(51);
  drawLine(); //draw the line

  getShouldDraw();

  displayFeedback(); //give the user instructions/feedback

  //true while the user is tracing
  if (shouldDraw) {
    //check if the mouse is within the bounds of the line
    if (mouseY > verticesY[mouseX - 200] - 13 &&
      mouseY < verticesY[mouseX - 200] + 13) {

      lineCanvas.stroke("green"); //tracing is green within the bounds

    } else {

      lineCanvas.stroke("red"); //tracing is red when outside the bounds

    }

    lineCanvas.strokeWeight(5); //tracing thickness

    if (mouseX > lastMouseX) { //prevent the user from tracing backwards
      lineCanvas.line(mouseX, mouseY, pmouseX, pmouseY); //draw the user tracing
      lastMouseX = mouseX;
    }
  }

  image(lineCanvas, 0, 0);
}

//draws a line
function drawLine() {
  noFill();
  beginShape();

  let xOff = start;
  for (x = 200; x < 200 + width / 2; x++) {
    stroke(255); //line color
    strokeWeight(20); //line thickness
    y = 200 + noise(xOff) * height / 2;
    vertex(x, y);
    xOff += inc;

    verticesY[x - 200] = y; //store points on line
  }

  endShape();
}

function getShouldDraw() {

  if (mouseX > 195 && mouseX < 205 && mouseY > verticesY[mouseX - 200] - 5 &&
    mouseY < verticesY[mouseX - 200] + 5 && !finishedTracing) {

    shouldDraw = true;
    finishedTracing = false;
  }


  if (mouseX > 595 && shouldDraw) {
    shouldDraw = false;
    finishedTracing = true;
  }

}

function displayFeedback() {
  if (finishedTracing) {
    //display feedback when the user is done tracing
    textSize(28);
    fill(255);
    strokeWeight(1);
    stroke(255);
    text("Finished", 100, 100);

    // fill(100);
    // strokeWeight(4);
    // rect(550, 50, 180, 80);

    // fill(255);
    // strokeWeight(1);
    // text("Next →", 600, 100);



  } else {
    //the user is not done tracing yet
    if (!shouldDraw) {
      //display a message for the user to start tracing
      textSize(28);
      fill(255);
      strokeWeight(1);
      stroke(255);
      text("Move your cursor to the beginning", 100, 100);
      textSize(36);
      text("→", 150, verticesY[0] + 15);
    }
  }

}

function mouseClicked() {
  if (mouseX > 550 && mouseX < 730 && mouseY > 50 && mouseY < 130) {
    if (finishedTracing) {
      lineCanvas.clear();
      verticesY = [];
      shouldDraw = false;
      finishedTracing = false;
    }
  }
}