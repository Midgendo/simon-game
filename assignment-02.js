var signal;
var playerTurn;
var gameSpeed;
var signalSpeed;
var computer;
var failTimer;
var level;
var highScore = 0;
var sequence = [];
var pSequence = [];
var ready = true;


function begin(){
  if(!ready) return; //Prevents the user from restarting while the fail animation is active
  clearInterval(computer);
  sequence = [];
  pSequence = [];
  signal = 0;
  gameSpeed = 1000;
  signalSpeed = 200;
  level = 1;
   
  $("#status").css('background-color','lightgreen');
  playerTurn = false;
  for (var i = 0; i < 99; i++) {
    sequence.push(Math.floor(Math.random() * 4));
  }

  //console.log(sequence);
  
  setTimeout(() => {
    $("#level").text("01");
    //Runs each signal
    computer = setInterval(gameTurn, gameSpeed);
    }, 3000);
}

function gameTurn(){
  if(signal == level){
    clearInterval(computer);
    failTimer = setTimeout(fail, 5000);
    //Allows the player to input a sequence
    playerTurn = true;
    reset();
  }

  if(!playerTurn){
    reset();
    setTimeout(() => {
      switch(sequence[signal]){
        case 0: $("#green").css('background-color','lightgreen'); break;
        case 1: $("#red").css('background-color','lightcoral'); break;
        case 2: $("#yellow").css('background-color','lightyellow'); break;
        case 3: $("#blue").css('background-color','lightblue');
      }
      signal++;
    }, signalSpeed);
  }
}

function flashAll(){
  $("#green").css('background-color','lightgreen');
  $("#red").css('background-color','lightcoral');
  $("#yellow").css('background-color','lightyellow');
  $("#blue").css('background-color','lightblue');
}

function reset(){
  $("#green").css('background-color','green');
  $("#red").css('background-color','red');
  $("#yellow").css('background-color','yellow');
  $("#blue").css('background-color','blue');
}

function green(){
  if(playerTurn){
    pSequence.push(0);
    checkInput();
  }
}
function red(){
  if(playerTurn){
    pSequence.push(1);
    checkInput();
  }
}
function yellow(){
  if(playerTurn){
    pSequence.push(2);
    checkInput();
  }
}
function blue(){
  if(playerTurn){
    pSequence.push(3);
    checkInput();
  }
}

function checkInput(){
  clearTimeout(failTimer);
  failTimer = setTimeout(fail, 5000);
  //pSequence.length-1 == thing just inputted
  if(pSequence[pSequence.length - 1] != sequence[pSequence.length - 1]){
    fail();
  }else if(level == pSequence.length){
    clearTimeout(failTimer);
    level++;
    pSequence = [];
    playerTurn = false;
    signal = 0;
    $("#level").text(String(level).padStart(2, '0'));
    if(level > highScore + 1){
      highScore = level - 1;
      $("#highScore").text(String(highScore).padStart(2, '0'));
    }
    switch(level){
      case 5: signalSpeed -= 40; gameSpeed -= 200; break;
      case 9: signalSpeed -= 40; gameSpeed -= 200; break;
      case 13: signalSpeed -= 40; gameSpeed -= 200; break;
      case 99: signalSpeed = Math.pow(signalSpeed, 10); gameSpeed = signalSpeed * 5; break;
      case 100: fail(); return;
    }
    computer = setInterval(gameTurn, gameSpeed);
  }
}

function fail(){
  clearTimeout(failTimer);
  clearInterval(computer);
  ready = false;
  playerTurn = false;
  //Could've rewritten this function to run repeatedly over an interval but this works just as well :)
  flashAll();
  setTimeout(() => {
    reset();
    setTimeout(() => {
      flashAll();
      setTimeout(() => {
        reset();
        setTimeout(() => {
          flashAll();
          setTimeout(() => {
            reset();
            setTimeout(() => {
              flashAll();
              setTimeout(() => {
                reset();
                setTimeout(() => {
                  flashAll();
                  setTimeout(() => {
                    reset();
                    ready = true;
                    $("#status").css('background-color','red');
                    $("#level").text("00");
                  }, 300);
                }, 300);
              }, 300);
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }, 300);
  }, 300);
}