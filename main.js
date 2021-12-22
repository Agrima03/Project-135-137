var status="";

function setup(){
    canvas= createCanvas(380,350);
    canvas.position(500,400);
    video= createCapture(VIDEO);
    video.hide();
}

function start(){
    object_detector= ml5.objectDetector('cocossd',modelLoaded);
    status= document.getElementById("status").innerHTML= "Status: Object Detecting";
    object_name= document.getElementById("ob_name").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status= true;
}

function draw(){
    image(video,0,0,380,380);
}