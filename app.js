/* goals and what doesnt work
 *get pose detection up and running✓
 *adjust aspect ratio and make the vidinp one to one×
 *make a machine learning model for fall detection ×
 *start classifying ×
 #+about+
*/

let vidinp;
let poseNet;
let pose;
let structure;
let offset=0;
let yoffset=0;
let Neuralnet;
function setup(){
  createCanvas(windowWidth,windowHeight);
  background(155);
  vidinp = createCapture(VIDEO);
  vidinp.hide()
  poseNet = new ml5.poseNet(vidinp,modelLoaded);
  poseNet.on('pose',receivePose)
 let opt = {
    input:34,
    output:2,
    task:'classification',
    debug:true
  }
  //neuralNet = new ml5.nueralNetwork(opt);
  yoffset = 0;
  xoffset = 0;
}
function mouseClicked(){
  scale(1,-1);
  translate(0,width)
  calcOffset(mouseX,mouseY);
}
function calcOffset(x,y){
  offset = dist(x,y,pose.nose.x,pose.nose.y)
}
function receivePose(poses){
if(poses.length>0){
  pose = poses[0].pose;
  structure = poses[0].skeleton;
  //console.log(pose.keypoints.length);
}
}
function modelLoaded(){
  console.log("poseNet is online")
}
function draw(){
  //background(0);
  translate(width,0);
  scale(-1,1);
  
  //image(vidinp, 0, 0, width, width * vidinp.height / vidinp.width);
  image(vidinp,0,0)
  if(pose){
    fill(175,176,0);
  ellipse(pose.nose.x-xoffset,pose.nose.y-yoffset,10,10);
  for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(255, 0, 0);
      ellipse(x, y, 16, 16);
    }
  }
}