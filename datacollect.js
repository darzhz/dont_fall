let img;
let poses = [];
let poseNet;
let pose;
let structure;
let imageState = 'loading';
let targetLabel = ['standing']
let i;
function setup(){
createCanvas(windowWidth,windowHeight);
background(155);
i=0;
let data = setInterval(()=>{
  loadimg(`${i}.jpg`);
  console.log(i);
  i++
  if(i>2){
    clearInterval(data);
  }
},7000)
}
function drawer(){
  background(0);
  translate(0,0);
  image(img, 0, 0);
  if(poses.length >0){
     pose = poses[0].pose;
     console.log(pose.nose)
    structure = poses[0].skeleton;
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(255, 0, 0);
      ellipse(x, y, 16, 16);
    }
    imageState = 'loading';
  }
  //noLoop();
}
async function loadimg(filename){
  img = await createImg(`${filename}`,imageReady);
  img.size(width,height);
  console.log("resolution = "+img.width+"x"+img.height);
  img.hide();
}
async function imageReady(){
  const options = {
    minConfidence: 0.1,
    inputResolution: { width, height },
  };
  console.log('image has been loaded');
  poseNet = new ml5.poseNet(getPose,options);
 await poseNet.on("pose",(results)=>{
    poses = results;
    pose = poses[0].pose;
    imageState = 'ready';
    drawer();
  });
}
async function getPose(){
  await poseNet.singlePose(img);
}