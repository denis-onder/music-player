const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "../../../../", "Music");

fs.readdir(dirPath, (err, files) =>
  err
    ? console.error(err)
    : // Output audio elements to the player
      files.forEach(file => console.log(`${dirPath}/${file}`))
);
