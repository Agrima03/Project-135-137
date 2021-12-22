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
    status= document.getElementById("status").innerHTML= "Status: Object Detecting";
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
        for(i=0; i<object.length; i++){
            percent= floor(object[i].confidence*100);
            fill("#fff800");
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            stroke("#fff800");
            nofill();
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
    if(object.label == object_name){
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("status").innerHTML=object_name+"is found";
        function speak(){
            var synth = window.speechSynthesis;
        
            speak_data = object_name+" is found";
        
            var utterThis = new SpeechSynthesisUtterance(speak_data);
        
            synth.speak(utterThis);
        }
    }
    else{
        document.getElementById("status").innerHTML= object_name+" is not found";
    }
}