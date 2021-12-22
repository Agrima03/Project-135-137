var status="";
object=[];
var object_name="";

function setup(){
    canvas= createCanvas(380,350);
    canvas.position(500,400);
    video= createCapture(VIDEO);
    video.hide();
}

function start(){
    object_detector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML= "Status: Object Detecting";
    object_name= document.getElementById("ob_name").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status= true;
}

function gotResults(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        object=result;
    }
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        object_detector.detect(video,gotResults);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detcted";
            fill("#fff800");
            percent= floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            stroke("#fff800");
            noFill();
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        
    if(object[i].label == object_name){
        video.stop();
        object_detector.detect(gotResults);
        document.getElementById("object_found").innerHTML=object_name+" is found";
            var synth = window.speechSynthesis;                
            var utterThis = new SpeechSynthesisUtterance(object_name+"is found");        
            synth.speak(utterThis);
    }
    else{
        document.getElementById("object_found").innerHTML= object_name+" is not found";
    }
}
}
}