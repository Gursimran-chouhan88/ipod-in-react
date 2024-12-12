import React, { Component } from "react";
import Weel from "./component/Weel";
import Display from "./component/Display";

// imports all songs
import song1 from "./assets/songs/295 song - Sidhu Moose Wala.mp3";
import song2 from "./assets/songs/Athra Style Song - Sidhu Moose Wala.mp3";
import song3 from "./assets/songs/Attach - Sidhu Moose Wala.mp3";
import song4 from "./assets/songs/Janam Janam - Arjit Singh.mp3";
import song5 from "./assets/songs/Jatt Da Muqabla song - Sidhu Moosa Wala.mp3";

// imports all songs images
import song1Img from "./assets/images/295.jpg";
import song2Img from "./assets/images/athra.jpg";
import song3Img from "./assets/images/attach.jpg";
import song4Img from "./assets/images/janam.jpg";
import song5Img from "./assets/images/jatt da.jpg";

// import all wallpaper images
import wallpaper1 from "./assets/images/wallpaper1.jpg";
import wallpaper2 from "./assets/images/wallpaper2.jpg";
import wallpaper3 from "./assets/images/wallpaper3.jpg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      active: 0, //Active list item
      menuItems: ["Now Playing", "Music", "Games", "Settings"], //menu Items
      musicItems: ["All Songs", "Artist", "Albums"], //Items in music
      songItemsUrl: [song1, song2, song3, song4, song5], //songs list
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img], //song images list
      wallpaperItems: [wallpaper1, wallpaper2, wallpaper3], //wallpapers
      songItems: [
        "295 song - Sidhu Moose Wala.mp3",
        "Athra Style Song - Sidhu Moose Wala.mp3",
        "Attach - Sidhu Moose Wala.mp3",
        "Janam Janam - Arjit Singh.mp3",
        "jatt Da Muqabla song - Sidhu Moosa Wala.mp3",
      ], //song names
      songIndex: 0, //current song
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 }, //length of a particular menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, //which menu can be rendered by key menu
      currentMenu: -2, //current menu which is lockscreen initially
      navigationStack: [], //Used for navigation forward and backward
      songUrl: song1, //current song url
      playing: false, //playing or not
      theme: "rgb(210, 210, 210)", //current body theme
      audio: new Audio(song1), //current audio file
      songImgUrl: song1Img, //current song img for now playing
      wheelColor: "white", //current wheel color
      wallpaper: 0, //current wallpaper
      noty: false, // has to show notification or not
      notifyText: "Wallpaper Changed", //notification text
    };
  }

  // FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED FORWARD
  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR : ON LONG PRESS OF FORWARD BUTTON TRACKS ARE SEEKED BACKWARD
  seekSongReverse = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    console.log(e.detail.interval);
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };

  // FUNCTION FOR : TOGGLE SONG PLAY AND PAUSE
  togglePlayPause = () => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    } else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  };

  // FUNCTION FOR : UPDATE ACTIVE MENU WHILE ROTATING ON THE TRACK-WHEEL
  updateActiveMenu = (direction, menu) => {
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 3 &&
      menu !== 9 &&
      menu !== 10
    ) {
      return;
    }
    let min = 0;
    let max = 0;

    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min });
      } else {
        this.setState({ active: this.state.active + 1 });
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max });
      } else {
        this.setState({ active: this.state.active - 1 });
      }
    }
  };

  // FUNCTION FOR : CHANGE THE THEME OF iPod BODY
  setTheme = (id) => {
    let theme = "";
    if (id === 0) {
      theme = "#FDDCD7";
    } else if (id === 1) {
      theme = "rgb(210, 210, 210)";
    } else if (id === 2) {
      theme = "#F5DDC5";
    } else if (id === 3) {
      theme = "#D1CDDA";
    } else if (id === 4) {
      theme = "black";
    }
    this.setState({ theme: theme, noty: true, notifyText: "Theme Changed" });
    return;
  };

  // FUNCTION FOR : CHANGE COLOR OF WHEEL
  setWheelColor = (id) => {
    let wheelColor = "";
    if (id === 0) {
      wheelColor = "#212121";
    } else if (id === 1) {
      wheelColor = "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor = "#3D5AFE";
    }
    this.setState({
      wheelColor,
      noty: true,
      notifyText: "Wheel Color Changed",
    });
    return;
  };

  // FUNCTION FOR : SET WALLPAPER OF iPod Body
  setWallpaper = (id) => {
    this.setState({
      wallpaper: id,
      noty: true,
      notifyText: "Wallpaper Changed",
    });
    return;
  };

  render() {
    return (
      <div>
        <Display />
        <Weel />
      </div>
    );
  }
}

export default App;
