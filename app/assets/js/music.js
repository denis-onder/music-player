const $ = id => document.getElementById(id);
const fs = require("fs");
const path = require("path");
const output = $("output");
const playBtn = $("controls_play");
const pauseBtn = $("controls_pause");
const stopBtn = $("controls_stop");
const volume = $("controls_volume");
const name = $("controls_name");
const audio = $("audio");

const dirPath = path.join(__dirname, "../../../../", "Music");

function renderSong(filename, filepath) {
  // Work with only MP3 files
  if (filename.includes(".mp3")) {
    output.innerHTML += `
  <div class="output_song">
    <p class="output_song_name">${filename.replace(".mp3", "")}</p>
    <i class="fa fa-play-circle output_song_play" aria-hidden="true" data-url="${filepath}"></i>
  </div>
  `;
  }
  // Attach play listeners
  Array.from(document.getElementsByClassName("output_song_play")).map(
    attachPlayListener
  );
}

function attachPlayListener(target) {
  target.onclick = e => {
    const { target } = e;
    const src = target.getAttribute("data-url");
    play.call(target, src);
  };
}

function clear() {
  // Reset icons
  Array.from(document.getElementsByClassName("output_song_play")).map(elem =>
    elem.removeAttribute("data-playing")
  );
  // Reset current song name
  name.innerHTML = "";
  // Reset audio source
  audio.src = "";
}

function attachControls() {
  // NOTE: Add a toggle for the play button to be disabled/grayed out while the song is playing
  playBtn.onclick = () => audio.play(); // Apparently, JS is smart enough not to play the song again if it's running w/o any preliminary checks
  pauseBtn.onclick = () => audio.pause();
  stopBtn.onclick = clear;
}

function play(src) {
  clear();
  // Set open attribute to icon
  this.setAttribute("data-playing", "true");
  audio.src = src;
  audio.play();
  // Attach listeners to controls
  attachControls();
  // NOTE: It's weird, but that's how we will be pulling out song names
  const songName = this.parentElement.firstChild.nextSibling.innerText;
  name.innerHTML = songName;
}

// Find songs
fs.readdir(dirPath, (err, files) =>
  err
    ? console.error(err)
    : // Output audio elements to the player
      files.forEach(file => {
        const filepath = `${dirPath}/${file}`;
        renderSong(file, filepath);
      })
);

// Volume changer
volume.oninput = () => (audio.volume = volume.value / 100);
