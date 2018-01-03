import React, { Component } from 'react';
import logo from './logo.svg';
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
        name: 'billboard-best',
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
      <div style={defaultStyle}>
        <img src="" style={{width: "1.6rem",height:"1.6rem"}}/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render(){
    return (
      <div style={{...defaultStyle, width:'20%', display: 'inline-block'}}>
        <img/>
        <h3>{this.props.playlist.name}</h3>
        <ul>
          <li>Artist 1</li>
          <li>Artist 2</li>
          <li>Artist 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      serverData : {}
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
    return (
      <div className="App">
        {
          this.state.serverData.user ?
          <div>
            <h1 style={defaultStyle}>
              {this.state.serverData.user.name}&#39;s Playlist
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter/>
            {
              this.state.serverData.user.playlists.map(playlists =>
                <Playlist playlist={playlists}/>
              )
            }

          </div> : <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
