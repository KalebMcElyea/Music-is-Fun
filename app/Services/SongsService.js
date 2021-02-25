import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  constructor(){
    this.getMySongs()
  }
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        console.log(res)
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(ProxyState.songs)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    try {
      const res = await sandBoxApi.get('')
      ProxyState.playlist = res.data.map(p => new Song(p))
      console.log(res)
    } catch (error) {
      console.error(error)
    }
    //TODO What are you going to do with this result

  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(trackId) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    try {

      let activeSong = ProxyState.songs.find(s => s.trackId == trackId)
      ProxyState.activeSong = activeSong
      console.log(ProxyState.activeSong)
      let res = await sandBoxApi.post('', ProxyState.activeSong)
      ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]
      console.log(ProxyState.playlist)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    try {
      await sandBoxApi.delete(id)
      this.getMySongs()
    } catch (error) {
      console.log(error)
    }
  }
}

const service = new SongsService();
export default service;
