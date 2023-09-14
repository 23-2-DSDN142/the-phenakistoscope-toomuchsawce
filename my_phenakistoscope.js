const SLICE_COUNT = 16;

function setup_pScope(pScope){
  pScope.output_mode(OUTPUT_GIF(1000));
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.draw_slits(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
  
  pScope.load_image_sequence("run", "png", 6);
  pScope.load_image("sunny", "png");
  pScope.load_image_sequence("cloud", "png", 3);
}

function setup_layers(pScope) {
  //lets us draw the whole circle background, ignoring the boundaries

  new PLayer(null, 135, 206, 235); //fills light blue

  var CenterImage = new PLayer(sun); //sun
  CenterImage.mode(RING);
  CenterImage.set_boundary(0, 30);

  var outer = new PLayer(cloud); //clouds
  outer.mode(RING);
  outer.set_boundary(700, 1000);

  var layer1 = new PLayer(sparkles); //sparkles
  layer1.mode(SWIRL(2));
  layer1.set_boundary(70, 550);

  var layer2 = new PLayer(run); //running men
  layer2.set_boundary(0, 600);
  layer2.mode(RING);

}

function sparkles(x, y, animation, pScope) {
  translate(0, 0);
  scale(0.1);
  noStroke();
  drawStar(-20, -50 - animation.frame * 10, 150, 75);
  drawStar(30, 0, 150, 150);
}



function run(x, y, animation, pScope) {
  //running man
  translate(25, 0)
  scale(0.2)
  pScope.draw_image_from_sequence("run", -50, -3000 - 30 * animation.wave(), animation.frame);

}

function sun(x, y, animation, pScope) {
  //center spinning sun
  scale(0.80);
  translate(0, 0)

  angleMode(DEGREES)
  rotate(230)
  noStroke();
  fill(135, 206, 235);
  ellipse(0, 0, 1600, 5000);
  pScope.draw_image("sunny", x, y);

}

function cloud(x, y, animation, pScope) {
  //cloud
  scale(0.15)
  pScope.draw_image_from_sequence("cloud", 0, -5800, animation.frame);

}

function drawStar(x, y, xSize, ySize) {
  //draws star
  translate(x, y)
  noStroke();
  beginShape();
  curveVertex(x, y + ySize / 2);
  curveVertex(x - xSize / 5, y + ySize / 2.5);
  curveVertex(x, y + ySize / (10 / 3));
  curveVertex(x + xSize / 12.5, y);
  curveVertex(x + xSize / 6.25, y + ySize / (10 / 3));
  curveVertex(x + xSize / (50 / 18), y + ySize / 2.5);
  curveVertex(x + xSize / 6.25, y + ySize / 2);
  curveVertex(x + xSize / 12.5, y + ySize / (50 / 44));
  curveVertex(x, y + ySize / 2);
  curveVertex(x - xSize / 5, y + ySize / 2.5);
  curveVertex(x, y + ySize / (10 / 3));
  endShape();
}

