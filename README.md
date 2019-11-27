# Electron Music Player

### Usage:

Run `npm install` and then run `npm start`.

Before actually starting the application, you need to change the path to your folder in which all your `.mp3` files are located that you want to use. Editing the `music.js` file in required to achieve this.

`/app/assets/js/music.js`

```js
// Directory path to folder in which the music is located
const dirPath = path.join(__dirname, "../../../../", "Music");
```
