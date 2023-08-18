


const playerContainer = document.querySelector('.player');
const videoIntroFrame = document.querySelector('.player__intro-frame');
const videoStartBtn = document.querySelector('.player__start');
const durationFullLine = document.querySelector('.player__duration');
const playbackPositionBtn = document.querySelector('.player__duration-btn');
const playbackStatusLine = document.querySelector('.player__duration-line-position');
const soundMuteBtn = document.querySelector('.player__sound-icon');
const soundLvlLine = document.querySelector('.player__sound-status');
const soundLvlBtn = document.querySelector('.player__sound-btn');
const soundStatusLine = document.querySelector('.player__sound-line-position');
let player;
let videoDuration;

const togglePlaybackStatus = (event) => {
  event.preventDefault();

    videoDuration = player.getDuration();

    if (videoIntroFrame.classList.contains('player__intro-frame--paused')) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
}

const eventsInit = () => {
  videoStartBtn.addEventListener('click', e => {
    togglePlaybackStatus(e);    
  });

  videoIntroFrame.addEventListener('click', e => {
    togglePlaybackStatus(e);    
  });

  durationFullLine.addEventListener('click', (e) => {
    const durationSize = +window.getComputedStyle(durationFullLine).getPropertyValue('width').split('px')[0];
    const clickPositionX = e.layerX*100/durationSize;
    playbackPositionBtn.style.left = clickPositionX + '%';
    playbackStatusLine.style.width = clickPositionX + '%';
    const newPlaybackPosition = player.getDuration()/100*clickPositionX;

    player.seekTo(newPlaybackPosition);

    if (videoIntroFrame.classList.contains('player__intro-frame--paused')) {
      player.playVideo();
    }
    
  });

  soundMuteBtn.addEventListener('click', () => {
    soundMuteBtn.classList.toggle('player__sound-icon--muted');

    if (soundMuteBtn.classList.contains('player__sound-icon--muted')) {
      player.mute();
    } else {
      player.unMute();
    }
  });

  soundLvlLine.addEventListener('click', (e) => {
    const levelLineSize = +window.getComputedStyle(soundLvlLine).getPropertyValue('width').split('px')[0];
    const clickPositionX = e.layerX*100/levelLineSize;
    soundLvlBtn.style.left = clickPositionX + '%';
    soundStatusLine.style.width = clickPositionX + '%';
    const newSoundBtnPosition = clickPositionX;

    player.setVolume(newSoundBtnPosition);
  });

}

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();


  if (typeof interval != undefined) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = completedSec*100/durationSec;
    playbackPositionBtn.style.left = completedPercent + '%';
    playbackStatusLine.style.width = completedPercent + '%';

    
  }, 1000);
}

const onPlayerStateChange = event => {
  switch (event.data) {
    case 1:
      videoIntroFrame.classList.remove('player__intro-frame--paused');
      videoStartBtn.classList.remove('player__start--paused');
      break;
    case 2:
      videoIntroFrame.classList.add('player__intro-frame--paused');
      videoStartBtn.classList.add('player__start--paused');
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '100%',
    width: '100%',
    videoId: 'Dd1VIeTMGQs',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disabled: 0,
      showinfo: 0,
      modestbranding: 0,
      rel: 0
    }
  });  
}

eventsInit();