var maximum, mmedia, play, bar, sound, progress, mute, volume, loop;
function initialize()
{
	maximum = 400;
	// инициализация переменных
	mmedia = document.getElementById('media');
	play = document.getElementById('play');
	bar = document.getElementById('bar');
	progress = document.getElementById('progress');
	mute = document.getElementById('mute');
	volume = document.getElementById('volume');
	sound = document.getElementById('sound');
	// прослушиватель
	play.addEventListener('click', push);
	mute.addEventListener('click', sound);
	bar.addEventListener('click', move);
	volume.addEventListener('change', level);
}
addEventListener('load', initialize);

function push()
{
	if(!mmedia.paused && mmedia.ended)	
	{
		mmedia.pause;
		play.value = 'play';
		clearInterval(1000);
	}
	else
	{
		mmedia.play();
		play.value = 'pause';
		loop = setInterval(status, 1000);
	}
}
function sound()
{
	if(mute.value == 'Mute')
	{
		 mmedia.muted = true;
		 mute.value = 'Sounde';
	}
	else
	{
		mmedia.muted = false;
		mute.value = 'Mute';
	}
}

function move(e)
{
	if(!mmedia.paused && !mmedia.ended)
	{
		var mouseX = e.pageX - bar.offsetLeft;
		var newtime = mouseX * mmedia.duration / maximum;
		mmedia.currentTime = newtime;
		progress.style.width = mouseX + 'px';
	}
}

function level()
{
	mmedia.volume = volume.value;
}

function status()
{
	if(!mmedia.ended)
	{
		var size = parseInt(mmedia.currentTime * maximum / mmedia.duration);
		progress.style.width = size + 'px';
	}
	else
	{
		progress.style.width = '0px';
		play.value = 'play';
		clearInterval(1000);
	}
}
