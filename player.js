// ======== VibeTune Player Script ========

// Playlist data (you can edit this easily)
const playlist = [
  {
    title: "Wayo Allah",
    artist: "Og Abbah",
    src: "Wayyo-Allah.mp3",
    cover: "Og-Abbah.jpeg"
  },
  {
    title: "Body Dance",
    artist: "Mavo",
    src: "BodyDanz_Mavo.mp3",
    cover: "Body_danz.jpeg"
  },
  {
    title: "Hot Body",
    artist: "Ayra Starr",
    src: "Ayra_Starr_-_Hot_Body.mp3",
    cover: "hotbody.jpeg"
  },
  {
    title: "Duro",
    artist: "Horsmanty",
    src: "Duro.mp3",
    cover: "duro.jpg"
  }
];

// ======== SELECT ELEMENTS ========
const audio = document.getElementById("audio");
const art = document.getElementById("art");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const seek = document.getElementById("seek");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playlistList = document.getElementById("playlist");

let currentIndex = 0;
let isPlaying = false;

// ======== LOAD TRACK FUNCTION ========
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  art.src = track.cover;
  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  seek.value = 0;
  current.textContent = "0:00";
  duration.textContent = "0:00";

  // Update active track in playlist display
  document.querySelectorAll(".playlist-list li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

// ======== PLAY / PAUSE FUNCTION ========
function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}

audio.addEventListener("play", () => {
  isPlaying = true;
  playBtn.textContent = "⏸"; // pause icon
});

audio.addEventListener("pause", () => {
  isPlaying = false;
  playBtn.textContent = "▶️"; // play icon
});

// ======== NEXT / PREVIOUS ========
function nextTrack() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
}

// ======== SEEK BAR UPDATE ========
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    seek.value = (audio.currentTime / audio.duration) * 100;
    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
  }
});

seek.addEventListener("input", () => {
  audio.currentTime = (seek.value / 100) * audio.duration;
});

// ======== HELPER: FORMAT TIME ========
function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// ======== PLAYLIST DISPLAY ========
playlist.forEach((track, index) => {
  const li = document.createElement("li");
  li.textContent = `${track.title} — ${track.artist}`;
  li.addEventListener("click", () => {
    currentIndex = index;
    loadTrack(currentIndex);
    audio.play();
  });
  playlistList.appendChild(li);
});

// ======== EVENT LISTENERS ========
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// ======== INITIAL LOAD ========
loadTrack(currentIndex);

// Optional global function for quick-play buttons in artist section
window.playerLoadAndPlay = (index) => {
  currentIndex = index;
  loadTrack(currentIndex);
  audio.play();
};
