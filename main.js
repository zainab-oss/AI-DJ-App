song = "";

function preload()
{
	song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	scoreRightWrist = results[0].pose.keypoints[10].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");
	circle(rightWristX, rightWristY,20);

	if (scoreRightWrist > 0.2)
	{
	if(rightWristY >0 && rightWristY <= 100)
	{
		song.rate(0.5);
		document.getElementById("speed").innerHTML = "Speed rate is 0.5x";
	}

	if (rightWristY > 100 && rightWristY <= 200)
	{
		song.rate(1);
		document.getElementById("speed").innerHTML = "Speed rate is 1x";
	}

	if (rightWristY > 200 && rightWristY <= 300)
	{
		song.rate(1.5);
		document.getElementById("speed").innerHTML = "speed rate is 1.5x";
	}

	if (rightWristY > 300 && rightWristY <= 400)
	{
		song.rate(2);
		document.getElementById("speed").innerHTML = "Speed rate is 2x";
	}

	if (rightWristY > 400 && rightWristY <= 500)
	{
		song.rate(2.5);
		document.getElementById("speed").innerHTML = "speed rate is 2.5x"
	}
}


	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY);
		new_leftWristY = floor(InNumberleftWristY *2);
		leftWristY_divide_1000 = new_leftWristY/1000;
		document.getElementById("vol").innerHTML = "Volume = " + leftWristY_divide_1000;		
		song.setVolume(leftWristY_divide_1000);	
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
