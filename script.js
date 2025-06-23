const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    src: "music/song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    src: "music/song2.mp3"
  },
  {
    title: "Song Three",
    artist: "Artist C",
    src: "music/song3.mp3"
  }
];

let songIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const autoplay = document.getElementById("autoplay");

// Load song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  updatePlaylist();
}

// Play/Pause toggle
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
}

// Next/Previous
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
}

// Time update
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;

  // Update time
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Format time
function formatTime(sec) {
  const minutes = Math.floor(sec / 60) || 0;
  const seconds = Math.floor(sec % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Playlist
function updatePlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, idx) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.classList.toggle("active", idx === songIndex);
    li.onclick = () => {
      songIndex = idx;
      loadSong(songIndex);
      audio.play();
    };
    playlist.appendChild(li);
  });
}

// Autoplay
audio.addEventListener("ended", () => {
  if (autoplay.checked) nextSong();
  else playBtn.textContent = "▶";
});

// Events
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Init
loadSong(songIndex);
