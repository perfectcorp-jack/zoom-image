import './App.css';
import Upload from './Upload.js';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
      image: '',
    };
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
  }

  handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      this.setState({
        image: reader.result,
      });
      var myImage = new Image();
      myImage.src = reader.result;
      myImage.onload = function () {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 640;
        canvas.height = 480;
        var ratioX = canvas.width / myImage.width;
        var ratioY = canvas.height / myImage.height;
        var ratio = Math.min(ratioX, ratioY);
        var xCenter = (canvas.width - myImage.width * ratio) / 2;
        var yCenter = (canvas.height - myImage.height * ratio) / 2;
        ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
      }
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleZoomIn() {
    var zoom = this.state.zoom;
    this.setState({
      zoom: this.state.zoom + 0.1,
    });
    console.log(this.state.zoom);
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var myImage = new Image();
    myImage.src = this.state.image;
    var ratioX = canvas.width / myImage.width * zoom;
    var ratioY = canvas.height / myImage.height * zoom;
    var ratio = Math.min(ratioX, ratioY);
    var xCenter = (canvas.width - myImage.width * ratio) / 2;
    var yCenter = (canvas.height - myImage.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
  }

  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1,
    });
    console.log(this.state.zoom);
    var zoom = this.state.zoom;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var myImage = new Image();
    myImage.src = this.state.image;
    var ratioX = canvas.width / myImage.width * zoom;
    var ratioY = canvas.height / myImage.height * zoom;
    var ratio = Math.min(ratioX, ratioY);
    var xCenter = (canvas.width - myImage.width * ratio) / 2;
    var yCenter = (canvas.height - myImage.height * ratio) / 2;
    if (zoom > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(myImage, xCenter, yCenter, myImage.width * ratio, myImage.height * ratio);
    } else {
      this.setState({
        zoom: 0,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <canvas id='canvas' style={{ width: '640px', height: '480px', border: '1px solid black' }}></canvas>
          <Upload
            handleImageChange={this.handleImageChange}
          />
          <button type="button" style={{ width: '100px' }} onClick={this.handleZoomIn}>zoom in</button>
          <button type="button" style={{ width: '100px' }} onClick={this.handleZoomOut}>zoom out</button>
        </div>
      </div>
    );
  }
}

export default App;
