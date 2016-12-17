var game = (function() {
  var user = [];   /**put players into user list **/
  var exist;
  var xUser = {
    name: '',
    gameResults: []
  };
  var oUser = {
    name: '',
    gameResults: []
  };
  var name1;
  var name2;
  var move = 0;
  var player = getFirstPlayer();    /**randomly pick a player when first play**/

  var startEnd = {
    start: "<div class='screen screen-start' id='start'>" +
         "<header><h1>Welcome! want to play Tic Tac Toe?</h1>" +
         "<button type ='button' class='button' id='playBt'>Play Game</button><br>" +
         "</header></div>",
  };// Append the Welcome screens to the body, then hide them
  $('body').append(startEnd.start);
  $('#start').show();   /**Welcome screens show when open the index file**/

  function initGame() {
      generateGameBoard();
      nextRound(player);
      $(".square").on("click",selectSquare)
  }

  function getUserInfo(){
      while(xUser.name === ''){
         name1 = prompt("Please enter X's player name", "");
         exist = checkUser(name1);
         if(!exist){
            user.push(name1);    /**If the user is not exists, add this user to user list,and assgin his name to object**/
            xUser.name = name1;
         }
      }
      while(oUser.name === ''){
         name2 = prompt("Please enter O'S player name", "");
         exist = checkUser(name2);
         if(!exist){
          user.push(name2);
          oUser.name = name2;
         }
     }
 }

 function checkUser(u){
    exist = false;   /**flag to check if a player already exists**/
    for(var i = 0; i<user.length; i++){
       if(u === user[i]){
          alert("You already exist in this game");
          exist = true;
       }
    }
    return exist;
 }

  function generateGameBoard() {
       $('#start').hide();         /**hide the Welcome screen, then display game board**/
   }

   function getFirstPlayer(){       /**randomly pick a player when first play**/
      var rand = Math.floor((Math.random() * 2) + 1);
      return rand;
   }

   function nextRound (player) {
      if(player == 1){
         $("#player1name").html(name1);     /**add player name to the above player list**/
         $("#symbol1").addClass("fa fa-times");   /**add symbol**/
         $("#player2name").html(name2);
         $("#symbol2").addClass("fa fa-circle-o");
         playerOne = xUser.name
         playerTwo = oUser.name
      }
      else {
         $("#player1name").html(name2);
         $("#symbol1").addClass("fa fa-circle-o");
         $("#player2name").html(name1);
         $("#symbol2").addClass("fa fa-times");
         playerOne = oUser.name
         playerTwo = xUser.name
     }
  }

   function selectSquare() {
        var selected = $(this);

        if(selected.hasClass('fa fa-times')||selected.hasClass('fa fa-circle-o')){
           alert("This square has been selected, please select another.")
        }

        else{
              if(playerOne == xUser.name){
                 $("#player1").addClass("pink");      /**make the above symbol list pink if select a quare **/
                 selected.addClass("fa fa-times");    /**add symble to the square**/
                 move++;                              /**after select a square, increase move**/

                 /**if all squares have been selected, and nobody win, add tie to gameResults then alert**/
                 if(move == 9 && !checkGameState("fa fa-times") && !checkGameState("fa fa-circle-o")){
                    xUser.gameResults.push("tie")
                    oUser.gameResults.push("tie")
                    alert("tie")
                 }
                 if(checkGameState("fa fa-times")){  /**if playerOne win , add resulits to gameResults then alert **/
                    xUser.gameResults.push("win")
                    oUser.gameResults.push("loss")
                    alert("congratulation! "+xUser.name+" won!")
                 }
                 else{
                     playerOne = oUser.name;    /**change the player **/
                     $( "#player1" ).removeClass( "pink" );
                     $("#player2").addClass("pink");   /**make player list pink to inform its player2's turn **/
                 }
              }
            else{
                $( "#player2" ).removeClass( "pink" );
                selected.addClass("fa fa-circle-o");
                move++;

              if(move==9 && !checkGameState("fa fa-times") && !checkGameState("fa fa-circle-o")){
                 xUser.gameResults.push("tie")
                 oUser.gameResults.push("tie")
                 alert("tie")
              }
              if(checkGameState("fa fa-circle-o")){
                 oUser.gameResults.push("win")
                 xUser.gameResults.push("loss")
                 alert("congratulation! "+oUser.name+" won!")
              }
              else {
                 playerOne = xUser.name;
                 $("#player1").addClass("pink");
              }
         }
      }
   }

   function checkGameState(symbol) {         /**check game state, if win ,return true, loss return false**/
     if($(".s1").hasClass(symbol) && $(".s2").hasClass(symbol) && $(".s3").hasClass(symbol)){
        return true;
     }else if($(".s4").hasClass(symbol) && $(".s5").hasClass(symbol) && $(".s6").hasClass(symbol)){
        return true;
     }
     else if($(".s7").hasClass(symbol) && $(".s8").hasClass(symbol) && $(".s9").hasClass(symbol)){
        return true;
     }else if($(".s1").hasClass(symbol) && $(".s4").hasClass(symbol) && $(".s7").hasClass(symbol)){
        return true;
     }else if($(".s2").hasClass(symbol) && $(".s5").hasClass(symbol) && $(".s8").hasClass(symbol)){
        return true;
     }else if($(".s3").hasClass(symbol) && $(".s6").hasClass(symbol) && $(".s9").hasClass(symbol)){
        return true;
     }else if($(".s1").hasClass(symbol) && $(".s5").hasClass(symbol) && $(".s9").hasClass(symbol)){
        return true;
     }else if($(".s3").hasClass(symbol) && $(".s5").hasClass(symbol) && $(".s7").hasClass(symbol)){
        return true;
     }else {
        return false;
     }
   }

   function displayResults() {
     $( "#results" ).html("<table class='table table-condensed'><thead><tr><th>"+xUser.name+"</th><th>"+oUser.name+
     "</th></tr></thead><tr><td>"+xUser.gameResults+"</td><td>"+oUser.gameResults+"</td></tr>")
   }

   function resetGame() {     /**reset the game, reset all relative variable**/
      removeSymble();
      $( "#results" ).html('');
      user = [];
      xUser.name = ""
      oUser.name = ""
      xUser.gameResults = []
      oUser.gameResults = []
    	$('#start').show()     /**show the Welcome screen**/
   }

    function removeSymble(){          /**Because I use fontawesome pesudoco class, jquery removeClass can't remove the class, so I rewite**/
        var gridHTML = '<div class="row"><div class="square bottom right s1">'+
                       '</div><div class="square bottom right s2"></div><div class="square bottom s3">'+
                       '</div></div><div class="row"><div class="square bottom right s4"></div>'+
                       '<div class="square bottom right s5"></div><div class="square bottom s6"></div></div><div class="row">'+
                       '<div class="square right s7"></div><div class="square right s8"></div><div class="square s9"></div></div>';
    		$('#gameboard').html('');
    		$('#gameboard').html(gridHTML);           /**remove the symbols**/
        $( "#player1" ).removeClass( "pink" );    /**remove the player list color**/
        $( "#player2" ).removeClass( "pink" );

        playersHTML = '<ul><li class="players" id="player1"><p id="symbol1"></p><p id="player1name"></p></li>'+
                      '<li class="players" id="player2"><p id="symbol2"></p><p id="player2name"></p></li></ul>';
        $('.list').html('');
        $('.list').html(playersHTML);
        move = 0;
        player = getFirstPlayer();
    }

    $("#playBt").on("click", function(){       /**when press the Welcome screen button, trigger this function**/
        getUserInfo();
        initGame();
    });

    $("#displayBtn").on("click",displayResults)   /**when press the display button, trigger this function**/

    $("#resetBtn").on("click",resetGame)         /**when press the reset button, trigger this function**/

    $("#againBtn").on("click",function(){        /**when press the play again button, trigger this function**/
       removeSymble();
       initGame();
    });
 }());
