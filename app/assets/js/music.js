const fs = require("fs");
const path = require("path");
const output = document.getElementById("output");

const dirPath = path.join(__dirname, "../../../../", "Music");

function renderSong(filename, filepath) {
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
  console.log(target);
  target.onclick = e => play(e.target.getAttribute("data-url"));
}

function play(filepath) {
  new Audio(filepath).play();
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
