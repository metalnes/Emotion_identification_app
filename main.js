Webcam.set({
    width:350,
    height:300,
    image_Format:"png",
    png_quality:90

})
camera=document.getElementById("camera")
Webcam.attach("#camera")

prediction_1=""
prediction_2=""
 
function take_snapshot(){
    Webcam.snap(function(data_uri){
        console.log(data_uri)
        document.getElementById("result").innerHTML="<img src='"+data_uri+"' id='captured_image'>"
    })
}

console.log('ml5_version:', ml5.version)

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NLAExNPYd/model.json", modelLoaded)
function modelLoaded(){
    console.log("Model is Loaded!")
}
function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img,gotResult)
}
function gotResult(error,results){
if (error){console.error(error)}
else {
    console.log(results)
    prediction_1=results[0].label
    prediction_2=results[1].label
    document.getElementById("emotion_name_1").innerHTML=prediction_1
    document.getElementById("emotion_name_2").innerHTML=prediction_2
    
    speak()
    
    if(prediction_1=="happy"){
        document.getElementById("update_emoji_1").innerHTML="&#128522;"
    }
    else if (prediction_1=="sad"){
        document.getElementById("update_emoji_1").innerHTML="&#128532;"
    }
    else if (prediction_1=="angry"){
        document.getElementById("update_emoji_1").innerHTML="&#128548;"
    }
    if(prediction_2=="happy"){
        document.getElementById("update_emoji_2").innerHTML="&#128522;"
    }
    else if (prediction_2=="sad"){
        document.getElementById("update_emoji_2").innerHTML="&#128532;"
    }
    else if (prediction_2=="angry"){
        document.getElementById("update_emoji_2").innerHTML="&#128548;"
    }
}
}
function speak(){
    var synth = window.speechSynthesis
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="And the second prediction is"+prediction_2;
    var utterthis= new SpeechSynthesisUtterance(speak_data_1+speak_data_2)
    synth.speak(utterthis)

}


