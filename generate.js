var phraseArrayLength = phrases.length;
var cells = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];

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
			setCellValue(this, 0);
		}
    else {
      $(this).addClass("spoken");
			setCellValue(this, 1);
    }
	});
}

function setCellValue(card, value) {
	$("#video").empty();

	var row, col;
	var cards = $(".card");
	for(var i=0; i<cards.length; i++) {
		if (cards[i] == card) {
			row = Math.floor(i / 4);
			col = i % 4;
			break;
		}
	}

	cells[row][col] = value;

	for (var i=0; i<4; i++) {
		var rowValue = 0, colValue = 0, diagValue1 = 0, diagValue2 = 0;

		for (var j=0; j<4; j++) {
			rowValue += cells[i][j];
			colValue += cells[j][i];
			diagValue1 += cells[j][j];
			diagValue2 += cells[j][3-j];
			if(rowValue == 4 || colValue == 4 || diagValue1 == 4 || diagValue2 == 4) {
				win();
				return
			}
		}
	}
}

function win() {
	var videos = ["https://www.youtube.com/embed/HRerwXWTRjM?start=35&autoplay=1", "https://www.youtube.com/embed/Ct6BUPvE2sM?autoplay=1"];
	var index = randInt(videos.length);
	$("#video").append($("<iframe width='560' height='315' src='"+ videos[index]+"' frameborder='0' allowfullscreen></iframe>"));
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
