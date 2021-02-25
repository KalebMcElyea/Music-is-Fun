export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title || "No title";
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price || 10 ;
    this.preview = data.previewUrl || data.preview || "No preview avaliable";
    this._id = data._id || data.id;
    this.trackId = data.trackId
  }

  get Template() {
    return /*html*/`
    <div class="newCard card shadow-lg text-center text-light">
    <img class="m-4 shadow-lg albumShadow rounded albumPic" src="${this.albumArt}">
    <h3 class="mt-2">Artist Name: ${this.artist}</h3>
    <h4 class="mt-2 ">Album: ${this.album}</h4>
    <h6 class="mt-2">Price: ${this.price}</h6>
    <h6 class="mt-4"><img class="mb-5 mr-3" src="https://cdn0.iconfinder.com/data/icons/internet-2020/1080/Applemusicandroid-512.png" width="45" height="45"><audio controls><source src="${this.preview}" type="audio/mp3"></audio></h6>
    <button onclick="app.songsController.addSong('${this.trackId}')" class="btn btn-success m-5">Add Song</button>
  </div>
  <hr>
        `
  }

  get playlistTemplate() {
    return /*html*/`
    <div class="newCard card shadow-lg text-center text-light">
    <img class="m-5  shadow-lg albumShadow rounded albumPic" src="${this.albumArt}">
    <h3 class="mt-2 ">Artist Name: ${this.artist}</h3>
    <h4 class="mt-2 ">Album: ${this.album}</h4>
    <button onclick="app.songsController.removeSong('${this._id}')" class="btn btn-danger m-5">Remove Song</button>
  </div>
  <hr>
        `
  }
}
