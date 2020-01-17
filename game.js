var buttonColors=["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern = []

var gameStart =false
var level = 0;

$(document).keypress(function (e) { 
    if (!gameStart){
        $("h1").text("Level "+level)
        nextSequences()
        gameStart=true
    }
});

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length-1)    
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequences()
            },1000)
        }
        
    } else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver(){
    gamePattern =[];
    userClickedPattern = []

    gameStart =false
    level = 0;
}

function playSound(name){
    var audioPlayed=new Audio("sounds/"+name+".mp3")
    audioPlayed.play()
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}


function nextSequences(){
    userClickedPattern=[];
    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber)

    var randomChosenColour= buttonColors[randomNumber]

    gamePattern.push(randomChosenColour)

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    level = level+1
    $("#level-title").text("Level " + level);
}



