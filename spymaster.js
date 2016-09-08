var base64chars = "DsAnm2hc6MQIELCvt5paX7OoHFeySNWqi04lURzZb8VkjfK9u_G-YJ1rgBxw3TdP";

$(function() {
	var code = mapCodeFromURL();
	if (code !== undefined && isValidCode(code)) {
		$("#map-code").val(code);
		var spies = decodeMapCode(code);
		displayMap(spies);
	}
});

function displayMap(spies) {
	var redSpyCount = 0, blueSpyCount = 0;

	$(".card").each(function(index) {
		var type = spies[index];
		var className;
		$(this).removeClass("spy-red spy-blue spy-black");
		switch (type) {
			case 1: className = "spy-red"; redSpyCount++; break;
			case 2: className = "spy-blue"; blueSpyCount++; break;
			case 3: className = "spy-black"; break;
		}
		$(this).addClass(className);
	});

	startTeamClass = redSpyCount > blueSpyCount ? "spy-red" : "spy-blue";
	$(".start-team").addClass(startTeamClass);
}

function mapCodeFromURL() {
	var index = window.location.href.indexOf('?');
	var code;
	if (index !== -1) {
		code = window.location.href.slice(index + 1);
	}
	return code;
}

function isValidCode(code) {
	if (code.length !== 9) return false;
	for (var i=0; i<9; i++) {
		if (base64chars.indexOf(code.charAt(i)) == -1) {
			return false;
		}
	}
	return true;
}

function decodeMapCode(code) {
	var arr = [];
	for (var i=0; i<25; i++) { arr[i] = 0; }

	var rot = base64chars.indexOf(code.charAt(0)) >> 2;

	for (var i=0; i<9; i++) {
		var value = base64chars.indexOf(code.charAt(i));
		for (var j=0; j<3; j++) {
			var index = (i * 3 + j - 2 + rot) % 25;
			arr[index] = (value >> (4 - j * 2)) & 3;
		}
	}
	return arr;
}

function generateMap() {
	var code = $("#map-code").val();
	if (isValidCode(code)) {
		var spies = decodeMapCode(code);
		displayMap(spies);
	} else {
		alert("The map code is not valid.");
	}
}