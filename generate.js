var phraseArrayLength = phrases.length;

$(function() {
	randomize();
	displayGame();
});

function randomize() {
	var usedPhrases = [];
	var index;
	$(".word").each(function() {
		do {
			var index = randInt(phraseArrayLength);
		} while ($.inArray(index, usedPhrases) != -1); 
		usedPhrases.push(index);

		$(this).html(phrases[index]);
	})
}

function displayGame() {
	$(".card").click(function() {
		if ($(this).hasClass("spoken")) {
			$(this).removeClass("spoken");
		}
    else {
      $(this).addClass("spoken");
    }
	});
}

function showAll() {
	$(".card").addClass("spoken");
}

function newGame() {
	$(".card").removeClass("spoken");
	randomize();
	displayGame();
}

function randInt(max) {
	return Math.floor(Math.random() * max);
}
