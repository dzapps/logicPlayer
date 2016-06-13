window.addEventListener('load', function(){
  // vars
  video = document.getElementById('video');
  playButton = document.getElementById('play-button');
  pbarContainer = document.getElementById('pbar-container')
  pbar = document.getElementById('pbar');
  timeField = document.getElementById('time-field');


  video.load();
  video.addEventListener('canplay', function(){
    playButton.addEventListener('click', playOnPause, false);
    pbarContainer.addEventListener('click', skip, false);
    updatePlayer();
  })

}, false);

function playOnPause(){
  if(video.paused){
    video.play();
    playButton.src = 'imgs/pause.png';
    update = setInterval(updatePlayer, 30);
  } else{
    video.pause();
    playButton.src = 'imgs/play.png'
    window.clearInterval(update);
  }
}

function updatePlayer(){
  var percentage = (video.currentTime/video.duration)*100;
  pbar.style.width = percentage + '%';
  timeField.innerHTML = getFormattedTime();
  if(video.ended){
    window.clearInterval(update);
    playButton.src = 'imgs/replay.png';
  }
}

function skip(ev){
  var mouseX = ev.pageX - pbarContainer.offsetLeft;
  var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
  width = parseFloat(width.substr(0, width.length - 2));

  video.currentTime = (mouseX/width)*video.duration

  updatePlayer();
}

function getFormattedTime(){
  var seconds = Math.round(video.currentTime);
  var mintues = Math.floor(seconds/60);
  if(mintues > 0) seconds -= mintues*60;
  if(seconds.toString().length === 1) seconds = '0' + seconds;

  var totalSeconds = Math.round(video.duration);
  var totalMintues = Math.floor(totalSeconds/60);
  if(totalMintues > 0) totalSeconds -= totalMintues*60;
  if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

  return mintues + ':' + seconds + '/' + totalMintues + ':' + totalSeconds;
}
