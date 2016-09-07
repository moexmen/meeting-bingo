var spies, redSpies, blueSpies;
var spymasterCode;

$(function() {
	randomize();
	displayGame();
});

function randomize() {
	var usedWords = [];
	var index;
	$(".word").each(function() {
		do {
			var index = randInt(400);
		} while ($.inArray(index, usedWords) != -1); 
		usedWords.push(index);

		$(this).html(words[index]);
	})

	spies = [];
	redSpies = Math.random() > 0.5 ? 8 : 9;
	blueSpies = redSpies == 9 ? 8 : 9;
	for (var i=0; i<25; i++) { spies[i] = 0; }

	var assassin = randInt(25);
	spies[assassin] = 3;

	for (var i=0; i<redSpies; i++) {
		do {
			index = randInt(25);
		} while (spies[index] != 0);
		spies[index] = 1;
	}

	for (var i=0; i<blueSpies; i++) {
		do {
			index = randInt(25);
		} while (spies[index] != 0);
		spies[index] = 2;
	}
}

function displayGame() {
	$(".card").each(function(index) {
		var type = spies[index];
		var className;
		switch (type) {
			case 1: className = "spy-red"; break;
			case 2: className = "spy-blue"; break;
			case 3: className = "spy-black"; break;
		}
		$(this).removeClass("spy-red spy-blue spy-black");
		$(this).addClass(className);
	})

	$(".card").click(function() {
		if (!$(this).hasClass("revealed")) {
			$(this).addClass("covered");
		}
		$(this).addClass("revealed");
	});

	generateSpymasterLink();
	$('#spymaster-modal').modal('show');
}

function showAll() {
	$(".card").addClass("revealed");
}

function newGame() {
	$(".card").removeClass("covered revealed");
	randomize();
	displayGame();
}

function randInt(max) {
	return Math.floor(Math.random() * max);
}

function generateSpymasterLink() {
	var base64chars = "DsAnm2hc6MQIELCvt5paX7OoHFeySNWqi04lURzZb8VkjfK9u_G-YJ1rgBxw3TdP";
	spymasterCode = "";
	var rot = randInt(14) + 1;
	var acc = rot;

	for (var i=0; i<25; i++) {
		var index = (i + rot) % 25; 
		acc = acc << 2;
		acc += spies[index];
		if ((i % 3) == 0) {
			spymasterCode += base64chars.charAt(acc);
			acc = 0;
		}
	}

	$("#spymaster-code").html(spymasterCode);
	$("#qrcode").html("");
	$("#qrcode").qrcode("jeremyyap.github.io/codenames/spymaster?" + spymasterCode);
}