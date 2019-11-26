const $ = id => document.getElementById(id);
const fs = require("fs");
const path = require("path");
const output = $("output");
const playBtn = $("controls_play");
const pauseBtn = $("controls_pause");
const stopBtn = $("controls_stop");
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
  target.onclick = e => play(e.target.getAttribute("data-url"));
}

function play(filepath) {
  audio.src = filepath;
  audio.play();
  // Attach listeners to controls
  playBtn.onclick = () => audio.play(); // Implement check to see if the audio is actually playing
  pauseBtn.onclick = () => audio.pause();
  stopBtn.onclick = () => (audio.src = "");
}

fs.readdir(dirPath, (err, files) =>
  err
    ? console.error(err)
    : // Output audio elements to the player
      files.forEach(file => {
        const filepath = `${dirPath}/${file}`;
        renderSong(file, filepath);
      })
);
