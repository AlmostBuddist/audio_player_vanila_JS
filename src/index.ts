import { defaultIconPrefix, songs } from './const';
import './styles/base.css';
import './styles/range.css';

import { ISong } from './types';

const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio') as HTMLAudioElement;
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress') as HTMLDivElement;
const title = document.querySelector('.title');
const cover = document.querySelector('.cover') as HTMLImageElement;
const volumeContainer = document.querySelector('.volume-container') as HTMLDivElement;
const volumeBtn = document.querySelector('#volume-button') as HTMLButtonElement;
const rangeContainer = document.querySelector('.range-container') as HTMLDivElement;
const volumeRange = document.querySelector('#volume') as HTMLInputElement;

let songIndex: number = 1;
let lastSongVolume: number = 100;

loadSongs(songs[songIndex]);
function loadSongs(song: ISong) {
  title.innerHTML = song.name;
  audio.src = song.src;
  cover.src = song.cover;
}

function playSong() {
  musicContainer.classList.add('play');

  const playBtnIconicon = playBtn.querySelector(`i.${defaultIconPrefix}`);
  playBtnIconicon.classList.remove('fa-play');
  playBtnIconicon.classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');

  const playBtnIconicon = playBtn.querySelector(`i.${defaultIconPrefix}`);
  playBtnIconicon.classList.remove('fa-pause');
  playBtnIconicon.classList.add('fa-play');

  audio.pause();
}

function playOrPauseSong() {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();

    return;
  }

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSongs(songs[songIndex]);
  playSong();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSongs(songs[songIndex]);
  playSong();
}

function updateProgress(event: Event) {
  const { duration, currentTime } = event.target as HTMLAudioElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
}

function chooseTime(event: MouseEvent) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function chooseVolumeIcon(value: number): void {
  const iconButton = volumeBtn.querySelector(`i.${defaultIconPrefix}`);

  if (!value) {
    iconButton.classList.add('fa-volume-off');
    iconButton.classList.remove('fa-volume-low', 'fa-volume-high');

    return;
  }

  if (value < 75) {
    iconButton.classList.add('fa-volume-low');
    iconButton.classList.remove('fa-volume-off', 'fa-volume-high');

    return;
  }

  iconButton.classList.add('fa-volume-high');
  iconButton.classList.remove('fa-volume-off', 'fa-volume-low');
}

function muteSong() {
  audio.volume = 0;
  volumeRange.value = '0';

  chooseVolumeIcon(0);
}

function volumeSongBack() {
  if (!lastSongVolume) {
    audio.volume = 1;
    volumeRange.value = '100';

    chooseVolumeIcon(100);

    return;
  }

  audio.volume = lastSongVolume;
  volumeRange.value = String(lastSongVolume * 100);
  chooseVolumeIcon(lastSongVolume * 100);
}

function volumeBtnClick() {
  if (!audio.volume) {
    volumeSongBack();

    return;
  }

  muteSong();
}

function changeVolume(event: Event) {
  const { value } = event.target as HTMLInputElement;
  const valueInt = parseInt(value);

  if (!valueInt) {
    muteSong();
  }

  const currentVolume = parseInt(value) / 100;
  lastSongVolume = currentVolume;
  audio.volume = currentVolume;
  chooseVolumeIcon(valueInt);
}

playBtn.addEventListener('click', playOrPauseSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', chooseTime);

volumeContainer.addEventListener('mouseenter', () => {
  rangeContainer.classList.remove('close');
});
volumeContainer.addEventListener('mouseleave', () => {
  rangeContainer.classList.add('close');
});
volumeRange.addEventListener('change', changeVolume);
volumeBtn.addEventListener('click', volumeBtnClick);

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === ' ') {
    playOrPauseSong();
  }
});
