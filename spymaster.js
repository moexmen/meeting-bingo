var spies, redSpies, blueSpies;
var spymasterCode;


$(function() {
	spies = decodeSpymasterLink();

	$(".card").each(function(index) {
		var type = spies[index];
		var className;
		switch (type) {
			case 1: className = "spy-red"; break;
			case 2: className = "spy-blue"; break;
			case 3: className = "spy-black"; break;
		}
		$(this).addClass(className);
	})
});

function decodeSpymasterLink() {
	var base64chars = "DsAnm2hc6MQIELCvt5paX7OoHFeySNWqi04lURzZb8VkjfK9u_G-YJ1rgBxw3TdP";
	var code = window.location.href.slice(window.location.href.indexOf('?') + 1);
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