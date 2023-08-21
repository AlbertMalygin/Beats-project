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
const player = document.querySelector('#player');
const videoDuration = player.duration;
let volumeLevel;


const togglePlaybackStatus = (event) => {
  event.preventDefault();

  if (videoIntroFrame.classList.contains('player__intro-frame--paused')) {
    videoIntroFrame.classList.remove('player__intro-frame--paused');
    videoStartBtn.classList.remove('player__start--paused');
    player.play();
  } else {
    videoIntroFrame.classList.add('player__intro-frame--paused');
    videoStartBtn.classList.add('player__start--paused');
    player.pause();
    
  }
}

player.addEventListener('click', () => {
  if (!videoIntroFrame.classList.contains('player__intro-frame--paused')) {
    videoIntroFrame.classList.add('player__intro-frame--paused');
    videoStartBtn.classList.add('player__start--paused');
    player.pause();
  }
});

videoStartBtn.addEventListener('click', e => {
  togglePlaybackStatus(e);
});

videoIntroFrame.addEventListener('click', e => {
  togglePlaybackStatus(e);    
});

const playback = () => {
  let interval;

  if (typeof interval != undefined) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.currentTime;
    const completedPercent = completedSec*100/videoDuration;
    playbackPositionBtn.style.left = completedPercent + '%';
    playbackStatusLine.style.width = completedPercent + '%';
    
  }, 100);
}

durationFullLine.addEventListener('click', (e) => {
  const durationSize = +window.getComputedStyle(durationFullLine).getPropertyValue('width').split('px')[0];
  const clickPositionX = e.layerX*100/durationSize;
  playbackPositionBtn.style.left = clickPositionX + '%';
  playbackStatusLine.style.width = clickPositionX + '%';
  const newPlaybackPosition = videoDuration/100*clickPositionX;

  player.currentTime  = newPlaybackPosition;

  if (videoIntroFrame.classList.contains('player__intro-frame--paused')) {
    videoIntroFrame.classList.remove('player__intro-frame--paused');
    videoStartBtn.classList.remove('player__start--paused');
    player.play();
  }
  
});

soundMuteBtn.addEventListener('click', () => {
  soundMuteBtn.classList.toggle('player__sound-icon--muted');

  if (soundMuteBtn.classList.contains('player__sound-icon--muted')) {
    player.volume = 0;
    soundLvlBtn.style.left = '0%';
    soundStatusLine.style.width = '0%';
  } else {
    player.volume = volumeLevel;
    soundLvlBtn.style.left = volumeLevel*100 +'%';
    soundStatusLine.style.width = volumeLevel*100 +'%';
  }
});

soundLvlLine.addEventListener('click', (e) => {
  const levelLineSize = +window.getComputedStyle(soundLvlLine).getPropertyValue('width').split('px')[0];
  const clickPositionX = e.layerX*100/levelLineSize;
  soundLvlBtn.style.left = clickPositionX + '%';
  soundStatusLine.style.width = clickPositionX + '%';
  const newSoundBtnPosition = clickPositionX;
  volumeLevel = newSoundBtnPosition/100;

  player.volume = volumeLevel;
});

playback();




// const onPlayerStateChange = event => {
//   switch (event.data) {
//     case 1:
//       videoIntroFrame.classList.remove('player__intro-frame--paused');
//       videoStartBtn.classList.remove('player__start--paused');
//       break;
//     case 2:
//       videoIntroFrame.classList.add('player__intro-frame--paused');
//       videoStartBtn.classList.add('player__start--paused');
//       break;
//   }
// };

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('yt-player', {
//     height: '100%',
//     width: '100%',
//     videoId: 'Dd1VIeTMGQs',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     },
//     playerVars: {
//       controls: 0,
//       disabled: 0,
//       showinfo: 0,
//       modestbranding: 0,
//       rel: 0
//     }
//   });  
// }


