var failed = true;

$(window).on("load", function() {
    var audio = document.getElementById('audio');
	$.ajax({
		type: "POST",
		url: "https://beatsturning.com/title.php",
		data: {}
	}).done(function(title) {
		if (title.startsWith('"mix:summit') == true) {
			failed = false;
			document.documentElement.style.setProperty('--foreground-color', 'white');
			document.documentElement.style.setProperty('--background-color', 'black');
		}
		
	});
});

setInterval(function() {
	$.ajax({
		type: "POST",
		url: "https://beatsturning.com/title.php",
		data: {}
	}).done(function(title) {
		if (title.startsWith('"mix:summit') == true) {
			document.documentElement.style.setProperty('--foreground-color', 'white');
			document.documentElement.style.setProperty('--background-color', 'black');
		} else {
			document.documentElement.style.setProperty('--foreground-color', 'black');
			document.documentElement.style.setProperty('--background-color', 'white');
		}
	});
}, 59000);

setInterval(function() {
	document.getElementById('fade').style.height = "calc(100px +  " + document.documentElement.scrollTop * 1.5 + "px)";
	document.getElementById('fade').style.top = "calc(100vh - " + document.documentElement.scrollTop * 1.5 + "px)";
}, 0);

$(document).ready(function(){
	$("a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 1000, function(){
				window.location.hash = hash;
			});
		}
    });
});