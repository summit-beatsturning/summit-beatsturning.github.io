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
		}
		
	});
});

setInterval(function() {
	$.ajax({
		type: "POST",
		url: "https://beatsturning.com/title.php",
		data: {}
	}).done(function(title) {
		if (title.startsWith('"mix:summit') == failed) {
			location.reload();
		}
		document.getElementsByClassName('avap-ads-container')[0].style.position = 'relative';
		document.getElementsByClassName('avap-ads-container')[0].style.zIndex = '99';
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
			}, 1000, function(){  //time
				window.location.hash = hash;
			});
		}
    });
});