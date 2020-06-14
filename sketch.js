let sound;
var c;
var r;
var b;

let circles = [];

function onSoundLoadSuccess(e){
  console.log("load sound success",e);
}
function onSoundLoadError(e){
  console.log("load sound error",e);
}
function onSoundLoadProgress(e){
  console.log("load sound progress",e);
}

function preload(){
  soundFormats('mp3', 'ogg');
  sound = loadSound('assets/clairePoetry.mp3',onSoundLoadSuccess,onSoundLoadError,onSoundLoadProgress);
}

function setup(){
  let cnv = createCanvas(displayWidth, 600);
  cnv.mouseClicked(togglePlay);

  amp = new p5.Amplitude();
  sound.amp(0.2);
  background(255);

}

function draw(){
  let level = amp.getLevel();
  background(255, 10);
  circy = new circ(level);
  circy.display();

  text('tap to play', 20, 20);
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
    noLoop();
  } else {
    sound.loop();
    loop();
  }
}

// circ class
class circ {
  constructor(level) {
    this.width = width;
    this.height = height;
    this.h = map(level, 0, 0.02, 0, height);
    this.colorStage = map(this.h, 0, height, 0, 510);
    this.alpha = 255;

    if(this.colorStage < 255){
      this.r = this.colorStage;
      this.b = 255;
    }else{
      this.r = 255;
      this.b = 255 - (this.colorStage - this.r);
    }
    if(this.h < 35){
      this.h = 0;
    }
  }

  display() {
    fill(color(this.r, 0, this.b, this.alpha));
    noStroke();
    ellipse(this.width/2, this.height/2, -this.h);
  }
}
