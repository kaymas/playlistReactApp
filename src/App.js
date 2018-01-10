import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#333'
};
let fakeServerData = {
  user: {
    name: 'Kaymas',
    playlists: [
      {
        name: 'My fav',
        songs: [
          {name: 'bach c-major', duration: 1234},
          {name: 'angela', duration: 2234},
          {name: 'sound of silence', duration: 445}
        ]
      },
      {
        name: 'metal-best',
        songs: [
          {name: 'song-1', duration: 1234},
          {name: 'angela', duration: 2234},
          {name: 'sound of silence', duration: 445},
          {name: 'song-4', duration: 445},
          {name: 'song-5', duration: 445}
        ]
      },
      {
        name: 'billboard best',
        songs: [
          {name: 'bach c-major', duration: 1234},
          {name: 'angela', duration: 2234},
          {name: 'sound of silence', duration: 445},
          {name: 'song-4', duration: 445}
        ]
      },
      {
        name: 'drive',
        songs: [
          {name: 'bach c-major', duration: 1234},
          {name: 'angela', duration: 2234},
          {name: 'sound of silence', duration: 445}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component{
  render(){
    return (
      <div className="aggregate" style={{...defaultStyle, width: '150px', display:'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component{
  render(){
    let allSongs = this.props.playlists.reduce((songs,eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    } , []);
    let totalDuration = allSongs.reduce((sum,eachSong) => {
      return sum + eachSong.duration;
    }, 0);
    totalDuration = Math.round(totalDuration / 3600);
    return (
      <div className="aggregate" style={{...defaultStyle, width: '150px', display:'inline-block'}}>
        <h2>{totalDuration} hours</h2>
      </div>
    );
  }
}

class Filter extends Component{
  render(){
    return (
      <div style={{...defaultStyle, marginBottom: '40px'}}>
        <img alt="search-icon"/>
        <input type="text" onKeyUp={
          event => this.props.onTextChange(event.target.value)
        }/>
      </div>
    );
  }
}

class Playlist extends Component {
  render(){
    let playlist = this.props.playlist;
    let songs = playlist.songs.slice(0,3);
    return (
      <div style={{...defaultStyle, width:'20%', display: 'inline-block'}}>
        <img alt="playlist-art"/>
        <h3>{playlist.name}</h3>
        <ul style={{listStyle: 'none', padding: 0}}>
          {
            songs.map(song =>
              <li>{song.name}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      serverData : {},
      filterString: ''
    };
  }

  componentDidMount(){
    // var that = this;
    // setTimeout(function(){
    //   that.setState({
    //     serverData: fakeServerData
    //   });
    // },10);

    //using the new arrow function instead of that
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData
      });
    },100);
  }

  render() {

    let playlistsToRender = this.state.serverData.user ?
      this.state.serverData.user.playlists.filter(
        playlists => playlists.name.toLowerCase().includes(
          this.state.filterString.toLowerCase()
        )
      ) : []

    return (
      <div className="App">
        {
          this.state.serverData.user ?
          <div>
            <h1 style={defaultStyle}>
              {this.state.serverData.user.name}&#39;s Playlist
            </h1>
            <PlaylistCounter playlists={playlistsToRender}/>
            <HoursCounter playlists={playlistsToRender}/>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {
              playlistsToRender.map(
                playlists => <Playlist playlist={playlists}/>
              )
            }

          </div> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
