window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

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
			document.getElementById("background").id = "night-background";
			document.getElementById("mountain").id = "night-mountain";
			document.documentElement.style.setProperty('--foreground-color', 'white');
			document.documentElement.style.setProperty('--background-color', 'black');
			//document.getElementById('fog-1').style.opacity = 0.3;
			//document.getElementById('fog-2').style.opacity = 0.3;
			document.getElementById("body").id = "night-body";
			var ctx = new AudioContext();
			var analyser = ctx.createAnalyser();
			var audioSrc = ctx.createMediaElementSource(audio);
			audioSrc.connect(analyser);
			analyser.connect(ctx.destination);
			var frequencyData = new Uint8Array(analyser.frequencyBinCount);
			var canvas = document.getElementById('canvas'),
				cwidth = canvas.width,
				cheight = canvas.height - 2,
				meterWidth = 5,
				gap = 0,
				capHeight = 2,
				capStyle = '#fff',
				meterNum = 1000 / (10 + 2),
				capYPositionArray = [];
			ctx = canvas.getContext('2d'),
			gradient = ctx.createLinearGradient(0, 0, 0, 300);
			gradient.addColorStop(1, '#0f0');
			gradient.addColorStop(0.5, '#ff0');
			gradient.addColorStop(0, '#f00');
			function renderFrame() {
				var array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				var step = Math.round(array.length / meterNum);
				ctx.clearRect(0, 0, cwidth, cheight);
				for (var i = 0; i < meterNum; i++) {
					var value = array[i * step];
					if (capYPositionArray.length < Math.round(meterNum)) {
						capYPositionArray.push(value);
					};
					ctx.fillStyle = capStyle;
					if (value < capYPositionArray[i]) {
						ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
					} else {
						ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
						capYPositionArray[i] = value;
					};
					ctx.fillStyle = gradient;
					ctx.fillRect(i * 12, cheight - value + capHeight, meterWidth, cheight);
				}
				document.querySelectorAll('.background')[0].style.filter = 'brightness(' + array[0] / 1.5 + '%)';
				document.querySelectorAll('.mountain')[0].style.filter = 'grayscale(90%) brightness(' + array[0] / 10 + '%)';
				requestAnimationFrame(renderFrame);
			}
			renderFrame();
		}
		document.getElementById('load').style.opacity = 0;
		document.getElementById('load').style.pointerEvents = 'none';
	});
});

setInterval(function() {
	$.ajax({
		type: "POST",
		url: "https://beatsturning.com/title.php",
		data: {}
	}).done(function(title) {
		if (title.startsWith('"live:summit') == failed) {
			location.reload();
		}
	});
}, 59000);

var streamplaying = 0;

function streamToggle() {
    if (audio.paused != false) {
		streamPlay();
		if (audio.duration != 'infinity') {
			audio.currentTime = audio.duration - 1;
		}
	} else {
		streamStop();
	}
}

function streamPlay() {
	document.getElementById('control').innerHTML = 'Pause';
	audio.play();
	streamplaying = 1;
}

function streamStop() {
	document.getElementById('control').innerHTML = 'Play';
	audio.pause();
	streamplaying = 0;
}

setInterval(function() {
	document.getElementsByClassName('background')[0].style.top = document.documentElement.scrollTop / -5 + "px";
	document.getElementById('logo').style.top = document.documentElement.scrollTop / -2.5 + "px";
	document.getElementById('fade').style.height = "calc(100px +  " + document.documentElement.scrollTop * 1.5 + "px)";
	//document.getElementById('fog-1').style.width = "calc(100vh * " + document.getElementsByClassName('background')[0].clientWidth + ")";
	//document.getElementById('fog-2').style.width = "calc(100vh * " + document.getElementsByClassName('background')[0].clientWidth + ")";
	document.getElementById('silhouette-tag').style.filter = "blur(" + (document.documentElement.scrollTop + 12) / 10 + "px)";
	document.getElementById('silhouette-tag').style.opacity = 1 - document.documentElement.scrollTop / 100;
	document.getElementById('control').style.marginTop = -document.documentElement.scrollTop / 4 + 'px';
	document.getElementsByClassName('background')[0].style.filter = "grayscale(" + (frequencyData / 255 * 100) + "%)";
	if (audio.paused != false) {
		document.getElementById('control').innerHTML = 'Pause';
	} else {
		document.getElementById('control').innerHTML = 'Play';
	}
}, 0);
