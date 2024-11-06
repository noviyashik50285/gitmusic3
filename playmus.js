"use strict";
const musicTitleEl = document.getElementById("music_title");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "music/kruchok.mp3",
    displayName: "Крючок",
  },
  {
    path: "music/kogoto.mp3",
    displayName: "Жду кого-то",
  },
  {
    path: "music/vrungsos.mp3",
    displayName: "SOS",
  },
  {
    path: "music/rakihochu.mp3",
    displayName: "Раки",
  },
  {
    path: "music/boroda.mp3",
    displayName: "Борода",
  },
  {
    path: "music/sportloto.mp3",
    displayName: "Спортлото",
  },
  {
    path: "music/boryas.mp3",
    displayName: "Жили мы борясь",
  },
  {
    path: "music/lenmol.mp3",
    displayName: "Ленин такой молодой",
  },
  {
    path: "music/chudo.mp3",
    displayName: "Чудо",
  },
  {
    path: "music/predstav.mp3",
    displayName: "Представь себе",
  },
  {
    path: "music/plot.mp3",
    displayName: "Плот",
  },
  {
    path: "music/gimnastika.mp3",
    displayName: "Гимнастика",
  },
  {
    path: "music/vernut.mp3",
    displayName: "Попробуем вернуть",
  },
  {
    path: "music/proshletom.mp3",
    displayName: "Прошлым летом",
  },
  {
    path: "music/tsvetsni.mp3",
    displayName: "Цветные сны",
  }, 
  {
    path: "music/ledysover.mp3",
    displayName: "Леди совершенство",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
//================== Play Song  True or False====================
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
//================== Play Music====================
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
//================== Pause Music====================
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
//================== Load Songs ====================
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
}
//================== Change Music ====================
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
//================== Set Progress ====================
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
//================== Set Progress ====================
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
//================= Btn Events========================
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  //========= Progressbar===========================
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
//================= Btn Events========================
document.addEventListener("DOMContentLoaded", btnEvents);
//============ Calling Load Music
loadMusic(songs[musicIndex]);

