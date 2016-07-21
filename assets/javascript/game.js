	// VARIABLES
	// ==========================================================================

	var words = [
		{word:"Skylab", picture:"Skylab_(SL-4).jpg", winSound:"beep15.mp3"}, 
		{word:"Apollo", picture:"Apollo.jpg", winSound:"beep13.mp3"}, 
		{word:"Armstrong", picture:"neil_armstrong-1000.jpg", winSound:"beep19.mp3"}, 
		{word:"Hubble", picture:"Hubble_01.jpg", winSound:"crowdapplause.mp3"}, 
		{word:"quasar", picture:"quasar.jpg", winSound:"350352__robinhood76__06741-good-news-magic-ding.wav"}, 
		{word:"galaxy", picture:"galaxy.jpg", winSound:"254037__jagadamba__stereo-space-sound.wav"}, 
		{word:"Saturn", picture:"saturn.jpg", winSound:"256402__jagadamba__ambient-space-effect-v6.mp3"}, 
		{word:"Jupiter", picture:"jupiter.jpg", winSound:"195745__mishicu__mod-pad2.wav"}, 
		{word:"Venus", picture:"venus.jpg", winSound:"214072__wubitog__space-beam.wav"}, 
		{word:"SpaceShuttle", picture:"spaceshuttle.jpg", winSound:"259285__philip-daniels__launch.wav"}
		]
	var wins = 0;
	var losses = 0;
	var maxGuesses = 10;
	var gameDiv = document.getElementById("gamestart");
	var dashes = "";
	var answer = "";
	var mainHead = document.createElement("div");
	var lettersGuessed ="";
	var answerIndex = -1;

	// FUNCTIONS
	// ==============================================================================
	function startGame(){
		answerIndex = Math.floor(Math.random()*words.length);
		answer = words[answerIndex].word;
		guesses=maxGuesses;
		lettersGuessed="";
		dashes="";
		console.log(answer);
		for(var i = 0; i < answer.length; i++) {
			dashes+="-";
		}
		displayHead();
	}


	function playGame() {
		document.onkeyup = function(event){
			if (dashes===answer){startGame();}
			var event = event.keyCode;
			if (event == 116) {event = -1;}
			var letter = String.fromCharCode(event).toLowerCase();
			if (checkUsed(lettersGuessed,letter) && letter.match(/[a-z]/i)) {
				lettersGuessed+=letter;
				guesses--;
				for (i=0;i<answer.length;i++) {
					var test = answer.charAt(i);
					if (letter==test.toLowerCase()){
						dashes=setCharAt(dashes,i,test);
					}
				}
				displayHead();
				if (dashes === answer){
					wins++;
					winReplace(answerIndex);
				}else if (guesses==0){
					losses++;
					loseReplace(answerIndex);
					startGame();
				}
			}

		}
	}

	function setCharAt(str,index,chr) {
    	if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
	}

	function spreadDisplay(str,char,flag){
		var returnstr="";
		for (i=0;i<str.length*2;i++){
			if (i/2 === Math.floor(i/2)){
				returnstr+=str.charAt(i/2);
			}else {
				if (flag || i!==(str.length*2)-1){
				returnstr+=char;
				}	
			}
		}
		return returnstr;
}
	function displayHead(){
		mainHead.innerHTML = "<h1><strong>Wins: "+wins+
		"</strong></h1><h1><strong>Losses: "+losses+
		"</strong></h1><h1><strong>Guesses Remaining: "+guesses+
		"</strong></h1><h1><strong>Current word:</strong></h1>"+"<h1><strong>"+spreadDisplay(dashes," ",true)+
		"</strong></h1><h1><strong>Letters Already Guessed:</strong></h1>"+"<h1><strong>"+spreadDisplay(lettersGuessed,", ",false)+"</strong>";
		gameDiv.appendChild(mainHead);

	}
	function checkUsed(str,ltr){
		for (i=0;i<str.length;i++){
			if (ltr === str.charAt(i)){
				return false;
			}
		}
		return true;

	}
	function winReplace(i){
		var newImage = document.getElementById("bonusImage").src="assets/images/"+words[i].picture;
		var newAlt = document.getElementById("bonusImage").alt=words[i].word;
		document.getElementById("bonusText").innerHTML = "You Win!!";
		var win = new Audio('assets/sounds/'+words[i].winSound);
		win.play();
	}
	function loseReplace(i){
		var newImage = document.getElementById("bonusImage").src="assets/images/"+words[i].picture;
		var newAlt = document.getElementById("bonusImage").alt=words[i].word;
		document.getElementById("bonusText").innerHTML = "Sorry, you lose. The word was '"+words[i].word+"'";
		var win = new Audio('assets/sounds/254278__jagadamba__burp-mechanical-robot-robotic.wav');
		win.play();	}


	// MAIN PROCESS
	// ==============================================================================

	startGame();
	playGame();
