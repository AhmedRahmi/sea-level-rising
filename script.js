

function preload () {
	depthTex = loadImage('earth-depth-tex.jpg')
	buffer=depthTex;
}

rise = 0;
scl = 1;
xoff=0;
yoff=0;

function updateSeaLevel () {
	loadPixels();
	
	for(let i = 0; i < pixels.length; i += 4) {
		if(pixels[i] <= 1.5) {
			pixels[i+2] = 255;
		} else if(pixels[i] <= 1.5 + rise * 0.0288) {
			pixels[i] = 255;
		} else {
			pixels[i] *= 0.8;
			pixels[i+1] = 200;
			pixels[i+2] *= 0.8;


		}

		

	}
	updatePixels();
	
}

function setup() {
  	cnv =createCanvas(windowWidth, windowWidth/2);

	cnv.mouseOver(fmOver);
	cnv.mouseOut(fmOut)
	updateSeaLevel();
}

function draw() {
	background(255);

	
	scale(scl)
	translate(xoff, yoff);
	
	image(depthTex, 0, 0, width, height)

	
	updateSeaLevel()
}


document.querySelector('.slider').addEventListener('input', (e) => {
	rise = e.target.value
	document.getElementById('rise').innerHTML = rise + ' meters';

	updateSeaLevel()
})

function mouseWheel (e) {
	const lastTruePos = [mouseX/scl-xoff,mouseY/scl-yoff]

	scl-= e.delta;
	if(scl < 1) scl=1;
	else if(scl > 25) scl = 25;

	const truePos = [mouseX/scl-xoff, mouseY/scl-yoff]
	xoff = constrain(xoff, -(width-(width/scl)),0)
	yoff = constrain(yoff, -(height-(height/scl)),0)


}


let mOver = false;
function fmOver() {
	mOver= true;
	console.log('over')
}

function fmOut() {
	mOver=false;
	console.log('out')

}

function mouseDragged() {
	if(!mOver) return;

	xoff -= (pmouseX-mouseX)/scl;
	yoff -= (pmouseY-mouseY)/scl;
	xoff = constrain(xoff, -(width-(width/scl)),0)
	yoff = constrain(yoff, -(height-(height/scl)),0)
}


function windowResized() {
	resizeCanvas(windowWidth, windowWidth/2)
}
