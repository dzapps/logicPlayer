window.addEventListener('load', function(){
  // vars
  video = document.getElementById('video');
  playButton = document.getElementById('play-button');


  video.load();
  video.addEventListener('canplay', function(){
    playButton.addEventListener('click', playOnPause, false);
  })

}, false);

function playOnPause(){
  if(video.paused){
    video.play();
    playButton.src = 'imgs/pause.png';
  } else{
    video.pause();
    playButton.src = 'imgs/play.png'
  }
}
