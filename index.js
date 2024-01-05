// $("h1")
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var level=0;
var start=false;
// random sequence
$(document).keypress(function () {
    if(!start){
        $("h1").text("Level "+level);
        // alert("key pressed");
        nextSeq();
        start=true;
    }
});

//user clicked buttons
$(".btn").click(function (){
   var userColor=$(this).attr("id"); 
   userPattern.push(userColor); 
   playSound(userColor);
   animatePress(userColor);
   checkAnswer(userPattern.length-1);
});

function checkAnswer(level) {
    if(gamePattern[level]===userPattern[level]){
        console.log("success");
        if(gamePattern.length===userPattern.length){
            setTimeout(() => {
                nextSeq();
            }, 1000);   
        }
    }
    else{
        console.log("error");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSeq() {
    userPattern=[];
    level++;
    $("h1").text("Level "+level);
    var num=Math.floor(Math.random()*4);
    var randColor= buttonColors[num];
    gamePattern.push(randColor);
    $("#"+randColor).removeClass(randColor);
    setTimeout(function () {
        $("#"+randColor).addClass(randColor);
    },50);
    playSound(randColor);
}


function playSound(name) {
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function startOver() {
    gamePattern=[];
    start=false;
    level=0;
}