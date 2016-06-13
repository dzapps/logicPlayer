window.addEventListener('load', function(){
  // vars
  video = document.getElementById('video');
  playButton = document.getElementById('play-button');
  pbarContainer = document.getElementById('pbar-container')
  pbar = document.getElementById('pbar');


  video.load();
  video.addEventListener('canplay', function(){
    playButton.addEventListener('click', playOnPause, false);
    pbarContainer.addEventListener('click', skip, false);
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
