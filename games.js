
gamePattern = [];               //empty Array
userClickedPattern = [];        //empty Array
buttonColors = ["red","blue","green","yellow"];
var level = 0;
var started = false;

$(".start-btn").click(function(){

   if(!started){
     nextSequence();
     started = true;
   }
});

$(".btn").click( function(event){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  playAnimation(userChosenColour);

  var len = userClickedPattern.length;

  checker(len-1);
} );


function checker(currentLevel){

   if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){

        if(userClickedPattern.length===gamePattern.length){
             setTimeout(function(){
                nextSequence();
             },1000);
        }
   }else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html("Game Over, Press bullseye to Restart");

        setTimeout(function(){
          $("body").removeClass("game-over");
        },200);

        startOver();
   }
}

function nextSequence(){

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function playAnimation(color){

  $("#"+color).addClass("pressed");
  setTimeout( function(){
    $("#"+color).removeClass("pressed");
  },100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
